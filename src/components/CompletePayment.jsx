// src/components/CompletePayment.jsx
import React from 'react';
import styles from '../styles/CompletePaymentPage.module.css';

const CompletePayment = () => {
    const handleReturn = () => {
        window.location.href = 'http://livealone.shop:3000'; // 메인 페이지로 돌아가기
    };

    return (
        <div className={styles.completeContainer}>
            <div className={styles.messageContainer}>
                <h1>결제가 완료되었습니다!</h1>
                <p>구매해주셔서 감사합니다.</p>
                <img src="https://velog.velcdn.com/images/ysy9976/post/37629fae-0122-44ce-8ff4-ee850e0e49a8/image.png"
                     alt="Delivery Truck"/>
                <p>배송은 3일 소요됩니다.</p>
                <button className={styles.returnButton} onClick={handleReturn}>메인 페이지로 돌아가기</button>
            </div>
        </div>
    );
};

export default CompletePayment;
