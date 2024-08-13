import React, { useCallback, useEffect, useRef, useState } from 'react';
import { VariableSizeList as List } from 'react-window';
import styles from '../../styles/Chat.module.css';

function ChatContainer ({ messages, sendMessage, isAvailableChat, userNickname }) {
  const [message, setMessage] = useState('');
  const [inputCount, setInputCount] = useState(0);
  const [sendAvailable,setSendAvailable] = useState(true);
  const throtteleTime = 1000;
  const maxByteLength = 150;


  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      sendMessageHandler();
    }
  };

  const sendMessageHandler = () => {
    if (message.trim() && isAvailableChat) {

      if(!sendAvailable){
        console.log('메시지를 너무 빨리 보냈음'); // 채팅창이든 알람이든 뭔가 띄우는 로직 
        return;
      }

      sendMessage(userNickname, message.trim());
      setMessage(''); // 메시지 전송 후 입력 칸 비우기
      setInputCount(0); // 글자 수 초기화
      setSendAvailable(false);
      setTimeout(()=>setSendAvailable(true),throtteleTime);
    }
  };

  const calculateByteLength = (str) => {
    return new Blob([str]).size;
  };

  const truncateTextByByteLength = (text, maxByteLength) => {
    const calculateByteLength = (str) => new Blob([str]).size;

    let start = 0;
    let end = text.length;

    while (start < end) {
      const mid = Math.ceil((start + end) / 2);
      const byteLength = calculateByteLength(text.slice(0, mid));

      if (byteLength <= maxByteLength) {
        start = mid;
      } else {
        end = mid - 1;
      }
    }

    return text.slice(0, start);
  };

  const onInputCountHandler = (event) => {
    const inputText = event.target.value;
    const byteLength = calculateByteLength(inputText);

    if (byteLength <= maxByteLength) {
      setMessage(inputText);
      setInputCount(byteLength);
    } else {
      const truncatedText = truncateTextByByteLength(inputText, maxByteLength);
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
          placeholder={isAvailableChat ? "채팅을 입력해주세요" : "로그인 해야 입력가능"}
          disabled={!isAvailableChat}
          onKeyDown={handleKeyDown}
          onChange={onInputCountHandler}
          onPaste={onPasteHandler}
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
  }, [messages]); // messages 상태가 업데이트될 때마다 실행

  const getItemSize = useCallback((index) => {
    const message = messages[index];
    if (!message) {
      return 50; // 기본 높이 반환
    }
    const text = message.text || '';
    const lines = Math.ceil(text.length / 40);
    return lines * 25 + 20; // 기본 높이 + 줄 수에 따른 추가 높이
  }, [messages]);

  return (
    <List
      height={635}
      itemCount={messages.length}
      itemSize={getItemSize}
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
