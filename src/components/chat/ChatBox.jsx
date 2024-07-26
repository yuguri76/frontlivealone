import React, { useEffect, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import styles from '../../styles/Chat.module.css';

function ChatContainer() {
  const chatWindowRef = useRef();
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const MAX_MESSAGES = 100;

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onopen = () => {
      console.log('세션 연결 시도');
      socket.current = ws;
    };

    ws.onmessage = (e) => {
      const data = e.data;
      const [userNickname, newMessage] = data.split(/:(.+)/, 2);

      // 이전 상태에 새 값을 추가하여 상태 업데이트
      setMessages((prevMessages) => {
        // 메시지가 최대치를 초과하면 오래된 메시지 삭제
        const updatedMessages = [...prevMessages, { nickname: userNickname, text: newMessage }];
        if (updatedMessages.length > MAX_MESSAGES) {
          updatedMessages.shift(); // 배열의 첫 번째 요소 제거
        }
        return updatedMessages;
      });
    };

    return () => {
      ws.close(); // 컴포넌트가 언마운트될 때 소켓 연결 닫기
    };
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
    if(messages.length>20){
      
    }
  }, [messages]); // messages 상태가 업데이트될 때마다 실행

  const sendMessage = () => {
    const messageInput = document.getElementById('messageInput');
    if (messageInput.value && socket.current) {
      socket.current.send(messageInput.value);
      messageInput.value = '';
    }
  };

  return (
    <div className={styles.chatBox}>
      <header className={styles.chatHeader}>
        <h2>채팅방에 오신 것을 환영합니다</h2>
      </header>
      <div className={styles.chatBody} ref={chatWindowRef}>
        <ChatList messages={messages}/>
      </div>
      <footer className={styles.chatFooter}>
        <input id="messageInput" type="text" placeholder="채팅을 입력해주세요" />
        <button onClick={sendMessage}>전송</button>
      </footer>
    </div>
  );
}

const Chats = React.memo(({ userNickname, message }) => {
  return (
    <div className={styles.chatWindow}>
      <div className={styles.message}>
        <span className={styles.nickname}>{userNickname}</span>
        <span className={styles.texts}>: {message}</span>
      </div>
    </div>
  );
});

function ChatList({messages}){
  return (
    <List
      height={800}
      itemCount={messages.length}
      itemSize={35}
      width={380}
    >
      {({ index, style }) => (
        <div style={style}>
          <Chats
            userNickname={messages[index].nickname}
            message={messages[index].text}
          />
        </div>
      )}
    </List>
  );
}

export default ChatContainer;
