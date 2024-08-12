import React, { useEffect } from 'react';
import HLSPlayer from '../components/HLSPlayer';
import useWebSocket from '../hooks/useWebSocket';

const LiveScreen = () => {
    const { requestStreamKey, wsIsLive, wsStreamKey } = useWebSocket('');

    useEffect(() => {
        requestStreamKey();
    }, [requestStreamKey]);

    return (
        <div>
            {wsIsLive ? (
                <HLSPlayer
                    key = {wsIsLive}
                    src = {`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_MEDIA_SERVER_ADDRESS}/hls/${wsStreamKey}.m3u8`}
                />
            ) : (
                <HLSPlayer
                    key = {wsIsLive}
                    src = {`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_MEDIA_SERVER_ADDRESS}/hls/${wsStreamKey}.m3u8`}
                />
            )}

        </div>
    );
};

export default LiveScreen;
