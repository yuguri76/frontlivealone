import React, { useState } from 'react';
import styles from '../styles/ProductionInfoInput.module.css';

const ProductionInfoInput = ({ onSettingComplete }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [introduction, setIntroduction] = useState('');

  const handleSettingComplete = () => {
    // 서버 연결 전이라 더미 입니다. 이후 변경
    const productId = 1;

    const productInfo = { name, price, quantity, introduction };
    onSettingComplete(productId, productInfo);
  };

  return (
    <div className={styles.productionInfo}>
      <div>방송 상품 정보 입력</div>
      <div className={styles.inputGroup}>
        <input type="text" placeholder="상품 이름" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="상품 가격" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" placeholder="재고 수량" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input type="text" placeholder="광고 문구" value={introduction} onChange={(e) => setIntroduction(e.target.value)} />
      </div>
      <button className={styles.submitButton} onClick={handleSettingComplete}>설정 완료</button>
    </div>
  );
};

export default ProductionInfoInput;
