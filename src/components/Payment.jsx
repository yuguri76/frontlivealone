import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from '../styles/PaymentPage.module.css';

const Payment = () => {
    const navigate = useNavigate();

    const handleComplete = () => {
        navigate('/completepayment');
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.paymentContainer}>
                <h1>결제 정보 입력</h1>
                <div className={styles.formGroup}>
                    <label>주문 수량</label>
                    <input type="text" placeholder="주문 수량 입력"/>
                    <button>완료</button>
                </div>
                <div className={styles.formGroup}>
                    <label>배송 주소</label>
                    <input type="text" placeholder="배송 주소 입력"/>
                    <button>완료</button>
                </div>
                <button className={styles.defaultAddressButton}>기본 배송지로 설정</button>
                <div className={styles.formGroup}>
                    <label>배송 요청사항</label>
                    <input type="text" placeholder="배송 요청 사항"/>
                </div>
                <div className={styles.paymentMethods}>
                    <img
                        src="https://velog.velcdn.com/images/ysy9976/post/07de8ce3-5fc5-41af-b865-4ee89a773bab/image.png"
                        alt="Toss"
                    />
                    <img
                        src="https://velog.velcdn.com/images/ysy9976/post/4171da19-0932-4edb-82fc-c9b787100bd8/image.png"
                        alt="Pay"
                    />
                </div>
                <button className={styles.submitButton} onClick={handleComplete}>완료</button>
            </div>
        </div>
    );
};

export default Payment;
