import React, {useEffect, useState} from 'react';
import axiosInstance from '../axiosInstance';

const ProductionInfoForStreaming = ({ onProductInfo }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [introduction, setIntroduction] = useState('');

    useEffect(() => {
        const getProductionInfo = async () => {
            try {
                const response = await axiosInstance.get('/broadcast');
                const productData = response.data.data;

                setName(productData.product_name);
                setPrice(productData.product_price);
                setIntroduction(productData.product_introduction);

                onProductInfo(productData); // 부모 컴포넌트로 데이터 전달
            } catch (error) {
                console.error('Error fetching productInfo:', error);
            }
        };

        getProductionInfo();
    }, [onProductInfo]);

    return (
        <div>
            <span>상품명: {name}</span>
            <br />
            <span>가격: {price}</span>
            <br />
            <span>상품소개: {introduction}</span>
        </div>
    );
};

export default ProductionInfoForStreaming;