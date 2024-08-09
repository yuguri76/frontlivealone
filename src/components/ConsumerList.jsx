// src/components/CompletePayment.jsx
import React, {useEffect, useState} from 'react';
import styles from '../styles/ConsumerList.module.css';
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../axiosInstance";

const ConsumerList = () => {
  const navigate = useNavigate();

  const { broadcastId: paramBroadcastId} = useParams();
  const [broadcastId, setBroadcastId] = useState(paramBroadcastId);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [consumerList, setConsumerList] = useState([]);

  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    getBroadcastTitle();
    getConsumerList();
  }, []);

  const getBroadcastTitle = async () => {
    try {
      const response = await axiosInstance.get(
          `/broadcast/${broadcastId}`, {}, {
            headers: {
              Authorization: localStorage.getItem('accessToken')
            },
          });

      console.log(response.data.data);
      setBroadcastTitle(response.data.data.title);
    } catch (error) {
      if (error.response.data.message) {
        console.error(
            `Get broadcast title error: ${error.response.data.message}`);
      }
    }
  };

  const getConsumerList = async (event) => {

    let page = 1;
    if (event && event.target) {
      page = parseInt(event.target.innerHTML, 10);
    }

    try {
      const response = await axiosInstance.get(
          `/admin/broadcast/${broadcastId}/consumer`, {}, {
            headers: {
              Authorization: localStorage.getItem('accessToken')
            },
            params: {
              "page": page
            }
          });

      console.log(response.data.data);
      setConsumerList(response.data.data.content);
      setTotalPage(response.data.data.total_pages);
    } catch (error) {
      if (error.response.data.message) {
        console.error(
            `Get consumer list error: ${error.response.data.message}`);
      }
    }
  };

  const handleConsumerClick = (event) => {
    navigate(`/user/${event.currentTarget.dataset.id}`)
  };

  const handleAdminPageClick = () => {
    navigate('/admin');
  };

  const handlerBroadcastTitleClick = () => {
    navigate(`/admin/broadcast/${broadcastId}`);
  };

  return (
      <div className={styles.adminConsumerContainer}>
        <div className={styles.adminMenuContainer}>
          <span onClick={handleAdminPageClick}>관리자 페이지</span>
          <span>></span>
          <span onClick={handlerBroadcastTitleClick}>{broadcastTitle}</span>
          <span>></span>
          <span>구매자 목록</span>
        </div>
        <div className={styles.consumerListBox}>
          <table>
            <thead>
            <tr>
              <th></th>
              <th>이름</th>
              <th>구매 개수</th>
              <th>결제 금액</th>
              <th>주문 일시</th>
            </tr>
            </thead>
            <tbody>
            {consumerList.map((consumer, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td data-id={consumer.user_id} onClick={handleConsumerClick} className={styles.consumerName}>{consumer.username}</td>
                  <td>{consumer.product_quantity} 개</td>
                  <td>{consumer.payment_amount} 원</td>
                  <td>{(consumer.order_date).replace('T', ' ')}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className={styles.consumerListPageContainer}>
          {Array.from({length: totalPage}, (_, index) => (
              <span key={index} onClick={getConsumerList}>
                {index + 1}
              </span>
          ))}
        </div>
      </div>
  );
};

export default ConsumerList;