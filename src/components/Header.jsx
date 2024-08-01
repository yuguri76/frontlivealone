import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import logo from '../assets/logo.png'
import styles from '../styles/Header.module.css';

function Header() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nickName = useSelector((state) => { return state.user.nickName })

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('accessToken') !== null;
    setIsLoggedIn(loggedInStatus);
  }, [localStorage.getItem('accessToken')]);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleMyInfoClick = () => {
    navigate('/myinfo');
  };

  const handleLogoutClick = async () => {
    try {
      const response = await axiosInstance.patch(`/auth/logout`, {}, {
        headers: {
          Authorization: localStorage.getItem('accessToken')
        }
      });

    } catch (error) {
      if (error.response.data.message) {
        alert(`${error.response.data.message}`);
      }
    }

    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <header>
      <div className={styles.header}>
        <img src={logo} alt="나혼자산다 로고" className={styles.logo} onClick={handleLogoClick} />
        {isLoggedIn ? (
          <>
            <div className={styles.welcomeMessage}>{nickName}님 환영합니다!</div>
            <div className={styles.buttons}>
              <button className={styles.button} onClick={handleMyInfoClick}>마이페이지</button>
              <button className={styles.button} onClick={handleLogoutClick}>로그아웃</button>
            </div>
          </>
        ) : (
          <button className={styles.button} onClick={handleLoginClick}>로그인</button>
        )}
      </div>
    </header>
  );
}

export default Header;
