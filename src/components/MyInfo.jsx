import React from 'react';
import styles from '../styles/MyInfo.module.css';

const MyInfo = () => {
  return (
    <div className={styles.myinfoContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.nameBox}>
          <h1>홍길동</h1>
          <button>Edit</button>
        </div>
        <div className={styles.infoBox}>
          <h3>이름</h3>
          <input type="text" />
        </div>
        <div className={styles.infoBox}>
          <h3>생년월일</h3>
          <input type="date" />
        </div>
        <div className={styles.infoBox}>
          <h3>주소<br />(기본 배송지)</h3>
          <input type="text" />
        </div>
        <button className={styles.infoBtn}>확인</button>
      </div>
      <div className={styles.line}></div>
      <div className={styles.actContainer}>
        <div className={styles.actBox}>
          <div className={styles.actName}>
            <span>방송 내역</span>
            <button>더보기</button>
          </div>
          <div className={styles.actContentContainer}>
            <div className={styles.actContent}>
              <span className={styles.actContentState}>Close</span>
              <span className={styles.actContentTitle}>맛있는 선산곱창90% 할인</span>
              <span>상품명: 선산곱창</span>
              <span className={styles.actContentTime}>2024/06/23 18:00</span>
            </div>
            <div className={styles.actContent}>
              <span className={styles.actContentState}>Close</span>
              <span className={styles.actContentTitle}>맛있는 선산곱창90% 할인</span>
              <span>상품명: 선산곱창</span>
              <span className={styles.actContentTime}>2024/06/23 18:00</span>
            </div>
          </div>
        </div>
        <div className={styles.actBox}>
          <div className={styles.actName}>
            <span>주문 내역</span>
            <button>더보기</button>
          </div>
          <div className={styles.actContentContainer}>
            <div className={styles.orderContent}>
              <span className={styles.orderContentName}>선산 곱창</span>
              <span>6 개</span>
              <span>60000 원</span>
              <span>카카오페이</span>
              <span className={styles.orderContentTime}>2024/06/23</span>
            </div>
          </div>
        </div>
        <div className={styles.actBox}>
          <div className={styles.actName}>
            <span>배송 정보</span>
            <button>더보기</button>
          </div>
          <div className={styles.deliveryContentContainer}>
            <div className={styles.deliveryContent}>
              <span className={styles.deliveryState}>배송전</span>
              <span>선산곱창</span>
              <span>인천광역시 서구 심곡로 123 모모아파트 101동 1234호</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;