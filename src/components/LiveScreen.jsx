import React, { useEffect } from 'react';
import HLSPlayer from '../components/HLSPlayer';
import useWebSocket from '../hooks/useWebSocket';
import logo from '../assets/images/stream_logo.png'

const LiveScreen = () => {
    const { requestStreamKey, wsIsLive, wsStreamKey } = useWebSocket('');

    useEffect(() => {
        requestStreamKey();
    }, [requestStreamKey]);

    return (
        <div>
            {wsIsLive ? (
                <HLSPlayer src={`http://ec2-52-79-50-124.ap-northeast-2.compute.amazonaws.com:8081/hls/${wsStreamKey}.m3u8`} />
            ) : (
                <img src={logo} alt="logo"
                    style={{ width: '730px'}} />
            )}
        </div>
    );
};

export default LiveScreen;
