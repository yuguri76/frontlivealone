import React, { useEffect, useState } from 'react';
import HLSPlayer from '../components/HLSPlayer';
import axiosInstance from '../axiosInstance';
import useWebSocket from '../hooks/useWebSocket';
import loginLogo from '../assets/images/login_logo.png'

const LiveScreen = () => {
    const { wsStreamKey } = useWebSocket('');
    const [streamKey, setStreamKey] = useState('');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const getStreamKey = async () => {
            try {
                const response = await axiosInstance.get('/broadcast/streamKey', {});
                setStreamKey(response.data.data.stream_key);
                setIsReady(true);
            } catch (error) {
                console.error(error);
            }
        };

        getStreamKey();
    }, []);

    useEffect(() => {
        setStreamKey(wsStreamKey);
    }, [wsStreamKey]);

    return (
        <div>
            {isReady ? (
                <HLSPlayer src={`http://localhost:8081/hls/${streamKey}.m3u8`} />
            ) : (
                <img src={loginLogo} alt="logo"
                    style={{ width: '300px', margin: '10px' }} />
            )}
        </div>
    );
};

export default LiveScreen;
