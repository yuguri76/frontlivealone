import React, {useEffect, useState} from 'react';
import axiosInstance from '../axiosInstance';
import styles from '../styles/History.module.css';
import classNames from "classnames";
import {useParams} from "react-router-dom";

const BroadcastHistory = () => {
  const [broadcasts, setBroadcasts] = useState([]);
  const { userId: paramUserId } = useParams();
  const [userId, setUserId] = useState(paramUserId);

  const [selectPageOne, setSelectPageOne] = useState(true);
  const [selectPageTwo, setSelectPageTwo] = useState(false);
  const [selectPageThree, setSelectPageThree] = useState(false);
  const [selectPageFour, setSelectPageFour] = useState(false);
  const [selectPageFive, setSelectPageFive] = useState(false);

  useEffect(() => {
    if (!userId) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUserId(user.id);
    }

    const getBroadcasts = async () => {
      try {
        const response = await axiosInstance.get(`/user/${userId}/broadcast`, {
          headers: {
            Authorization: localStorage.getItem('accessToken')
          }});

        setBroadcasts(response.data.data);
      } catch (error) {
        console.error('Error fetching broadcasts:', error);
      }
    };

    getBroadcasts();
  }, []);

  const handlePageClick = async (event) => {
    let page = parseInt(event.target.textContent);

    setSelectPageOne(false);
    setSelectPageTwo(false);
    setSelectPageThree(false);
    setSelectPageFour(false);
    setSelectPageFive(false);

    switch (page) {
      case 1: setSelectPageOne(true); break;
      case 2: setSelectPageTwo(true); break;
      case 3: setSelectPageThree(true); break;
      case 4: setSelectPageFour(true); break;
      case 5: setSelectPageFive(true); break;
    }

    try {
      const response = await axiosInstance.get(`/user/${userId}/broadcast?page=${page}`, {
        headers: {
          Authorization: localStorage.getItem('accessToken')
        }});

      console.log(response.data);
      setBroadcasts(response.data.data);
    } catch(error) {
      console.error('Error fetching deliverys:', error);
    }
  }

  return (
      <div className={styles.historyContainer}>
        <div className={styles.historyNameContainer}>
          <span>방송 내역</span>
        </div>
        <div className={styles.historyContentContainer}>
          {
            broadcasts.map((content, index) => (
                <div className={styles.historyContent} key={index}>
                  <span
                      className={styles.historyContentState}>{content.status}</span>
                  <span
                      className={styles.historyContentTitle}>{content.title}</span>
                  <span>상품명: {content.product_name}</span>
                  <span>총 매출: {content.total_sale_price} 원</span>
                  <span
                      className={styles.historyContentTime}>{content.air_time.replace(
                      'T', ' ')}</span>
                </div>
            ))
          }
        </div>
        <div className={styles.pageContainer}>
          <span className={classNames({[styles.pageSelect]: selectPageOne})} onClick={handlePageClick}>1</span>
          <span className={classNames({[styles.pageSelect]: selectPageTwo})} onClick={handlePageClick}>2</span>
          <span className={classNames({[styles.pageSelect]: selectPageThree})} onClick={handlePageClick}>3</span>
          <span className={classNames({[styles.pageSelect]: selectPageFour})} onClick={handlePageClick}>4</span>
          <span className={classNames({[styles.pageSelect]: selectPageFive})} onClick={handlePageClick}>5</span>
        </div>
      </div>
  );
}

export default BroadcastHistory;