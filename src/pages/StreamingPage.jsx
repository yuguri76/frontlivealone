import React, { useEffect, useState } from 'react';
import HLSPlayer from '../components/HLSPlayer';
import ChatBox from '../components/chat/ChatBox';
import '../styles/StreamingPage.css'
import ProductionInfoForStreaming from "../components/ProductionInfoForStreaming";
import useWebSocket from '../hooks/useWebSocket';

function StreamingPage() {
    const [token, setToken] = useState('');
    const { streamKey } = useWebSocket(token);

    useEffect(() => {
      const newToken = localStorage.getItem('accessToken');
      console.log(newToken);
      if (newToken) {
        setToken(newToken);
      }
    }, []);

    return (
        <div className="streaming-page">
            <div className="player-container">
                <HLSPlayer src={`http://localhost:8080/hls/${streamKey}.m3u8`} />
                <div className="product-info-wrapper">
                    <div className="product-info">
                        <ProductionInfoForStreaming />
                    </div>
                    <button className="buy-button">구매 하기</button>
                </div>
            </div>
            <div className="chatbox-container">
                <ChatBox />
            </div>
        </div>
    );
}

export default StreamingPage;