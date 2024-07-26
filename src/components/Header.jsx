import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import styles from '../styles/Header.module.css';

function Header() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 연동한 뒤 현재 로그인 상태인지 알아내는 로직 추가합니다.
    // setIsLoggedIn(loggedInStatus);
  }, []);

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
      // 로그아웃 api 연동 예정

      // localStorage.setItem('accessToken', null);
      setIsLoggedIn(false);

    } catch (error) {
      alert(`${error.response.data.msg}`);
    }
  };

  return (
    <header>
      <div className={styles.header}>
        <img src={logo} alt="나혼자산다 로고" className={styles.logo} onClick={handleLogoClick} />
        {isLoggedIn ? (
          <>
            <div className={styles.welcomeMessage}>○○○님 환영합니다!</div>
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
