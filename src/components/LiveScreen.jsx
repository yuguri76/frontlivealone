import React, { useEffect, useState } from 'react';
import HLSPlayer from '../components/HLSPlayer';
import useWebSocket from '../hooks/useWebSocket';
import loginLogo from '../assets/images/login_logo.png'

const LiveScreen = () => {
    const { requestStreamKey, wsIsLive, wsStreamKey } = useWebSocket('');

    useEffect(() => {
        requestStreamKey();
    }, [requestStreamKey]);

    return (
        <div>
            {wsIsLive ? (
                <HLSPlayer src={`http://localhost:8081/hls/${wsStreamKey}.m3u8`} />
            ) : (
                <img src={loginLogo} alt="logo"
                    style={{ width: '300px', margin: '10px' }} />
            )}
        </div>
    );
};

export default LiveScreen;
