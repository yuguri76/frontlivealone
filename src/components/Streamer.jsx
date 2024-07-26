import React, { useState } from 'react';
import styles from '../styles/Streamer.module.css';
import LiveScreen from './LiveScreen';
import BroadcastControl from './BroadcastControl';
import ChatBox from './ChatBox';
import ProductionInfoInput from './ProductionInfoInput';

const Streamer = () => {
    const [isSettingCompleted, setSettingCompleted] = useState(false);

    const onSettingComplete = () => {
        setSettingCompleted(true);
        // ProductionInfo 대신 완료 된 걸로 렌더링
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className={styles.leftSection}>
                    <section className={styles.streamSection}>
                        <LiveScreen />
                        <BroadcastControl 
                            isSettingCompleted={isSettingCompleted}
                        />
                    </section>
                    <section className={styles.productionInfoSection}>
                        <ProductionInfoInput
                            onSettingComplete={onSettingComplete}
                        />
                    </section>
                </div>
                <ChatBox />
            </div>
        </div>
    );
};

export default Streamer;
