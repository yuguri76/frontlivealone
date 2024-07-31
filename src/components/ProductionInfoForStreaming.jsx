import React, {useEffect, useState} from 'react';
import axiosInstance from '../axiosInstance';

const ProductionInfoForStreaming = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [introduction, setIntroduction] = useState('');

    useEffect(()=>{
        const getProductionInfo = async () => {
            try {
                const response = await axiosInstance.get('/broadcast');

                setName(response.data.data.product_name);
                setPrice(response.data.data.product_price);
                setIntroduction(response.data.data.product_introduction);

            } catch (error) {
                console.error('Error fetching productInfo:', error);
            }
        };

        getProductionInfo();
    }, []);

    return (
        <div>
            <span>상품명: {name}</span>
            <br />
            <span>가격: {price}</span>
            <br />
            <span>상품소개: {introduction}</span>
        </div>
    );
}

export default ProductionInfoForStreaming;