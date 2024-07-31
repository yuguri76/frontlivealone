import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import styles from '../styles/ProductionInfoInput.module.css';

const ProductionInfoInput = ({ onSettingComplete }) => {
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [price, setPrice] = useState(localStorage.getItem('price') || '');
  const [quantity, setQuantity] = useState(localStorage.getItem('quantity') || '');
  const [introduction, setIntroduction] = useState(localStorage.getItem('introduction') || '');

  useEffect(() => {
    localStorage.setItem('name', name);
    localStorage.setItem('price', price);
    localStorage.setItem('quantity', quantity);
    localStorage.setItem('introduction', introduction);
  }, [name, price, quantity, introduction]);

  const handleSettingComplete = async () => {
    if (isNaN(price) || isNaN(quantity)) {
      alert('상품 가격과 재고 수량은 숫자여야 합니다.');
      return;
    }

    try {
      const response = await axiosInstance.post(`/product`, {
        "name": name,
        "price": price,
        "quantity": quantity,
        "introduction": introduction
      }, {
        headers: {
          Authorization: localStorage.getItem('accessToken')
        }
      });

      onSettingComplete(response.data.data);
    } catch (error) {
      if (error.response.data.message) {
        alert(`${error.response.data.message}`);
      }
    }
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
