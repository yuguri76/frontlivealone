import React, {useEffect, useState} from 'react';
import styles from '../styles/History.module.css';
import axiosInstance from '../axiosInstance';
import classNames from "classnames";
import {useParams} from "react-router-dom";

const DeliveryHistory = () => {
  const { userId: paramUserId } = useParams();
  const [userId, setUserId] = useState(paramUserId);
  const [deliverys, setDeliverys] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [cursor, setCursor] = useState(1);


  useEffect(() => {
    if (!userId) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUserId(user.id);
    }

    getDeliverys();
  }, []);

  const getDeliverys = async (page) => {
    if (isNaN(page)) {
      page = 1;
      setPage(page);
    } else {
      setPage(page);
    }

    try {
      const response = await axiosInstance.get(`/user/${userId}/delivery`, {
        headers: {
          Authorization: localStorage.getItem('accessToken')
        },
        params: {
          "page": page
        }
      });

      setTotalPage(response.data.data.total_pages);
      setDeliverys(response.data.data.content);
    } catch (error) {
      console.error('Error fetching deliverys:', error);
    }
  };

  const handlePageClick = async (event) => {
    let page = parseInt(event.target.innerHTML, 10);
    setCursor(page);
    getDeliverys(page);
  }


  return (
      <div className={styles.historyContainer}>
        <div className={styles.historyNameContainer}>
          <span>배송 정보</span>
        </div>
        <div className={styles.line}></div>
        <div className={styles.historyContentContainer}>
          {
            deliverys.map((content, index) => (
                <div className={styles.historyContent} key={index}>
                  <span className={styles.historyContentState}>{content.order_status}</span>
                  <span className={styles.historyContentTitle}>{content.product_name}</span>
                  <span>{content.address}</span>
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

export default DeliveryHistory;