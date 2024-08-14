import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';

const useWebSocket = (token,refreshToken) => {
    const client = useRef(null);
    const [messages, setMessages] = useState([]);
    const [isAvailableChat, setAvailableChat] = useState(false);
    const [userNickname, setUserNickname] = useState('');
    const [wsStreamKey, setWsStreamKey] = useState(`${process.env.REACT_APP_DEFAULT_STREAM_KEY}`);
    const [wsIsLive, setWsIsLive] = useState(false);
    const [chatColor,setChatColor] = useState('');
    const [viewerCount,setViewrCount] = useState(0);

    const MAX_MESSAGES = 100;

    useEffect(() => {
        if (client.current) return;

        token = localStorage.getItem('accessToken');
        refreshToken = localStorage.getItem('refreshToken');

        console.log('token :',token);
        console.log('refreshToken :',refreshToken);
        client.current = new Client({
            brokerURL: `${process.env.REACT_APP_WEBSOCKET_PROTOCOL}://${process.env.REACT_APP_SERVER_ADDRESS}/ws`,
            connectHeaders: {
                Authorization: `${token}`,
                RefreshToken : `${refreshToken}`,
                RoomId: 1
            },
            disconnectHeaders: {
                RoomId: 1
            },
            onConnect: () => {
                console.log('세션 연결 시도');
                const authMessage = JSON.stringify({
                    type: 'REQUEST_AUTH',
                    messenger: 'front-server',
                    message: token
                });

                requestStreamKey();
                
                client.current.subscribe('/queue/message', (message) =>{
                    const data = JSON.parse(message.body);
                    handleMessage(data);
                });

                client.current.subscribe('/queue/viewer', (message) => {
                    const data = JSON.parse(message.body);
                    handleViewerCount(data);
                })
                
                client.current.subscribe('/user/queue/reply', (message) => {
                    const data = JSON.parse(message.body);
                    handleSessionMessage(data);
                });

                client.current.subscribe('/queue/broadcast', (message) =>{
                    const data = JSON.parse(message.body);
                    handlerBroadcastMessage(data);
                });

                client.current.subscribe('/user/queue/broadcast',(message)=>{
                    const data = JSON.parse(message.body);
                    handlerBroadcastMessage(data);
                });

                client.current.subscribe('/queue/alert', (message) =>{
                    const data = JSON.parse(message.body);
                    handleAlert(data);
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

    useEffect(() => { // 새로고침할 때 세션이 비정상적으로 종료되는 것 처리
        const handleBeforeUnload = () => {
            if (client.current) {
                client.current.deactivate({
                    disconnectHeaders: {
                        RoomId: 1
                    },
                    onDisconnect: () => {
                        console.log('Disconnected cleanly');
                    }
                });
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // useEffect(()=>{

    //     /**
    //      * 10초에 한번 시청자 수 요청
    //      * 시청자 수가 바뀔 때 마다 갱신도 가능 (적용은 x) -> 서버에서도 처리해야함 
    //      */
    //     const getViewerCountInterval = setInterval(()=>{
    //         requestViewerCount();
    //     },10000); 

    //     return () => clearInterval(getViewerCountInterval);

    // },[]);

    // const requestViewerCount = () =>{
    //     console.log('시청자 수 요청');
    //     const requestViewerCountMessage = JSON.stringify({
    //         type: 'REQUEST_VIEWERCOUNT',
    //         messenger: 'front-server',
    //         message: 1
    //     })
    //     client.current.publish({destination: '/pub/session',body: requestViewerCountMessage})
    // };

    const handleMessage = (data) =>{
        const { type, messenger, message } = data;
        console.log(data);
        if (type === 'CHAT_MESSAGE') {
            setMessages((prevMessages) => {
                const parsedMessage = JSON.parse(message);
                const updatedMessages = [...prevMessages, { nickname: messenger, text: parsedMessage.text, color:parsedMessage.color }];
                if (updatedMessages.length > MAX_MESSAGES) {
                    updatedMessages.shift();
                }
                return updatedMessages;
            });
        }
    }

    const handleViewerCount = (data) =>{
        const {type,messenger,message} = data;
        console.log(data);
        if (type === 'RESPONSE_VIEWERCOUNT'){
            setViewrCount(message);
        }
    }

    const handleAlert = (data) =>{
        const { type, messenger, message } = data;
        console.log(data);
        if (type === 'ALERT_BROADCAST_START') {
            const responseMessage = JSON.parse(message);
            alert(responseMessage.title + " 방송이 시작되었습니다.");
        } else if (type === 'ALERT_ALMOST_SOLD_OUT') {
            const responseMessage = JSON.parse(message);
            alert("매진 임박!!!!!\n" + "재고가 " + responseMessage.quantity + "개 남았습니다.");
        } else if (type === 'ALERT_SOLD_OUT') {
            alert("매진^^");
        }
    }

    const handlerBroadcastMessage = (data) =>{
        const {type, messenger, message} = data;
        console.log(data);
        if (type === 'BROADCAST') {
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
            setChatColor(message);
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
      
            const parsedMessage = JSON.parse(message);  
   
            const initMessages = parsedMessage.map(({init_nickname,init_text}) => ({
                nickname: init_nickname,
                text: JSON.parse(init_text).text,
                color: JSON.parse(init_text).color 
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
            const messageJson = JSON.stringify({
                text: message,
                color: chatColor
            })
            client.current.publish({
                destination: '/pub/send',
                body: JSON.stringify({
                    type: 'CHAT_MESSAGE',
                    messenger: userNickname,
                    message: messageJson
                })
            });
        }
    };

    const requestStreamKey = () => {
        if (client.current && client.current.connected) {
            client.current.publish({
                destination: '/pub/session/broadcast',
                body: JSON.stringify({
                    type: 'BROADCAST',
                    messenger: 'front-server',
                    message: 'Request StreamKey'
                })
            });
        }
    };

    return { messages, sendMessage, isAvailableChat, userNickname, requestStreamKey, wsIsLive, wsStreamKey,viewerCount };
};

export default useWebSocket;
