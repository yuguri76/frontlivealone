import React from 'react';
import ChatBox from '../components/chat/ChatBox';
import {link, useNavigate} from "react-router-dom";
import '../styles/StreamingPage.css'
import ProductionInfoForStreaming from "../components/ProductionInfoForStreaming";
import LiveScreen from '../components/LiveScreen';

function StreamingPage() {

    return (
        <div className="streaming-page">
            <div className="player-container">
                <LiveScreen />
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