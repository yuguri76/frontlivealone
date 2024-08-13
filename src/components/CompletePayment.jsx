import React from 'react';
import styles from '../styles/CompletePaymentPage.module.css';
import truck from '../assets/images/completepayment.png'

const CompletePayment = () => {
    const handleReturn = () => {
        window.location.href = 'http://livealone.shop:3000'; // 메인 페이지로 돌아가기
    };

    return (
        <div className={styles.completeContainer}>
            <div className={styles.messageContainer}>
                <img src={truck} className={styles.truck}
                     alt="truck"/>
                <h1>결제가 완료되었습니다.</h1>
                <p style={{ margin: '5px 0' }}>구매해주셔서 감사합니다.</p>
                <p style={{ margin: '0 0 50px 0' }}>배송은 2일 소요됩니다.</p>
                <button className={styles.returnButton} onClick={handleReturn}>메인 페이지로 돌아가기</button>
            </div>
        </div>
    );
};

export default CompletePayment;
