import React from 'react';
import styles from '../styles/BroadcastHistory.module.css';

const BroadcastHistory = () => {
  return (
      <div className={styles.historyContainer}>
        <div className={styles.historyNameContainer}>
          <span>방송 내역</span>
        </div>
        <div className={styles.line}></div>
        <div className={styles.historyContentContainer}>
          <div className={styles.historyContent}>
            <span className={styles.historyContentState}>Close</span>
            <span className={styles.historyContentTitle}>맛있는 선산곱창90% 할인</span>
            <span>상품명: 선산곱창</span>
            <span className={styles.historyContentTime}>2024/06/23 18:00</span>
          </div>
          <div className={styles.historyContent}>
            <span className={styles.historyContentState}>Close</span>
            <span className={styles.historyContentTitle}>맛있는 선산곱창90% 할인</span>
            <span>상품명: 선산곱창</span>
            <span className={styles.historyContentTime}>2024/06/23 18:00</span>
          </div>
          <div className={styles.historyContent}>
            <span className={styles.historyContentState}>Close</span>
            <span className={styles.historyContentTitle}>맛있는 선산곱창90% 할인</span>
            <span>상품명: 선산곱창</span>
            <span className={styles.historyContentTime}>2024/06/23 18:00</span>
          </div>
          <div className={styles.historyContent}>
            <span className={styles.historyContentState}>Close</span>
            <span className={styles.historyContentTitle}>맛있는 선산곱창90% 할인</span>
            <span>상품명: 선산곱창</span>
            <span className={styles.historyContentTime}>2024/06/23 18:00</span>
          </div>
          <div className={styles.historyContent}>
            <span className={styles.historyContentState}>Close</span>
            <span className={styles.historyContentTitle}>맛있는 선산곱창90% 할인</span>
            <span>상품명: 선산곱창</span>
            <span className={styles.historyContentTime}>2024/06/23 18:00</span>
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

export default BroadcastHistory;