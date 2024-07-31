import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/PaymentPage.module.css';

const Payment = () => {
    const navigate = useNavigate();
    const [orderQuantity, setOrderQuantity] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [deliveryRequest, setDeliveryRequest] = useState('');

    const handlePayment = async (paymentMethod) => {
        const paymentRequestDto = {
            userId: 2, // 사용자 ID를 적절하게 설정합니다.
            orderId: 2, // 주문 ID를 적절하게 설정합니다.
            amount: 2200, // 결제 금액을 적절하게 설정합니다.
            orderQuantity: orderQuantity,
            shippingAddress: shippingAddress,
            deliveryRequest: deliveryRequest,
            paymentMethod: paymentMethod,
        };
        console.log("payment_method: ", paymentMethod);
        const url = paymentMethod === 'KAKAO_PAY'
            ? 'http://localhost:8080/payment/kakao/process'
            : 'http://localhost:8080/payment/toss/process';

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

            console.log(response);
            const result = await response.json();
            console.log("Payment Response: ", result); // 응답을 디버깅하기 위해 로그 출력

            if (result.status === 'READY') {
                console.log("Next Redirect URL: ", result); // 추가된 디버깅 로그
                const redirectUrl = `${result.next_redirect_url}?orderId=${paymentRequestDto.orderId}&userId=${paymentRequestDto.userId}`;
                //const redirectUrl = result.next_redirect_url;
                console.log("Redirect URL: ", redirectUrl); // 디버깅을 위해 로그 출력
                window.location.href = redirectUrl;
            } else {
                alert('결제 준비에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('Error during payment process:', error);
            alert('결제 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    const handleKakaoPay = () => {
        handlePayment('KAKAO_PAY');
    };

    const handleTossPay = () => {
        navigate('/checkout');
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
                        onClick={handleKakaoPay}
                    />
                    <img
                        src="https://velog.velcdn.com/images/ysy9976/post/07de8ce3-5fc5-41af-b865-4ee89a773bab/image.png"
                        alt="Toss"
                        onClick={handleTossPay}
                    />
                </div>
                <button className={styles.submitButton} onClick={() => handlePayment('KAKAO_PAY')}>완료</button>
            </div>
        </div>
    );
};

export default Payment;
