import React from 'react';
import styles from '../styles/ProductionInfoInput.module.css';

const ProductionInfoInput = ({onSettingComplete}) => {
  const handleSettingComplete = () => {
    // 서버 연결 전이라 더미 입니다. 이후 변경
    const productId = 1;
    onSettingComplete(productId);
  };

  return (
    <div className={styles.productionInfo}>
      <div>방송 상품 정보 입력</div>
      <div className={styles.inputGroup}>
        <input type="text" placeholder="상품 이름" />
        <input type="text" placeholder="상품 가격" />
        <input type="text" placeholder="재고 수량" />
        <input type="text" placeholder="광고 문구" />
      </div>
      <button className={styles.submitButton} onClick={handleSettingComplete}>설정 완료</button>
    </div>
  );
};

export default ProductionInfoInput;
