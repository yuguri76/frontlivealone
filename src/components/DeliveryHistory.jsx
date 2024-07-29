import React, {useEffect, useState} from 'react';
import styles from '../styles/History.module.css';
import axiosInstance from '../axiosInstance';
import classNames from "classnames";

const DeliveryHistory = () => {

  const [deliverys, setDeliverys] = useState([]);

  const [selectPageOne, setSelectPageOne] = useState(true);
  const [selectPageTwo, setSelectPageTwo] = useState(false);
  const [selectPageThree, setSelectPageThree] = useState(false);
  const [selectPageFour, setSelectPageFour] = useState(false);
  const [selectPageFive, setSelectPageFive] = useState(false);

  useEffect(() => {
    const getDeliverys = async () => {
      try {
        const response = await axiosInstance.get('/user/delivery');
        console.log(response.data);
        setDeliverys(response.data.data);
      } catch (error) {
        console.error('Error fetching deliverys:', error);
      }
    };

    getDeliverys();
  }, []);

  const handlePageClick = async (event) => {
    let page = parseInt(event.target.textContent);

    setSelectPageOne(false);
    setSelectPageTwo(false);
    setSelectPageThree(false);
    setSelectPageFour(false);
    setSelectPageFive(false);

    switch (page) {
      case 1: setSelectPageOne(true); break;
      case 2: setSelectPageTwo(true); break;
      case 3: setSelectPageThree(true); break;
      case 4: setSelectPageFour(true); break;
      case 5: setSelectPageFive(true); break;
    }

    try {
      const response = await axiosInstance.get(`/user/delivery?page=${page}`);
      console.log(response.data);
      setDeliverys(response.data.data);
    } catch(error) {
      console.error('Error fetching deliverys:', error);
    }
  }


  return (
      <div className={styles.historyContainer}>
        <div className={styles.historyNameContainer}>
          <span>배송 정보</span>
        </div>
        <div className={styles.line}></div>
        <div className={styles.historyContentContainer}>
          {
            deliverys.map((content, index) => (
                <div className={styles.historyContent} key={index}>
                  <span className={styles.historyDeliveryState}>{content.order_status}</span>
                  <span>{content.product_name}</span>
                  <span>{content.address}</span>
                </div>
            ))
          }
        </div>
        <div className={styles.pageContainer}>
          <span className={classNames({[styles.pageSelect]: selectPageOne})}
                onClick={handlePageClick}>1</span>
          <span className={classNames({[styles.pageSelect]: selectPageTwo})}
                onClick={handlePageClick}>2</span>
          <span className={classNames({[styles.pageSelect]: selectPageThree})}
                onClick={handlePageClick}>3</span>
          <span className={classNames({[styles.pageSelect]: selectPageFour})}
                onClick={handlePageClick}>4</span>
          <span className={classNames({[styles.pageSelect]: selectPageFive})}
                onClick={handlePageClick}>5</span>
        </div>
        >
      </div>
  );
}

export default DeliveryHistory;