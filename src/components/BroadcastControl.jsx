import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import styles from '../styles/BroadcastControl.module.css';

const BroadcastControl = ({ product, isSettingCompleted, onBroadcastClose }) => {
    const initialIsBroadcastStart = JSON.parse(localStorage.getItem('isBroadcastStart')) || false;

    const [isBroadcastStart, setBroadcastStart] = useState(initialIsBroadcastStart);
    const [title, setTitle] = useState(localStorage.getItem('title') || '');
    const [code, setCode] = useState(localStorage.getItem('code') || '');

    useEffect(() => {
        localStorage.setItem('isBroadcastStart', JSON.stringify(isBroadcastStart));
        localStorage.setItem('title', title);
        localStorage.setItem('code', code);
    }, [isBroadcastStart, title, code]);

    const handleBroadcastStart = async () => {
        try {
            const response = await axiosInstance.post(`/broadcast`, {
                "title": title,
                "code": code,
                "product_id": product.id
            }, {
                headers: {
                    Authorization: localStorage.getItem('accessToken')
                }
            });

            setBroadcastStart(true);

        } catch (error) {
            if (error.response.data.message) {
                alert(`${error.response.data.message}`);
            }
        }
    };

    const handleBroadcastClose = async () => {
        try {
            const response = await axiosInstance.patch(`/broadcast`, {}, {
                headers: {
                    Authorization: localStorage.getItem('accessToken')
                }
            });

            setBroadcastStart(false);
            onBroadcastClose();
        } catch (error) {
            if (error.response.data.message) {
                alert(`${error.response.data.message}`);
            }
        }
    };

    return (
        <div className={styles.control}>
            <div className={styles.controlItem}>
                <label>방송 제목</label>
                <input type="text" placeholder="방송 제목" disabled={!isSettingCompleted || isBroadcastStart} value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className={styles.controlItem}>
                <label>방송 코드</label>
                <input type="text" placeholder="시간별 코드 입력" disabled={!isSettingCompleted || isBroadcastStart} value={code} onChange={(e) => setCode(e.target.value)} />
            </div>
            <div className={styles.buttons}>
                <button className={styles.startButton} disabled={!isSettingCompleted || isBroadcastStart} onClick={handleBroadcastStart}>방송 시작</button>
                <button className={styles.stopButton} disabled={!isBroadcastStart} onClick={handleBroadcastClose}>방송 중단</button>
            </div>
        </div>
    );
};

export default BroadcastControl;
