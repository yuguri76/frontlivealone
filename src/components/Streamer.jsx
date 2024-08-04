import React, { useState, useEffect } from 'react';
import styles from '../styles/Streamer.module.css';
import LiveScreen from './LiveScreen';
import BroadcastControl from './BroadcastControl';
import ChatBox from './chat/ChatBox';
import ProductionInfoInput from './ProductionInfoInput';
import ProductionInfo from './ProductionInfo';
import {useDispatch} from "react-redux";
import {setProductPrice, setProductName} from "../store/store";

const Streamer = () => {
    const initialIsSettingCompleted = JSON.parse(localStorage.getItem('isSettingCompleted')) || false;
    const initialProduct = JSON.parse(localStorage.getItem('product')) || {};

    const [isSettingCompleted, setSettingCompleted] = useState(initialIsSettingCompleted);
    const [product, setProduct] = useState(initialProduct);

    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem('isSettingCompleted', JSON.stringify(isSettingCompleted));
    }, [isSettingCompleted]);

    useEffect(() => {
        localStorage.setItem('product', JSON.stringify(product));
        console.log("product ===> ", product);

        // dispatch(setProductId(response.data.data.id));
        dispatch(setProductPrice(product.price));
        dispatch(setProductName(product.name));
    }, [product]);


    const onSettingComplete = (product) => {
        setProduct(product);
        setSettingCompleted(true);
    };

    const onBroadcastClose = () => {
        setSettingCompleted(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className={styles.leftSection}>
                    <section className={styles.streamSection}>
                        <LiveScreen />
                        <BroadcastControl
                            product={product}
                            isSettingCompleted={isSettingCompleted}
                            onBroadcastClose={onBroadcastClose}
                        />
                    </section>
                    <section className={styles.productionInfoSection}>
                        {isSettingCompleted ? (
                            <ProductionInfo
                                product={product}
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
