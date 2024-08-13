import React from 'react';
import HLSPlayer from '../components/HLSPlayer';

const LiveScreen = ({ wsIsLive, wsStreamKey }) => {

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
