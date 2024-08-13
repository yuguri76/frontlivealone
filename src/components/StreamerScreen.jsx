import React from 'react';
import LiveScreen from './LiveScreen';
import styles from '../styles/StreamerScreen.module.css';
import liveIcon from '../assets/images/live_icon.png';

const StreamerScreen = ({ wsIsLive, wsStreamKey }) => {
    return (
        <div className={styles.streamingContainer}>
            <div>
                <LiveScreen
                    wsIsLive={wsIsLive}
                    wsStreamKey={wsStreamKey}
                    width={620}
                />
            </div>
            <div className={styles.liveIndicator}>
            <img src={liveIcon} alt="Icon" className="icon-image"/>
            </div>
        </div>
    );
};

export default StreamerScreen;
