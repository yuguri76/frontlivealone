import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../styles/PaymentPage.module.css';
import {useSelector} from "react-redux";
import axiosInstance from "../../axiosInstance";

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    //const userId = useSelector((state) => state.user.id);
    const user = localStorage.getItem('user');
    const userId = useSelector((state) => state.user.id);
    const productId = useSelector((state) => state.product.id);
    const itemName = useSelector((state) => state.product.name);
    const amount = useSelector((state) => state.product.price);
    // const product = localStorage.getItem('product');
    // const userobj = JSON.parse(user);
    // const productObj = JSON.parse(product);
    //
    // const {id: userId} = userobj;
    // const {id: productId, name: itemName, price: amount, quantity} = productObj;

    const broadcastId = useSelector((state) => state.broadcast.id);

    console.log("product id: " + productId);
    console.log("broadcast id: " + broadcastId);
    console.log("amount: " + amount);
    console.log("itemName: " + itemName);

    const [orderQuantity, setOrderQuantity] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [deliveryRequest, setDeliveryRequest] = useState('');
    const [orderId, setOrderId] = useState(null);

    const handleOrderComplete = async () => {
        const orderRequestDto = {
            quantity: parseInt(orderQuantity, 10),
        };

        const url = `http://${process.env.REACT_APP_SERVER_ADDRESS}/order/broadcast/${broadcastId}/product/${productId}`;

        console.log('userId', userId);

        try {
            const response = await axiosInstance.post(url, orderRequestDto, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('accessToken'),
                },
            });

            const result = response.data;

            console.log('주문 생성 응답:', result);

            if (result.status_code === 200) {
                alert('주문이 성공적으로 생성되었습니다.');
                setOrderId(result.data.order_id);
            } else {
                alert(`주문 생성에 실패했습니다. 다시 시도해 주세요. 상태: ${result.status_code}`);
            }
        } catch (error) {
            console.error('주문 생성 중 오류 발생:', error);
            if (error.response) {
                console.error('오류 응답 데이터:', error.response.data);
                alert(`주문 처리 중 오류가 발생했습니다. 다시 시도해 주세요. 오류 메시지: ${error.response.data.message || error.response.data}`);
            } else {
                alert('주문 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        }
    };

    const handleKakaoPayment = async () => {
        if (orderId == null) {
            alert('주문이 생성되지 않았습니다. 다시 시도해 주세요.');
            return;
        }

        const paymentRequestDto = {
            userId,
            orderId,
            amount,
            paymentMethod: 'KAKAO_PAY',
            orderQuantity,
            shippingAddress,
            deliveryRequest,
            itemName // itemName 추가
        };

        console.log('userId', userId);

        const url = `http://${process.env.REACT_APP_SERVER_ADDRESS}/payment/kakao/process`;

        try {
            const response = await axiosInstance.post(url, paymentRequestDto, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

            console.log('결제 준비 응답:', result);

            if (result.status === 'READY') {
                const redirectUrl = `${result.next_redirect_url}?orderId=${paymentRequestDto.orderId}&userId=${paymentRequestDto.userId}`;

                console.log("redirectUrl => ", redirectUrl)
                window.location.href = redirectUrl;
            } else {
                alert('결제 준비에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('결제 처리 중 오류 발생:', error);
            if (error.response) {
                console.error('오류 응답 데이터:', error.response.data);
                alert(`결제 처리 중 오류가 발생했습니다. 다시 시도해 주세요. 오류 메시지: ${error.response.data.message || error.response.data}`);
            } else {
                alert('결제 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        }
    };

    const handleTossPayment = async () => {
        const paymentRequestDto = {
            userId,
            orderId,
            amount,
            paymentMethod: 'TOSS_PAY',
            orderQuantity,
            shippingAddress,
            deliveryRequest,
            itemName // itemName 추가
        };

        const url = `http:/${process.env.REACT_APP_SERVER_ADDRESS}/payment/toss/process`;

        try {
            const response = await axiosInstance.post(url, paymentRequestDto, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

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
        const paymentRequestDto = {
            userId,
            orderId,
            amount,
            paymentMethod: 'KAKAO_PAY', // 혹은 'TOSS_PAY'로 변경
            orderQuantity,
            shippingAddress,
            deliveryRequest,
            itemName // itemName 추가
        };

        const url = `http://${process.env.REACT_APP_SERVER_ADDRESS}/payment/complete`;

        try {
            const response = await axiosInstance.post(url, paymentRequestDto, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

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
                    <button className={styles.completeButton} onClick={handleOrderComplete}>완료</button>
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

