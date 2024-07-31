import React, { useEffect, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import styles from '../../styles/Chat.module.css';
import useWebSocket from '../../hooks/useWebSocket';

function ChatContainer() {
  const chatWindowRef = useRef();
  const [token, setToken] = useState('');
  const { messages, sendMessage, isAvailableChat, userNickname } = useWebSocket(token);

  useEffect(() => {
    const newToken = localStorage.getItem('accessToken');
    console.log(newToken);
    if (newToken) {
      setToken(newToken);
    }
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, userNickname]); // messages 상태가 업데이트될 때마다 실행

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessageHandler();
    }
  };

  const sendMessageHandler = () => {
    const messageInput = document.getElementById('messageInput');
    if (messageInput.value.trim() && isAvailableChat) {
      sendMessage(userNickname, messageInput.value.trim());
      messageInput.value = ''; // 메시지 전송후 입력칸 비우기
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
        <input id="messageInput" 
        type="text"  
        placeholder={token ? "채팅을 입력해주세요" : "로그인 해야 입력가능"}  
        disabled={!isAvailableChat}
        onKeyDown={handleKeyDown}/>
        <button onClick={sendMessageHandler}
        disabled={!isAvailableChat}>
          전송
        </button>
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
      itemSize={35} // 이 친구를 동적으로 해야 하는데 나중에 하겠습니다...
      width={400}
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
