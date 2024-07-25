import React from 'react';
import styles from '../styles/Streamer.module.css';
import LiveScreen from './LiveScreen';
import BroadcastControl from './BroadcastControl';
import ChatBox from './ChatBox';
import ProductionInfo from './ProductionInfo';

const Streamer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className={styles.leftSection}>
                    <section className={styles.streamSection}>
                        <LiveScreen />
                        <BroadcastControl />
                    </section>
                    <section className={styles.productionInfoSection}>
                    <ProductionInfo />
                    </section>
                </div>
                <ChatBox />
            </div>
        </div>
    );
};

export default Streamer;
