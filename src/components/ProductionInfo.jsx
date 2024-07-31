import React from 'react';
import styles from '../styles/ProductionInfo.module.css';

const ProductionInfo = ({ product }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>상품 정보</h2>
            <div className={styles.content}>
                <p>상품 이름: {product.name}</p>
                <p>상품 가격: {product.price}</p>
                <p>재고 수량: {product.quantity}</p>
                <p>광고 문구: {product.introduction}</p>
            </div>
        </div>
    );
};

export default ProductionInfo;
