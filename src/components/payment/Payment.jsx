import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../styles/PaymentPage.module.css';
import {useSelector} from "react-redux";
import axiosInstance from "../../axiosInstance";
import Timer from "../Timer";
import AddressForm from "../AddressForm";
import classNames from "classnames";

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    //const userId = useSelector((state) => state.user.id);
    const user = JSON.parse(localStorage.getItem('user'));
    // const userId = useSelector((state) => state.user.id);
    const userId = user.id;
    const productId = useSelector((state) => state.product.id);
    const itemName = useSelector((state) => state.product.name);
    const amount = useSelector((state) => state.product.price);

    const broadcastId = useSelector((state) => state.broadcast.id);

    console.log("product id: " + productId);
    console.log("broadcast id: " + broadcastId);
    console.log("amount: " + amount);
    console.log("itemName: " + itemName);

    const [orderQuantity, setOrderQuantity] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [deliveryRequest, setDeliveryRequest] = useState('');
    const [orderId, setOrderId] = useState(null);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [hideInputAddress, setHideInputAddress] = useState(true);

    const handleOrderComplete = async () => {

        const curquantity = parseInt(orderQuantity, 10);

        if (isNaN(curquantity) || curquantity < 1){
            alert('유효한 숫자를 입력해주세요. (1 이상의 숫자)');
            return false;
        }

        const orderRequestDto = {
            quantity: curquantity,
        };

        const url = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_SERVER_ADDRESS}/order/broadcast/${broadcastId}/product/${productId}`;

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
                setIsTimerActive(true);
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

        const url = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_SERVER_ADDRESS}/payment/kakao/process`;

        try {
            const response = await axiosInstance.post(url, paymentRequestDto, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('accessToken'),
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

        if (orderId == null) {
            alert('주문이 생성되지 않았습니다. 다시 시도해 주세요.');
            return;
        }

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

        const url = `/payment/toss/process`;

        try {
            const response = await axiosInstance.post(url, paymentRequestDto, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('accessToken'),
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

        const url = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_SERVER_ADDRESS}/payment/complete`;

        try {
            const response = await axiosInstance.post(url, paymentRequestDto, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('accessToken'),
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

    const handleTimeExpired = async () => {
        try {
            const response = await axiosInstance.delete(`/order/product/${productId}`, {
            }, {
                headers: {
                    Authorization: localStorage.getItem('accessToken')
                }
            });

            if(response.status === 200) {
                alert('주문 시간이 만료되었습니다. 다시 주문해 주세요.');
                setOrderId(null);
                setIsTimerActive(false);
                navigate('/streaming')
            }
        } catch (error) {
            console.error('서버와 통신 중 오류 발생',error);
            alert("요청 실패 : " + error);
        }
    };

    const handleAddressSubmit = (addressData) => {
        setShippingAddress(addressData.fullAddress);
        setHideInputAddress(true);
        console.log(shippingAddress);
    };

    const getDefaultAddress = async () => {
        try {
            const response = await axiosInstance.get(
                '/user/address', {}, {
                    headers: {
                        Authorization: localStorage.getItem('accessToken')
                    }
                });

            setShippingAddress(response.data.data.address);
        } catch (error) {
            console.error("Get Default Address err!!!");
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.paymentContainer}>
                <h1>결제 정보 입력</h1>
                {isTimerActive && (
                    <Timer initialTime={600} onExpire={handleTimeExpired}/>
                )}
                {/* 1. 상품 정보 섹션 */}
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>1. 상품 정보</h2>
                    <div className={`${styles.formGroup} ${styles.horizontal}`}>
                        <label>주문 수량</label>
                        <input
                            type="text"
                            placeholder="주문 수량 입력"
                            value={orderQuantity}
                            onChange={(e) => setOrderQuantity(e.target.value)}
                            style={{ marginLeft: '0' }} /* 중앙 정렬을 위해 여백을 제거 */
                        />
                        <button className={styles.completeButton} onClick={handleOrderComplete}>완료</button>
                    </div>
                    <div className={styles.productInfo}>
                        <h4>상품명 : {itemName}</h4>
                        <h4>총 가격 : {amount * orderQuantity}</h4>
                    </div>
                </div>

                {/* 2. 배송 정보 섹션 */}
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>2. 배송 정보</h2>
                    <div className={`${styles.formGroup} ${styles.horizontal}`} style={{ margin: '18px' }}>
                        <label>배송 주소</label>
                        <input
                            type="text"
                            placeholder="아래에서 선택해주세요"
                            value={shippingAddress}
                            readOnly
                        />
                        <button
                            className={styles.completeButton}
                            style={{ visibility: 'hidden' }}
                            aria-hidden="true"
                        >
                            투명 버튼
                        </button>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.defaultAddressButton}
                                onClick={() => setHideInputAddress(false)}>새 배송 주소지 입력
                        </button>
                        <button className={styles.defaultAddressButton} onClick={getDefaultAddress}>기본 배송지로 설정</button>
                    </div>
                    <div
                        className={classNames(styles.formGroup, {[styles.hide]: hideInputAddress, [styles.show]: !hideInputAddress})}
                        style={{ marginBottom: '50px' }} /* 필요한 만큼 간격 설정 */
                    >
                        <label>새 배송 주소지 입력</label>
                        <AddressForm onSubmit={handleAddressSubmit} className={styles.addressFormContainer} />
                    </div>
                    <div className={`${styles.formGroup} ${styles.horizontal}`}>
                        <label>배송 요청사항</label>
                        <input
                            type="text"
                            placeholder="배송 요청 사항"
                            value={deliveryRequest}
                            onChange={(e) => setDeliveryRequest(e.target.value)}
                            style={{ marginLeft: '0' }} /* 중앙 정렬을 위해 여백을 제거 */
                        />
                        <button
                            className={styles.completeButton}
                            style={{ visibility: 'hidden' }}
                            aria-hidden="true"
                        >
                            투명 버튼
                        </button>
                    </div>
                </div>

                {/* 3. 결제 섹션 */}
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>3. 결제</h2>
                    <p
                        className={styles.sectionTitle}
                        style={{ fontSize: '16px' }} /* 글자 크기를 조정하세요 */
                    >
                        카카오페이, 토스페이를 지원합니다.
                    </p>
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
                </div>
            </div>
        </div>
    );
};

export default Payment;


