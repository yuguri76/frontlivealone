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
        대충 사이트 소개
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
          구글 커머스 광고
        </div>
      </div>
    </div>
  );
};

export default Main;
