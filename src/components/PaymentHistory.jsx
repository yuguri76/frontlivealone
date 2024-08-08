import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import styles from '../styles/History.module.css';
import axiosInstance from '../axiosInstance';
import classNames from "classnames";

const PaymentHistory = () => {
  const location = useLocation();
  const {payments} = location.state;

  const [selectPageOne, setSelectPageOne] = useState(true);
  const [selectPageTwo, setSelectPageTwo] = useState(false);
  const [selectPageThree, setSelectPageThree] = useState(false);
  const [selectPageFour, setSelectPageFour] = useState(false);
  const [selectPageFive, setSelectPageFive] = useState(false);

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
  }

  return (
      <div className={styles.historyContainer}>
        <div className={styles.historyNameContainer}>
          <span>주문 내역</span>
        </div>
        <div className={styles.line}></div>
        <div className={styles.historyContentContainer}>
          {
            payments.map((content, index) => (
                <div className={styles.historyContent} key={index}>
                  <span className={styles.historyContentName}>content.product_name</span>
                  <span>{content.product_quantity} 개</span>
                  <span>{content.amount} 원</span>
                  <span>{content.paymentMethod}</span>
                  <span className={styles.historyContentTime}>{content.createAt.replace('T', ' ')}</span>
                </div>
            ))
          }
        </div>
        <div className={styles.pageContainer}>
          <span className={classNames({[styles.pageSelect]: selectPageOne})}
                onClick={handlePageClick}>1</span>
          <span className={classNames({[styles.pageSelect]: selectPageTwo})}
                onClick={handlePageClick}>2</span>
          <span className={classNames({[styles.pageSelect]: selectPageThree})}
                onClick={handlePageClick}>3</span>
          <span className={classNames({[styles.pageSelect]: selectPageFour})}
                onClick={handlePageClick}>4</span>
          <span className={classNames({[styles.pageSelect]: selectPageFive})}
                onClick={handlePageClick}>5</span>
        </div>
        >
      </div>
  );
}

export default PaymentHistory;