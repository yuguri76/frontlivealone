// src/components/CompletePayment.jsx
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import styles from '../styles/BroadcastDetail.module.css';
import axiosInstance from "../axiosInstance";
import classNames from "classnames";

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
          <div className={styles.broadcastProductInfoContainer}>
            <div className={classNames(styles.infoContainer, styles.broadcastProductInfo)}>
              <h3>방송 정보</h3>
              <div className={styles.infoDetails}>
                <div className={styles.infoDetailsItem}>
                  <span className={styles.infoDetailsTitle}>제목</span>
                  <span className={styles.infoDetailsInfo}>{broadcastTitle}</span>
                </div>
                <div className={styles.infoDetailsItem}>
                  <span className={styles.infoDetailsTitle}>스트리머</span>
                  <span className={styles.infoDetailsInfo}> {broadcastStreamer}</span>
                </div>
                <div className={styles.infoDetailsItem}>
                  <span className={styles.infoDetailsTitle}>스트리밍 시간</span>
                  <span className={styles.infoDetailsInfo}>{broadcastStartTime} ~ {broadcastEndTime}</span>
                </div>
              </div>
            </div>
            <div className={classNames(styles.infoContainer,
                styles.broadcastProductInfo)}>
              <h3>상품 정보</h3>
              <div className={styles.infoDetails}>
                <div className={styles.infoDetailsItem}>
                  <span className={styles.infoDetailsProductTitle}>이름</span>
                  <span
                      className={styles.infoDetailsInfo}>{productName}</span>
                </div>
                <div className={styles.infoDetailsItem}>
                  <span className={styles.infoDetailsProductTitle}>가격</span>
                  <span
                      className={styles.infoDetailsInfo}>{productPrice} 원</span>
                </div>
                <div className={styles.infoDetailsItem}>
                  <span className={styles.infoDetailsProductTitle}>수량</span>
                  <span
                      className={styles.infoDetailsInfo}>{productQuantity} 개</span>
                </div>
                <div className={styles.infoDetailsItem}>
                  <span className={styles.infoDetailsProductTitle}>소개</span>
                  <span
                      className={styles.infoDetailsInfo}>{productIntroduction}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.infoContainer}>
            <h3>매출 정보</h3>
            <div className={styles.infoDetails}>
              <div className={styles.infoDetailsItem}>
                <span
                    className={styles.infoDetailsSaleTitle}>총 판매한 상품 개수</span>
                <span
                    className={styles.infoDetailsInfo}>{totalOrderCount} 개</span>
              </div>
              <div className={styles.infoDetailsItem}>
                <span
                    className={styles.infoDetailsSaleTitle}>총 판매 금액</span>
                <span
                    className={styles.infoDetailsInfo}>{totalSalePrice} 원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BroadcastDetail;
