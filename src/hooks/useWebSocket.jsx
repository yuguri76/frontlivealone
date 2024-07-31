import { useEffect, useRef, useState } from 'react';

const useWebSocket = (token) => {
    const socket = useRef(null);
    const [messages, setMessages] = useState([]);
    const [isAvailableChat, setAvailableChat] = useState(false);
    const [userNickname, setUserNickname] = useState('');
    const MAX_MESSAGES = 100;

    useEffect(() => {
        if (!token) return;

        socket.current = new WebSocket('ws://localhost:8080/ws');

        socket.current.onopen = () => {
            console.log('세션 연결 시도');
            const authMessage = JSON.stringify({ type: 'AUTH', messenger: 'front-server', message: token });
            socket.current.send(authMessage);
        };

        socket.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data);
            const { type, messenger, message } = data;

            if (type === 'AUTH') {
                setUserNickname(messenger);
                setAvailableChat(true);

                const requestInit = JSON.stringify({ type: 'INIT', messenger: messenger, message: 'Request Initialize' });
                socket.current.send(requestInit);
            } else if (type === 'MESSAGE') {
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages, { nickname: messenger, text: message }];
                    if (updatedMessages.length > MAX_MESSAGES) {
                        updatedMessages.shift(); // 배열의 첫 번째 요소 제거
                    }
                    return updatedMessages;
                });
            } else if (type === 'FAILED') {
                const messageInput = document.getElementById('messageInput');
                messageInput.placeholder = '채팅 입력 불가';
                setAvailableChat(false);
            } else if (type === 'INIT') {
                console.log('init메시지',message);
                const initMessages = JSON.parse(message).map(({ init_nickname, init_text }) => ({
                    nickname: init_nickname,
                    text: init_text,
                }));

                setMessages((prevMessages) => {
                    const updatedMessages = [...initMessages, ...prevMessages];
                    if (updatedMessages.length > MAX_MESSAGES) {
                        updatedMessages.shift(); // 배열의 첫 번째 요소 제거
                    }
                    return updatedMessages;
                });
            }
        };

        return () => {
            socket.current.close(); // 컴포넌트가 언마운트될 때 소켓 연결 닫기
        };
    }, ['ws://localhost:8080/ws', token]);

    const sendMessage = (userNickname, message) => {
        if (socket.current && isAvailableChat) {
            socket.current.send(JSON.stringify({
                type: 'MESSAGE',
                messenger: userNickname,
                message: message
            }));
        }
    };

    return { messages, sendMessage, isAvailableChat, userNickname };
};

export default useWebSocket;
