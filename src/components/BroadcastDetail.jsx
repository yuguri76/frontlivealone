// src/components/CompletePayment.jsx
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import styles from '../styles/BroadcastDetail.module.css';
import axiosInstance from "../axiosInstance";

const BroadcastDetail = () => {
  const navigate = useNavigate();

  const { broadcastId: paramBroadcastId} = useParams();
  const [broadcastId, setBroadcastId] = useState(paramBroadcastId);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastStreamer, setBroadcastStreamer] = useState('');
  const [broadcastStartTime, setBroadcastStartTime] = useState('');
  const [broadcastEndTime, setBroadcastEndTime] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productIntroduction, setProductIntroduction] = useState('');
  const [totalOrderCount, setTotalOrderCount] = useState(0);
  const [totalSalePrice, setTotalSalePrice] = useState(0);

  useEffect(() => {
    getBroadcastDetails();
  }, []);

  const getBroadcastDetails = async () => {
    try {
      const response = await axiosInstance.get(`/admin/broadcast/${broadcastId}`, {}, {
        headers: {
          Authorization: localStorage.getItem('accessToken')
        }
      });

      console.log(response.data.data);
      setBroadcastTitle(response.data.data.broadcast_title);
      setBroadcastStreamer(response.data.data.broadcast_streamer);
      setBroadcastStartTime((response.data.data.broadcast_start_time).replace('T', ' '));
      setBroadcastEndTime((response.data.data.broadcast_end_time).replace('T', ' '));
      setProductName(response.data.data.product_name);
      setProductPrice(response.data.data.product_price);
      setProductQuantity(response.data.data.product_quantity);
      setProductIntroduction(response.data.data.product_introduction);
      setTotalOrderCount(response.data.data.total_order_count);
      setTotalSalePrice(response.data.data.total_sale_price);
    } catch (error) {
      if (error.response.data.message) {
        console.error(`Get braodcast details error: ${error.response.data.message}`);
      }
    }
  };

  const handleAdminPageClick = () => {
    navigate('/admin');
  };

  const handleShowConsumerButtonClick = () => {
    navigate(`/admin/broadcast/${broadcastId}/consumer`);
  };

  return (
      <div className={styles.adminDetailsContainer}>
        <div className={styles.adminMenuContainer}>
          <span onClick={handleAdminPageClick}>관리자 페이지</span>
          <span>></span>
          <span>{broadcastTitle}</span>
        </div>
        <div className={styles.userListButtonContainer}>
          <button onClick={handleShowConsumerButtonClick}>구매자 목록 보러가기</button>
        </div>
        <div className={styles.infosContainer}>
          <div className={styles.infoContainer}>
            <h3>방송 정보</h3>
            <div className={styles.infoDetails}>
              <span>제목: {broadcastTitle}</span>
              <span>스트리머: {broadcastStreamer}</span>
              <span>스트리밍 시간: {broadcastStartTime} ~ {broadcastEndTime}</span>
            </div>
          </div>
          <div className={styles.infoContainer}>
            <h3>상품 정보</h3>
            <div className={styles.infoDetails}>
              <span>이름: {productName}</span>
              <span>가격: {productPrice} 원</span>
              <span>수량: {productQuantity} 개</span>
              <span>소개: {productIntroduction}</span>
            </div>
          </div>
          <div className={styles.infoContainer}>
            <h3>매출 정보</h3>
            <div className={styles.infoDetails}>
              <span>총 상품 판매 개수: {totalOrderCount} 개</span>
              <span>총 판매 금액: {totalSalePrice} 원</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BroadcastDetail;
