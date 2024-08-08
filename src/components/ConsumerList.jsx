// src/components/CompletePayment.jsx
import React, {useEffect, useState} from 'react';
import styles from '../styles/ConsumerList.module.css';
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../axiosInstance";

const ConsumerList = () => {
  const { broadcastId: paramBroadcastId} = useParams();
  const [broadcastId, setBroadcastId] = useState(paramBroadcastId);

  useEffect(() => {
    getConsumerList();
  }, []);

  const getConsumerList = async () => {
    try {
      const response = await axiosInstance.get(
          `/admin/broadcast/${broadcastId}/consumer`, {}, {
            headers: {
              Authorization: localStorage.getItem('accessToken')
            }
          });

      console.log(response.data.data);
    } catch (error) {
      if (error.response.data.message) {
        console.error(
            `Get consumer list error: ${error.response.data.message}`);
      }
    }
  };

  return (
      <div className={styles.adminConsumerContainer}>
        <div className={styles.adminMenuContainer}>
          <span>관리자 페이지</span>
          <span>></span>
          <span>선산곱창 할인</span>
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
            <tr>
              <td>1.</td>
              <td>홍길동</td>
              <td>10 개</td>
              <td>90000 원</td>
              <td>2023-23-23 23:12:12</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>홍길동</td>
              <td>10 개</td>
              <td>90000 원</td>
              <td>2023-23-23 23:12:12</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>홍길동</td>
              <td>10 개</td>
              <td>90000 원</td>
              <td>2023-23-23 23:12:12</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>홍길동</td>
              <td>10 개</td>
              <td>90000 원</td>
              <td>2023-23-23 23:12:12</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>홍길동</td>
              <td>10 개</td>
              <td>90000 원</td>
              <td>2023-23-23 23:12:12</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>홍길동</td>
              <td>10 개</td>
              <td>90000 원</td>
              <td>2023-23-23 23:12:12</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>홍길동</td>
              <td>10 개</td>
              <td>90000 원</td>
              <td>2023-23-23 23:12:12</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>홍길동</td>
              <td>10 개</td>
              <td>90000 원</td>
              <td>2023-23-23 23:12:12</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>홍길동</td>
              <td>10 개</td>
              <td>90000 원</td>
              <td>2023-23-23 23:12:12</td>
            </tr>
            <tr>
              <td>1.</td>
              <td>홍길동</td>
              <td>10 개</td>
              <td>90000 원</td>
              <td>2023-23-23 23:12:12</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.consumerListPageContainer}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
  );
};

export default ConsumerList;

// <div className={styles.consumerMenu}>
//   <span>이름</span>
//   <span>구매 개수</span>
//   <span>결제 금액</span>
//   <span>주문 일시</span>
// </div>
// <div className={styles.consumersContainer}>
//   <div className={styles.consumerContainer}>
//     <span>1. </span>
//     <span>홍길동</span>
//     <span>10 개</span>
//     <span>90000 원</span>
//     <span>2020-30-93 23:23:12</span>
//   </div>
// </div>
