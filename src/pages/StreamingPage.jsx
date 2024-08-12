import React, { useEffect, useState } from 'react';
import ChatBox from '../components/chat/ChatBox';
import { useNavigate } from 'react-router-dom';
import '../styles/StreamingPage.css';
import ProductionInfoForStreaming from '../components/ProductionInfoForStreaming';
import LiveScreen from '../components/LiveScreen';
import axiosInstance from '../axiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import useWebSocket from '../hooks/useWebSocket';

function StreamingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(null);
  const [itemName, setItemName] = useState('');

  const productId = useSelector((state) => state.product.id);
  const productName = useSelector((state) => state.product.name);
  const productPrice = useSelector((state) => state.product.price);
  const productQuantity = useSelector((state) => state.product.quantity);
  const broadcastId = useSelector((state) => state.broadcast.id);
  const userId = useSelector((state) => state.user.id); // Redux store에서 user id를 가져온다고 가정
  console.log(userId);

  // 웹소켓 훅을 한 번만 호출
  const { requestStreamKey, wsIsLive, wsStreamKey, messages, sendMessage, isAvailableChat, userNickname } = useWebSocket('');

  useEffect(() => {
    console.log(`Product ID from Redux: ${productId}`); // Redux에서 가져온 productId를 로그로 출력

    const fetchProductInfo = async () => {
      try {
        console.log(`Fetching product info for productId: ${productId}`);
        const response = await axiosInstance.get(`/product/${productId}`);
        console.log('Product info:', response.data);
        setAmount(response.data.data.price); // 상품 정보에서 amount 값을 설정
        setItemName(response.data.data.name); // 상품 이름 설정
      } catch (error) {
        console.error('error: error fetching product info', error);
      }
    };

    if (productId) {
      fetchProductInfo();
    }
  }, [productId, dispatch]);

  const handleBuyClick = async (event) => {
    console.log('product id: ' + productId);
    console.log('broadcast id: ' + broadcastId);
    console.log('product name: ' + productName);
    console.log('product price: ' + productPrice);
    console.log('product quantity: ' + productQuantity);

    try {
      const response = await axiosInstance.post(`/broadcast/${broadcastId}/product/${productId}`, {}, {
        headers: {
          Authorization: localStorage.getItem('accessToken')
        }
      });

      console.log('재고 확인 성공: ' + response.data.message);

      console.log(userId);
      console.log(productId);
      console.log(amount);
      console.log(broadcastId);
      console.log(itemName);

      navigate('/payment', {
        state: {
          userId,
          productId,
          amount,
          broadcastId,
          itemName, // itemName을 전달합니다.
        }
      });
    } catch (error) {
      console.error('재고 확인 실패: ' + (error.response?.data?.message || error.message));
      alert("남은 재고가 없습니다. 죄송합니다.");
    }
  };

  if (amount === null) {
    return <div>Loading...</div>; // 금액을 불러오는 동안 로딩 화면을 표시
  }

  return (
    <div className="streaming-page">
      <div className="player-container">
        <LiveScreen 
          requestStreamKey={requestStreamKey} 
          wsIsLive={wsIsLive} 
          wsStreamKey={wsStreamKey} 
        />
        <div className="product-info-wrapper">
          <div className="product-info">
            <ProductionInfoForStreaming onProductInfo={(productData) => setAmount(productData.product_price)} />
          </div>
          <button className="buy-button" onClick={handleBuyClick}>구매 하기</button>
        </div>
      </div>
      <div className="chatbox-container">
        <ChatBox 
          messages={messages} 
          sendMessage={sendMessage} 
          isAvailableChat={isAvailableChat} 
          userNickname={userNickname} 
        />
      </div>
    </div>
  );
}

export default StreamingPage;

