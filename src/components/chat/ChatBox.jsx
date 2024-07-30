import React, { useEffect, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import styles from '../../styles/Chat.module.css';

function ChatContainer() {
  const chatWindowRef = useRef();
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [token,setToken] = useState('')
  const [userNickname,setUsernickname] = useState('');
  const [isAvailableChat,setAvailableChat] = useState(false);
  const MAX_MESSAGES = 100;
  
  useEffect(()=>{
    const newToken = localStorage.getItem('accessToken');
    console.log(newToken);
    if(newToken){
      setToken(newToken);
    }
  },[])


  useEffect(() => {
    if(!token) return;
    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onopen = () => {
      console.log('세션 연결 시도');
      socket.current = ws;

      const authMessage = JSON.stringify({type:'AUTH',messenger:'',message:token});
      socket.current.send(authMessage);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      const {type,messenger,message} = data;

      if(data.type==='AUTH'){
        setUsernickname(messenger);
        setAvailableChat(true);
      }

      if (data.type === 'MESSAGE') {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, { nickname: messenger, text: message }];
          if (updatedMessages.length > MAX_MESSAGES) {
            updatedMessages.shift(); // 배열의 첫 번째 요소 제거
          }
          return updatedMessages;
        });
      }

      if(data.type==='FAILED'){
        const messageInput = document.getElementById('messageInput');
        messageInput.placeholder='채팅 입력 불가';
        setAvailableChat(false);
      }

    };

    return () => {
      ws.close(); // 컴포넌트가 언마운트될 때 소켓 연결 닫기
    };
  },[token,userNickname]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages,userNickname]); // messages 상태가 업데이트될 때마다 실행

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => { 
    const messageInput = document.getElementById('messageInput');
    if (messageInput.value && socket.current && isAvailableChat) {
      const sendMessage = JSON.stringify({
        type:'MESSAGE',
        messenger:userNickname,
        message:messageInput.value
      });
      socket.current.send(sendMessage);
      messageInput.value=''; // 메시지 전송후 입력칸 비우기
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
        <button onClick={sendMessage}
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
