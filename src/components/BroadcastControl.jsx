import React, { useState } from 'react';
import styles from '../styles/BroadcastControl.module.css';

const BroadcastControl = ({ isSettingCompleted }) => {
    const [isBroadcastStart, setBroadcastStart] = useState(false);

    const handleBroadcastStart = () => {
        // 방송 시작 api 연결

        setBroadcastStart(true);
    };

    const handleBroadcastClose = () => {
        // 방송 중단 api 연결

        setBroadcastStart(false);
    };

    return (
        <div className={styles.control}>
            <div className={styles.controlItem}>
                <label>방송 제목</label>
                <input type="text" placeholder="방송 제목" disabled={!isSettingCompleted || isBroadcastStart} />
            </div>
            <div className={styles.controlItem}>
                <label>방송 코드</label>
                <input type="text" placeholder="시간별 코드 입력" disabled={!isSettingCompleted || isBroadcastStart} />
            </div>
            <div className={styles.buttons}>
                <button className={styles.startButton} disabled={!isSettingCompleted || isBroadcastStart} onClick={handleBroadcastStart}>방송 시작</button>
                <button className={styles.stopButton} disabled={!isBroadcastStart} onClick={handleBroadcastClose}>방송 중단</button>
            </div>
        </div>
    );
};

export default BroadcastControl;
