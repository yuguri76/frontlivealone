import React, { useEffect, useState } from 'react';
import HLSPlayer from '../components/HLSPlayer';
import ChatBox from '../components/chat/ChatBox';
import {link, useNavigate} from "react-router-dom";
import '../styles/StreamingPage.css'
import ProductionInfoForStreaming from "../components/ProductionInfoForStreaming";
import useWebSocket from '../hooks/useWebSocket';
import axiosInstance from "../axiosInstance";
import { useSelector, useDispatch } from 'react-redux';

function StreamingPage() {
  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const { streamKey } = useWebSocket(token);
  const productId = useSelector((state) => state.product.id);
  const broadcastId = useSelector((state) => state.broadcast.id);

  useEffect(() => {
    const newToken = localStorage.getItem('accessToken');
    console.log(newToken);
    if (newToken) {
      setToken(newToken);
    }
  }, []);

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
          <HLSPlayer src={`http://seoldarin.iptime.org:7937/hls/${streamKey}.m3u8`} />
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