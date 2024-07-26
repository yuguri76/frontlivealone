import React from 'react';
import styles from '../styles/ProductionInfo.module.css';

const ProductionInfo = ({ name, price, quantity, introduction }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>상품 정보</h2>
            <div className={styles.content}>
                <p>상품 이름: {name}</p>
                <p>상품 가격: {price}</p>
                <p>재고 수량: {quantity}</p>
                <p>광고 문구: {introduction}</p>
            </div>
        </div>
    );
};

export default ProductionInfo;
