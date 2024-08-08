import React, { useEffect, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import styles from '../../styles/Chat.module.css';
import useWebSocket from '../../hooks/useWebSocket';

function ChatContainer() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const {messages, sendMessage, isAvailableChat, userNickname } = useWebSocket(token);
  const [inputCount, setInputCount] = useState(0);
  const maxByteLength = 90;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      sendMessageHandler();
    }
  };

  const sendMessageHandler = () => {
    if (message.trim() && isAvailableChat) {
      sendMessage(userNickname, message.trim());
      setMessage(''); // 메시지 전송 후 입력 칸 비우기
      setInputCount(0); // 글자 수 초기화
    }
  };

  const calculateByteLength = (str) => {
    return new Blob([str]).size;
  };

  const onInputCountHandler = (event) => {
    const inputText = event.target.value;
    const byteLength = calculateByteLength(inputText);
 
    if (byteLength <= maxByteLength) {
      setMessage(inputText);
      setInputCount(byteLength);
    } else {
      const truncatedText = inputText.slice(0, -1); // 마지막 글자 제거
      setMessage(truncatedText);
      setInputCount(calculateByteLength(truncatedText));
    }
  };

  const onPasteHandler = (event) => {
    const paste = (event.clipboardData || window.clipboardData).getData('text');
    const currentText = event.target.value;
    const combinedText = currentText + paste;
    const byteLength = calculateByteLength(combinedText);

    if (byteLength > maxByteLength) {
      event.preventDefault();
      const allowedLength = maxByteLength - calculateByteLength(currentText);
      const truncatedPaste = paste.slice(0, allowedLength);
      setMessage(currentText + truncatedPaste);
      setInputCount(maxByteLength);
    }
  };

  const handleCompositionEnd = (event) => {
    onInputCountHandler(event); // Composition이 끝난 후에 input count를 다시 계산
  };

  const handleCompositionUpdate = (event) => {
    onInputCountHandler(event); // Composition 중간에도 input count를 계산
  };

  return (
    <div className={styles.chatBox}>
      <header className={styles.chatHeader}>
        <h2>채팅방에 오신 것을 환영합니다</h2>
      </header>
      <div className={styles.chatBody}>
        <ChatList messages={messages} />
      </div>
      <footer className={styles.chatFooter}>
        <input
          id="messageInput"
          type="text"
          placeholder={token ? "채팅을 입력해주세요" : "로그인 해야 입력가능"}
          disabled={!isAvailableChat}
          onKeyDown={handleKeyDown}
          onChange={onInputCountHandler}
          onPaste={onPasteHandler}
          onCompositionEnd={handleCompositionEnd}
          onCompositionUpdate={handleCompositionUpdate}
          value={message}
        />
        <button onClick={sendMessageHandler} disabled={!isAvailableChat}>
          전송
        </button>
      </footer>
      <div className={styles.charCount}>
        {inputCount}/{maxByteLength} bytes
      </div>
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

function ChatList({ messages }) {
  const chatWindowRef = useRef();

  const scrollToBottom = () => {
    chatWindowRef.current.scrollToItem(messages.length + 1);
  };

  useEffect(() => {
    scrollToBottom();
    console.log(messages);
  }, [messages]); // messages 상태가 업데이트될 때마다 실행

  return (
    <List
      height={635}
      itemCount={messages.length}
      itemSize={45}
      width={400}
      itemData={messages}
      ref={chatWindowRef}
    >
      {({ index, style }) => (
        <div style={style}>
          <Chats userNickname={messages[index].nickname} message={messages[index].text} />
        </div>
      )}
    </List>
  );
}

export default ChatContainer;
