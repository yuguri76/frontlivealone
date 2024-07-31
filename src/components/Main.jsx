import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Main.module.css';
import axiosInstance from '../axiosInstance';

const Main = () => {
  const navigate = useNavigate();
  const [broadcastTitle, setBroadcastTitle] = useState('');

  useEffect(() => {
    const getBroadcast = async () => {
      try {
        const response = await axiosInstance.get('/broadcast');
        setBroadcastTitle(response.data.data.title);
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

  const handleStreamingClick = () => {
    navigate('/streaming');
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
        <div className={styles.streamerPage}>
          <div className={styles.streamerText}>스트리머 페이지</div>
          <button className={styles.streamButton} onClick={handleStreamerClick}>방송하기</button>
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
