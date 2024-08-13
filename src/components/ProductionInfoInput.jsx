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

  const HandleSettingComplete = async () => {
    if (isNaN(price) || isNaN(quantity)) {
      alert('상품 가격과 재고 수량은 숫자여야 합니다.');
      return;
    }

    try {
      const response = await axiosInstance.post('/product', {
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
      console.log("err");
      if (error.response.data.message) {
        alert(`${error.response.data.message}`);
      }
    }
  };

  return (
    <div className={styles.productionInfo}>
      <h2>방송 상품 정보 입력</h2>
      <div className={styles.inputGroup}>
        <div className={styles.inputRow}>
          <label>* 상품 이름</label>
          <input
            type="text"
            placeholder="상품 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputRow}>
          <label>* 상품 가격</label>
          <input
            type="text"
            placeholder="상품 가격"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className={styles.inputRow}>
          <label>* 재고 수량</label>
          <input
            type="text"
            placeholder="재고 수량"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className={styles.textAreaRow}>
          <label>* 광고 문구</label>
          <textarea
            placeholder="광고 문구"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
          />
        </div>
      </div>
      <button className={styles.submitButton} onClick={HandleSettingComplete}>
        설정 완료
      </button>
    </div>
  );

};

export default ProductionInfoInput;
