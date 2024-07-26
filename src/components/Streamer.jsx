import React, { useState } from 'react';
import styles from '../styles/Streamer.module.css';
import LiveScreen from './LiveScreen';
import BroadcastControl from './BroadcastControl';
import ChatBox from './chat/ChatBox';
import ProductionInfoInput from './ProductionInfoInput';
import ProductionInfo from './ProductionInfo';

const Streamer = () => {
    const [isSettingCompleted, setSettingCompleted] = useState(false);
    const [productInfo, setProductInfo] = useState({
        name: '',
        price: '',
        quantity: '',
        introduction: ''
    });

    const onSettingComplete = (productId, info) => {
        setProductInfo(info);
        setSettingCompleted(true);
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
                        {isSettingCompleted ? (
                            <ProductionInfo
                                name={productInfo.name}
                                price={productInfo.price}
                                quantity={productInfo.quantity}
                                introduction={productInfo.introduction}
                            />
                        ) : (
                            <ProductionInfoInput
                                onSettingComplete={onSettingComplete}
                            />
                        )}
                    </section>
                </div>
                <ChatBox />
            </div>
        </div>
    );
};

export default Streamer;
