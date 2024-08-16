import React, {useEffect, useState} from 'react';
import axiosInstance from '../axiosInstance';
import styles from '../styles/History.module.css';
import classNames from "classnames";
import {useParams} from "react-router-dom";

const BroadcastHistory = () => {
  const [broadcasts, setBroadcasts] = useState([]);
  const { userId: paramUserId } = useParams();
  const [userId, setUserId] = useState(paramUserId);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [cursor, setCursor] = useState(1);

  useEffect(() => {
    if (!userId) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUserId(user.id);
    }
    getBroadcasts();
  }, []);

  const getBroadcasts = async (page) => {
    if (isNaN(page)) {
      page = 1;
      setPage(page);
    } else {
      setPage(page);
    }

    try {
      const response = await axiosInstance.get(`/user/${userId}/broadcast`, {
        headers: {
          Authorization: localStorage.getItem('accessToken')
        },
        params: {
          "page": page
        }
      });

      setTotalPage(response.data.data.total_pages);
      setBroadcasts(response.data.data.content);
    } catch (error) {
      console.error('Error fetching broadcasts:', error);
    }
  };

  const handlePageClick = async (event) => {
    let page = parseInt(event.target.innerHTML, 10);
    setCursor(page);
    getBroadcasts(page);
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
          {Array.from({length: totalPage}, (_, index) => (
              <a key={index} onClick={handlePageClick}
                 className={classNames({[styles.pageSelect]: cursor == index + 1})}>
                {index + 1}
              </a>
          ))}
        </div>
      </div>
  );
}

export default BroadcastHistory;