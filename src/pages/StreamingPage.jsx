import React from 'react';
import ChatBox from '../components/chat/ChatBox';
import {useNavigate} from "react-router-dom";
import '../styles/StreamingPage.css'
import ProductionInfoForStreaming from "../components/ProductionInfoForStreaming";
import LiveScreen from '../components/LiveScreen';
import axiosInstance from "../axiosInstance";
import { useSelector } from 'react-redux';

function StreamingPage() {
  const navigate = useNavigate();

  const productId = useSelector((state) => state.product.id);
  const broadcastId = useSelector((state) => state.broadcast.id);

  const handleBuyClick = async (event) => {
    navigate('/payment');

    console.log("product id: " + productId);
    console.log("broadcast id: " + broadcastId);

    try {
      const response = await axiosInstance.post(`/broadcast/${broadcastId}/product/${productId}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken')
        }
      });
    } catch(error) {
      console.error("error: error response order id");
    }
  }

  return (
      <div className="streaming-page">
        <div className="player-container">
          <LiveScreen />
          <div className="product-info-wrapper">
            <div className="product-info">
              <ProductionInfoForStreaming />
            </div>
            <button className="buy-button" onClick={handleBuyClick}>구매 하기</button>
          </div>
        </div>
        <div className="chatbox-container">
          <ChatBox />
        </div>
      </div>
  );

}

export default StreamingPage;