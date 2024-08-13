import React from 'react';
import HLSPlayer from '../components/HLSPlayer';
import styles from '../styles/LiveScreen.module.css'

const LiveScreen = ({ wsIsLive, wsStreamKey, width=720 }) => {

    return (
        <div className={styles.container}>
            {wsIsLive ? (
                <HLSPlayer
                    key = {wsIsLive}
                    src = {`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_MEDIA_SERVER_ADDRESS}/hls/${wsStreamKey}.m3u8`}
                    width={width}
                />
            ) : (
                <HLSPlayer
                    key = {wsIsLive}
                    src = {`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_MEDIA_SERVER_ADDRESS}/hls/${wsStreamKey}.m3u8`}
                    width={width}
                />
            )}
        </div>
    );
};

export default LiveScreen;
