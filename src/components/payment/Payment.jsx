import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/PaymentPage.module.css';

const Payment = () => {
    const navigate = useNavigate();
    const [orderQuantity, setOrderQuantity] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [deliveryRequest, setDeliveryRequest] = useState('');

    const handleKakaoPayment = async () => {
        const paymentRequestDto = {
            userId: 2,
            orderId: 2,
            amount: 2200,
            orderQuantity: orderQuantity,
            shippingAddress: shippingAddress,
            deliveryRequest: deliveryRequest,
            paymentMethod: 'KAKAO_PAY',
        };

        const url = 'http://seoldarin.iptime.org:7937/payment/kakao/process';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentRequestDto),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            if (result.status === 'READY') {
                const redirectUrl = `${result.next_redirect_url}?orderId=${paymentRequestDto.orderId}&userId=${paymentRequestDto.userId}`;
                window.location.href = redirectUrl;
            } else {
                alert('결제 준비에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('Error during payment process:', error);
            alert('결제 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    const handleTossPayment = async () => {
        const paymentRequestDto = {
            userId: 2,
            orderId: 298765123481,
            amount: 2200,
            orderQuantity: orderQuantity,
            shippingAddress: shippingAddress,
            deliveryRequest: deliveryRequest,
            paymentMethod: 'TOSS_PAY',
        };

        const url = 'http://seoldarin.iptime.org:7937/payment/toss/process';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentRequestDto),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            if (result.status === 'READY') {
                const redirectUrl = result.next_redirect_url;
                window.location.href = redirectUrl;
            } else {
                alert('결제 준비에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('Error during payment process:', error);
            alert('결제 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    const handleCompletePayment = async () => {
        const paymentRequestDto = { //이번에 했던 결제정보 끌고와서 complete면 완료눌렀을 때 넘어가고 아니면 x(지금 당장은 결제 완료되면 바로 완료창으로 넘어가게 함. 상의해보기)
            userId: 2,
            orderId: 2,
            amount: 2200,
            orderQuantity: orderQuantity,
            shippingAddress: shippingAddress,
            deliveryRequest: deliveryRequest,
            paymentMethod: 'KAKAO_PAY', // 혹은 'TOSS_PAY'로 변경
        };

        const url = 'http://seoldarin.iptime.org:7937/payment/complete'; // 결제 완료 API URL

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentRequestDto),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            if (result.status === 'COMPLETED') {
                navigate('/completePaymentPage');
            } else {
                alert('결제가 완료되지 않았습니다.');
            }
        } catch (error) {
            console.error('Error during complete payment process:', error);
            alert('결제 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };


    return (
        <div className={styles.pageContainer}>
            <div className={styles.paymentContainer}>
                <h1>결제 정보 입력</h1>
                <div className={styles.formGroup}>
                    <label>주문 수량</label>
                    <input
                        type="text"
                        placeholder="주문 수량 입력"
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>배송 주소</label>
                    <input
                        type="text"
                        placeholder="배송 주소 입력"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                    />
                </div>
                <button className={styles.defaultAddressButton}>기본 배송지로 설정</button>
                <div className={styles.formGroup}>
                    <label>배송 요청사항</label>
                    <input
                        type="text"
                        placeholder="배송 요청 사항"
                        value={deliveryRequest}
                        onChange={(e) => setDeliveryRequest(e.target.value)}
                    />
                </div>
                <div className={styles.paymentMethods}>
                    <img
                        src="https://velog.velcdn.com/images/ysy9976/post/4171da19-0932-4edb-82fc-c9b787100bd8/image.png"
                        alt="Kakao Pay"
                        onClick={handleKakaoPayment}
                    />
                    <img
                        src="https://velog.velcdn.com/images/ysy9976/post/07de8ce3-5fc5-41af-b865-4ee89a773bab/image.png"
                        alt="Toss"
                        onClick={handleTossPayment}
                    />
                </div>
                <button className={styles.submitButton} onClick={handleCompletePayment}>완료</button>
            </div>
        </div>
    );
};

export default Payment;
