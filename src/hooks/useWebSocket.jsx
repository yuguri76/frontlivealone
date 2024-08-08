import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';

const useWebSocket = (token,refreshToken) => {
    const client = useRef(null);
    const [messages, setMessages] = useState([]);
    const [isAvailableChat, setAvailableChat] = useState(false);
    const [userNickname, setUserNickname] = useState('');
    const [wsStreamKey, setWsStreamKey] = useState('');
    const [wsIsLive, setWsIsLive] = useState(false);

    const MAX_MESSAGES = 100;

    useEffect(() => {
        if (client.current) return;

        token = localStorage.getItem('accessToken');
        refreshToken = localStorage.getItem('refreshToken');

        console.log('token :',token);
        console.log('refreshToken :',refreshToken);
        client.current = new Client({
            brokerURL: `ws://${process.env.REACT_APP_SERVER_ADDRESS}/ws`,
            connectHeaders: {
                Authorization: `${token}`,
                RefreshToken : `${refreshToken}`,
            },
            onConnect: () => {
                console.log('세션 연결 시도');
                const authMessage = JSON.stringify({
                    type: 'REQUEST_AUTH',
                    messenger: 'front-server',
                    message: token
                });
                
                client.current.subscribe('/queue/message', (message) =>{
                    const data = JSON.parse(message.body);
                    handleMessage(data);
                })
                
                client.current.subscribe('/user/queue/reply', (message) => {
                    const data = JSON.parse(message.body);
                    handleSessionMessage(data);
                });

                client.current.publish({ destination: '/pub/session', body: authMessage });
            },
            onStompError: (frame) => {
                console.error('STOMP error: ' + frame.headers['message']);
            },
            onWebSocketError: (error) => {
                console.error('WebSocket error: ' + error);
            }
        });

        client.current.activate();

        return () => {
            if (client.current) {
                client.current.deactivate(); // 컴포넌트가 언마운트될 때 소켓 연결 닫기
                client.current = null;
            }
        };
    }, []);

    const handleMessage = (data) =>{
        const { type, messenger, message } = data;
        console.log(data);
        if (type === 'CHAT_MESSAGE') {
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, { nickname: messenger, text: message }];
                if (updatedMessages.length > MAX_MESSAGES) {
                    updatedMessages.shift();
                }
                return updatedMessages;
            });
        }else if (type === 'BROADCAST') {
            const broadcastMessage = JSON.parse(message);
            localStorage.setItem('isBroadcastStart', broadcastMessage.is_live);
            localStorage.setItem('isSettingCompleted', broadcastMessage.is_live);
            setWsIsLive(broadcastMessage.is_live);
            setWsStreamKey(broadcastMessage.stream_key);
        }
    }

    const handleSessionMessage = (data) => {
        const { type, messenger, message } = data;
        console.log(data);
        if (type === 'RESPONSE_AUTH') {
            setUserNickname(messenger);
            setAvailableChat(true);

            const requestInit = JSON.stringify({
                type: 'REQUEST_CHAT_INIT',
                messenger: messenger,
                message: 'Request Initialize'
            });
        
            client.current.publish({ destination: '/pub/session', body: requestInit });
    
        } else if (type === 'INVALID_TOKEN') {
            const refreshToken = localStorage.getItem('refreshToken');

            const requestRefresh = JSON.stringify({
                type: 'REQUEST_REFRESH',
                messenger: 'front-server',
                message: refreshToken
            });

            client.current.publish({ destination: '/pub/session', body: requestRefresh });
        } else if (type === 'RESPONSE_REFRESH') {
            const { access, refresh } = JSON.parse(message);
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            const authMessage = JSON.stringify({
                type: 'REQUEST_AUTH',
                messenger: 'front-server',
                message: access
            });
            client.current.publish({ destination: '/pub/session', body: authMessage });
        } else if (type === 'ANONYMOUS_USER') {
            setAvailableChat(false);

            const requestInit = JSON.stringify({
                type: 'REQUEST_CHAT_INIT',
                messenger: messenger,
                message: 'Request Initialize'
            });

            client.current.publish({ destination: '/pub/session', body: requestInit });
        } else if (type === 'ERROR') {
            const messageInput = document.getElementById('messageInput');
            messageInput.placeholder = '채팅 입력 불가';
            setAvailableChat(false);
        } else if (type === 'RESPONSE_CHAT_INIT') {
            const initMessages = JSON.parse(message).map(({ init_nickname, init_text }) => ({
                nickname: init_nickname,
                text: init_text,
            }));

            setMessages((prevMessages) => {
                const updatedMessages = [...initMessages, ...prevMessages];
                if (updatedMessages.length > MAX_MESSAGES) {
                    updatedMessages.shift();
                }
                return updatedMessages;
            });
        } 
    };

    const sendMessage = (userNickname, message) => {
        if (client.current && isAvailableChat) {
            client.current.publish({
                destination: '/pub/send',
                body: JSON.stringify({
                    type: 'CHAT_MESSAGE',
                    messenger: userNickname,
                    message: message
                })
            });
        }
    };

    const requestStreamKey = () => {
        if (client.current && client.current.connected) {
            client.current.publish({
                destination: '/pub/chat',
                body: JSON.stringify({
                    type: 'BROADCAST',
                    messenger: 'front-server',
                    message: 'Request StreamKey'
                })
            });
        }
    };

    return { messages, sendMessage, isAvailableChat, userNickname, requestStreamKey, wsIsLive, wsStreamKey };
};

export default useWebSocket;
