import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Main.module.css';
import axiosInstance from '../axiosInstance';
import { useDispatch } from 'react-redux';
import broadcast from '../assets/images/broadcast.png';
import reservation from '../assets/images/reservation.png';
import ImageSlider from "../components/ImageSlider.jsx";

import {
  setBroadcastId, setReduxBroadcastTitle,
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
      navigate('/guide');
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
      dispatch(setReduxBroadcastTitle(broadcastTitle));
      dispatch(setProductId(response.data.data.product_id));
      dispatch(setProductName(response.data.data.product_name));
      dispatch(setProductQuantity(response.data.data.product_quantity));
      dispatch(setProductPrice(response.data.data.product_price));
    } catch (error) {
      console.error('상품, 방송 정보 가져오기 실패: ' + (error.response?.data?.message
          || error.message));
    }
  };

  const handleAdClick = () => {
    window.open("https://nbcamp.spartacodingclub.kr/");
  }

  return (
      <div className={styles.mainContainer}>
        <div className={styles.siteIntro}>
          <ImageSlider />
          <h3>나 혼자 살고(Live) 나 혼자 산다(Buy)!</h3>
          <h3>1인 가구를 위한 '라이브커머스'</h3>
          <h3>'나혼자산다'에 오신 것을 환영합니다.</h3>
          <p>'나혼자산다'는 1인가구를 위한 꿀템을 누구든지 쉽게 판매하고 구매할 수 있는 라이브 커머스 사이트입니다.</p>
        </div>

        <div className={styles.sections}>
          <div className={styles.sectionWrapper}>
            <div className={styles.sectionTitle}>빠른 서비스</div>
            <div className={styles.streamerSection}>
              <div className={styles.reservationPage}>
                <img src={reservation} alt="Reservation Icon" className={styles.pageIcon} />
                <button className={styles.reservationButton} onClick={handleReservationClick}>
                  방송 예약하기
                </button>
              </div>
              <div className={styles.streamerPage}>
                <img src={broadcast} alt="Broadcast Icon" className={styles.pageIcon} />
                <button className={styles.streamButton} onClick={handleStreamerClick}>
                  방송 시작하기
                </button>
              </div>
            </div>
          </div>

          <div className={styles.sectionWrapper}>
            <div className={styles.sectionTitle}>실시간 방송</div>
            <div className={styles.onAirContainer}>
              <div className={styles.onAir}>
                <div className={styles.discountText}>
                  {broadcastTitle || "관리자"}
                </div>
                <div className={styles.broadcastStatus}>
                  방송이 현재 진행중입니다
                  <div className={styles.bethestar}>
                    지금 바로 방송의 주인공이 되어보세요!
                  </div>
                </div>
                <button className={styles.watchButton} onClick={handleStreamingClick}>
                  보러가기
                </button>

              </div>
            </div>
          </div>

          <div className={styles.sectionWrapper}>
            <div className={styles.sectionTitle}>바로가기</div>
            <div className={styles.adContainer}>
              <div className={styles.ad} onClick={handleAdClick}>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Main;
