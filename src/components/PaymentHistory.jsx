import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import styles from '../styles/History.module.css';
import axiosInstance from '../axiosInstance';
import classNames from "classnames";

const PaymentHistory = () => {
  const location = useLocation();
  const {payments} = location.state;
  const [cursor, setCursor] = useState(0);

  const handleClick = cursor => event => {
    setCursor(cursor)
  }

  return (
      <div className={styles.historyContainer}>
        <div className={styles.historyNameContainer}>
          <span>주문 내역</span>
        </div>
        <div className={styles.line}></div>
        <div className={styles.historyContentContainer}>
          {
            payments.slice(cursor * 5, cursor * 5 + 5).map((content, index) => {
              const {created_at} = content;
              const [createdDate, rawCreatedTime] = created_at.split('T') // ['YYYY-MM-DD', 'HH:MM:SS.ms']
              const [createdTime, _] = rawCreatedTime.split('.');
              return (
                  <div className={styles.historyContent} key={index}>
                    <span className={styles.historyContentName}>{content.product_name}</span>
                    <span>{content.quantity} 개</span>
                    <span>{content.amount} 원</span>
                    <span>{content.payment_method}</span>
                    <span className={styles.historyContentTime}>{createdDate}</span>
                    <span className={styles.historyContentTime}>{createdTime}</span>
                  </div>
              )
            })
          }
        </div>
        <div className={styles.pageContainer}>
          <span className={classNames({[styles.pageSelect]: cursor === 0})}
                onClick={handleClick(0)}>1</span>
          <span className={classNames({[styles.pageSelect]: cursor === 1})}
                onClick={handleClick(1)}>2</span>
          <span className={classNames({[styles.pageSelect]: cursor === 2})}
                onClick={handleClick(2)}>3</span>
          <span className={classNames({[styles.pageSelect]: cursor === 3})}
                onClick={handleClick(3)}>4</span>
          <span className={classNames({[styles.pageSelect]: cursor === 4})}
                onClick={handleClick(4)}>5</span>
        </div>
      </div>
  );
}

export default PaymentHistory;