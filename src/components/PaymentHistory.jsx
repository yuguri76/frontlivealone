import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styles from '../styles/History.module.css';
import axiosInstance from '../axiosInstance';
import classNames from "classnames";

const PaymentHistory = () => {
    const { userId } = useParams();
    const [payments, setPayments] = useState([]); // 결제 내역 데이터를 저장할 상태
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호를 저장할 상태
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수를 저장할 상태
    const itemsPerPage = 5; // 페이지당 항목 수를 5로 설정

    useEffect(() => {
        // 서버로부터 결제 내역을 가져오는 함수
        const fetchPayments = async (page) => {
            try {
                const response = await axiosInstance.get(`/payment/user/${userId}/completed`, {
                    headers: {
                        Authorization: localStorage.getItem('accessToken')
                    },
                    params: {
                        page: page,
                        size: itemsPerPage // 백엔드와 맞춘 항목 수 설정
                    }
                });
                setPayments(response.data.data.contents); // 결제 데이터를 업데이트
                setCurrentPage(page); // 현재 페이지를 업데이트
                setTotalPages(response.data.data.total_pages); // 총 페이지 수를 업데이트
            } catch (error) {
                console.error("결제 내역을 가져오지 못했습니다.", error); // 오류 처리
            }
        };

        fetchPayments(currentPage); // 초기 데이터 가져오기
    }, [currentPage, userId]); // currentPage나 userId가 변경될 때마다 실행

    // 페이지 번호 클릭 시 페이지를 변경하는 함수
    const handleClick = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className={styles.historyContainer}>
            <div className={styles.historyNameContainer}>
                <span>주문 내역</span>
            </div>
            <div className={styles.line}></div>
            <div className={styles.historyContentContainer}>
                {
                    payments.map((content, index) => {
                        const {created_at, product_name, quantity, amount, payment_method} = content;
                        const [createdDate, rawCreatedTime] = created_at.split('T'); // 날짜와 시간을 분리
                        const [createdTime, _] = rawCreatedTime.split('.'); // 시간에서 밀리초 제거
                        return (
                            <div className={styles.historyContent} key={index}>
                                <span className={styles.historyContentName}>{product_name}</span>
                                <span>{quantity} 개</span>
                                <span>{amount} 원</span>
                                <span>{payment_method}</span>
                                <span className={styles.historyContentTime}>{createdDate}</span>
                                <span className={styles.historyContentTime}>{createdTime}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.pageContainer}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <span key={index}
                          className={classNames({ [styles.pageSelect]: currentPage === index })} // 현재 페이지에 해당하는 번호에 스타일 적용
                          onClick={() => handleClick(index)}>
                        {index + 1} {/* 페이지 번호 표시 */}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default PaymentHistory;
