import React from 'react';
import styles from '../styles/BroadcastControl.module.css';

const BroadcastControl = ({}) => {
    return (
        <div className={styles.control}>
            <div className={styles.controlItem}>
                <label>방송 제목</label>
                <input type="text" placeholder="방송 제목" />
            </div>
            <div className={styles.controlItem}>
                <label>방송 코드</label>
                <input type="text" placeholder="시간별 코드 입력" />
            </div>
            <div className={styles.buttons}>
                <button className={styles.startButton}>방송 시작</button>
                <button className={styles.stopButton}>방송 중단</button>
            </div>
        </div>
    );
};

export default BroadcastControl;
