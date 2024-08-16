import React, { useEffect, useState } from 'react';
import ChatBox from '../components/chat/ChatBox';
import { useNavigate } from 'react-router-dom';
import '../styles/StreamingPage.css';
import ProductionInfoForStreaming from '../components/ProductionInfoForStreaming';
import LiveScreen from '../components/LiveScreen';
import axiosInstance from '../axiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import useWebSocket from '../hooks/useWebSocket';
import liveIcon from '../assets/images/live_icon.png';

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
  const { requestStreamKey, wsIsLive, wsStreamKey, messages, sendMessage, isAvailableChat, userNickname} = useWebSocket('');

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
    if(wsIsLive == false) {
      alert("관리자 기본 방송 중엔 판매중인 상품이 없어서 구매하기 기능 사용이 불가능합니다")
      return;
    }
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
    return <div>Loading... 화면이 안 보이면 새로고침 해주세요 </div>; // 금액을 불러오는 동안 로딩 화면을 표시
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
            <div className="stream-title">
              <img src={liveIcon} alt="Icon" className="icon-image"/> {localStorage.getItem("title")}
            </div>
            <ProductionInfoForStreaming onProductInfo={(productData) => setAmount(productData.product_price)}/>
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

