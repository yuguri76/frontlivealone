import { useEffect, useRef, useState } from 'react';

const useWebSocket = (token) => {
    const socket = useRef(null);
    const [messages, setMessages] = useState([]);
    const [isAvailableChat, setAvailableChat] = useState(false);
    const [userNickname, setUserNickname] = useState('');
    const [wsStreamKey, setWsStreamKey] = useState('');
 
    const MAX_MESSAGES = 100;


    useEffect(() => {

        socket.current = new WebSocket('ws://localhost:8080/ws');

        socket.current.onopen = () => {
            console.log('세션 연결 시도');
            const authMessage = JSON.stringify({ 
                type: 'REQUEST_AUTH', 
                messenger: 'front-server', 
                message: token
            });
            socket.current.send(authMessage);
        };

        socket.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data);
            const { type, messenger, message } = data;

            if (type === 'RESPONSE_AUTH') {
                setUserNickname(messenger);
                setAvailableChat(true);

                const requestInit = JSON.stringify({ 
                    type: 'REQUEST_CHAT_INIT', 
                    messenger: messenger, 
                    message: 'Request Initialize' 
                });

                socket.current.send(requestInit);
            }else if(type==='INVALID_TOKEN'){ // 유효하지 않은 토큰 -> 리프레쉬 요청
                const refreshToken = localStorage.getItem('refreshToken');
            
                const requestRefresh = JSON.stringify({
                    type:'REQUEST_REFRESH',
                    messenger:"front-server",
                    message:refreshToken
                });

                socket.current.send(requestRefresh);
            } 
            else if(type==='RESPONSE_REFRESH'){ // Refresh 성공 (refresh가 유효할 경우)
                const {access,refresh} = JSON.parse(message);
             
                localStorage.setItem('accessToken',access);
                localStorage.setItem('refreshToken',refresh);
                // Refresh성공으니 다시 AUTH보내기 
                const authMessage = JSON.stringify({ 
                    type: 'REQUEST_AUTH', 
                    messenger: 'front-server', 
                    message: access
                });
                socket.current.send(authMessage);
                
            }else if(type==='ANONYMOUS_USER'){ // Refresh도 성공 못하면 익명 유저
                setAvailableChat(false);
                
                // 일단 채팅창은 가능 하도록
                const requestInit = JSON.stringify({ 
                    type: 'REQUEST_CHAT_INIT', 
                    messenger: messenger, 
                    message: 'Request Initialize' 
                });

                socket.current.send(requestInit);
            }
            else if (type === 'CHAT_MESSAGE') {
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
            } else if (type === 'RESPONSE_CHAT_INIT') {
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
            } else if (type === 'BROADCAST') {
                setWsStreamKey(message);
            }
        };

        return () => {
            socket.current.close(); // 컴포넌트가 언마운트될 때 소켓 연결 닫기
        };
    }, ['ws://localhost:8080/ws', token]);

    const sendMessage = (userNickname, message) => {
        if (socket.current && isAvailableChat) {
            socket.current.send(JSON.stringify({
                type: 'CHAT_MESSAGE',
                messenger: userNickname,
                message: message
            }));
        }
    };

    return { messages, sendMessage, isAvailableChat, userNickname, wsStreamKey };
};

export default useWebSocket;
