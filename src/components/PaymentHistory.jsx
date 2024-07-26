import React from 'react';
import styles from '../styles/History.module.css';

const PaymentHistory = () => {
  return (
      <div className={styles.historyContainer}>
        <div className={styles.historyNameContainer}>
          <span>주문 내역</span>
        </div>
        <div className={styles.line}></div>
        <div className={styles.historyContentContainer}>
          <div className={styles.historyContent}>
            <span className={styles.historyContentName}>선산 곱창</span>
            <span>6 개</span>
            <span>60000 원</span>
            <span>카카오페이</span>
            <span className={styles.historyContentTime}>2024/06/23</span>
          </div>
          <div className={styles.historyContent}>
            <span className={styles.historyContentName}>선산 곱창</span>
            <span>6 개</span>
            <span>60000 원</span>
            <span>카카오페이</span>
            <span className={styles.historyContentTime}>2024/06/23</span>
          </div>
        </div>
        <div className={styles.pageContainer}>
          <span className={styles.pageSelect}>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
  );
}

export default PaymentHistory;