import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Main.module.css';
import axiosInstance from '../axiosInstance';
import { useDispatch } from 'react-redux';
import {
  setBroadcastId,
  setProductId,
  setProductName, setProductPrice,
  setProductQuantity
} from "../store/store";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [broadcastTitle, setBroadcastTitle] = useState('');

  useEffect(() => {
    const getBroadcast = async () => {
      try {
        const response = await axiosInstance.get('/broadcast');
        setBroadcastTitle(response.data.data.broadcast_title);
      } catch (error) {
        setBroadcastTitle(error.response.data.message);
      }
    };

    getBroadcast();
  }, []);

  const handleStreamerClick = () => {
    if (localStorage.getItem('accessToken') !== null)
      navigate('/streamer');
    else
      navigate('/login');
  };

  const handleReservationClick = () => {
    if (localStorage.getItem('accessToken') !== null)
      navigate('/reservation');
    else
      navigate('/login');
  };

  const handleStreamingClick = async () => {
    navigate('/streaming');

    try {
      const response = await axiosInstance.get(`/broadcast`, {}, {
        headers: {
          Authorization: localStorage.getItem('accessToken')
        }
      });

      console.log("서버로부터 product_id, broadcast_id 가져오기");
      console.log(response.data.data);

      dispatch(setBroadcastId(response.data.data.broadcast_id));
      dispatch(setProductId(response.data.data.product_id));
      dispatch(setProductName(response.data.data.product_name));
      dispatch(setProductQuantity(response.data.data.product_quantity));
      dispatch(setProductPrice(response.data.data.product_price));
    } catch (error) {
      console.error('상품, 방송 정보 가져오기 실패: ' + (error.response?.data?.message
        || error.message));
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.siteIntro}>
        <h3>나 혼자 살고(Live) 나 혼자 산다(Buy)!</h3>
        <h3>자취생들을 위한 홈쇼핑</h3>
        <h3>나 혼자 산다에 오신 것을 환영합니다.</h3>
        <p>나 혼자 산다는 자취생 꿀템을 판매하고 구매할 수 있는 라이브 커머스 사이트입니다.</p>
      </div>
      <div className={styles.sections}>
        <div className={styles.streamerSection}>
          <div className={styles.reservationPage}>
            <div className={styles.streamerText}>예약 페이지</div>
            <button className={styles.reservationButton} onClick={handleReservationClick}>예약하기</button>
          </div>
          <div className={styles.streamerPage}>
            <div className={styles.streamerText}>스트리머 페이지</div>
            <button className={styles.streamButton} onClick={handleStreamerClick}>방송하기</button>
          </div>
        </div>
        <div className={styles.onAir}>
          <div className={styles.onAirText}>ON AIR!</div>
          <div className={styles.discountText}>{broadcastTitle}</div>
          <button className={styles.watchButton} onClick={handleStreamingClick}>보러가기</button>
        </div>
        <div className={styles.ad}>
        </div>
      </div>
    </div>
  );
};

export default Main;
