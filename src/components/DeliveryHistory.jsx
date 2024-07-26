import React from 'react';
import styles from '../styles/History.module.css';

const DeliveryHistory = () => {
  return (
      <div className={styles.historyContainer}>
        <div className={styles.historyNameContainer}>
          <span>배송 정보</span>
        </div>
        <div className={styles.line}></div>
        <div className={styles.historyContentContainer}>
          <div className={styles.historyContent}>
            <span className={styles.historyDeliveryState}>배송전</span>
            <span>선산곱창</span>
            <span>인천광역시 서구 심곡로 123 모모아파트 101동 1234호</span>
          </div>
          <div className={styles.historyContent}>
            <span className={styles.historyDeliveryState}>배송전</span>
            <span>선산곱창</span>
            <span>인천광역시 서구 심곡로 123 모모아파트 101동 1234호</span>
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

export default DeliveryHistory;