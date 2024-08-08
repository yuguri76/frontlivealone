import React, {useEffect, useState} from 'react';
import axiosInstance from "../axiosInstance";
import styles from '../styles/AdminPage.module.css';
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

function AdminPage() {
      const navigate = useNavigate();

      const [totalPage, setTotalPage] = useState(0);
      const [broadcasts, setBroadcasts] = useState([]);
      const [hideBroadcasts, setHideBroadcasts] = useState(true);
      const [users, setUsers] = useState([]);
      const [hideUsers, setHideUsers] = useState(true);
      const [selectBroadcastButton, setSelectBroadcastButton] = useState(false);
      const [selectUserButton, setSelectUserButton] = useState(false);

      useEffect(() => {
            getRole();
      }, []);

      const handleBroadcastButtonClick = async (page) => {
        setHideBroadcasts(false);
        setHideUsers(true);
        setSelectUserButton(false);
        setSelectBroadcastButton(true);

        if (isNaN(page)) {
          page = 1;
        }

        try {
          const response = await axiosInstance.get('/admin/broadcasts', {
            headers: {
              Authorization: localStorage.getItem('accessToken')
            },
            params: {
              "page": page
            }
          });

          setTotalPage(response.data.data.total_pages);
          setBroadcasts(response.data.data.content);
        } catch (error) {
          console.error('Get broadcasts error!!!!!!', error);
        }
      };

  const handleUserButtonClick = async (page) => {
    setHideUsers(false);
    setHideBroadcasts(true);
    setSelectBroadcastButton(false);
    setSelectUserButton(true);

    if (isNaN(page)) {
      page = 1;
    }

    try {
      const response = await axiosInstance.get('/admin/users', {
        headers: {
          Authorization: localStorage.getItem('accessToken')
        },
        params: {
          "page": page
        }
      });

      setTotalPage(response.data.data.total_pages);
      setUsers(response.data.data.content);
    } catch (error) {
      console.error('Get users error!!!!!!', error);
    }
  };

  const handleBroadcastClick = async (event) => {
    navigate(`/admin/broadcast/${event.currentTarget.dataset.id}`);
  };

  const handleUserClick = async (event) => {
    navigate(`/user/${event.currentTarget.dataset.id}`);
  };

  const getRole = async () => {
    try {
      const response = await axiosInstance.get('/admin', {
        headers: {
          Authorization: localStorage.getItem('accessToken')
        }
      });
      if (response.data.data.role !== 'ADMIN') {
        const user = JSON.parse(localStorage.getItem('user'));
        navigate(`/user/${user.id}`);
        alert('해당페이지에 관한 권한이 없습니다.');
      }
    } catch (error) {
      console.error('Get role error!!!!!!', error);
    }
  };

  const handleBroadcastPageClick = async (event) => {
    let page = parseInt(event.target.innerHTML, 10);
    console.log(event.target.innerHTML);
    console.log(page);
    handleBroadcastButtonClick(page);
  };

  const handleUserPageClick = async (event) => {
    let page = parseInt(event.target.innerHTML, 10);
    console.log(event.target.innerHTML);
    console.log(page);
    handleUserButtonClick(page);
  };

  return (
      <div className={styles.adminContainer}>
        <div className={styles.adminMenuContainer}>
          <span>관리자 페이지</span>
        </div>
        <div className={styles.adminButtonContainer}>
          <button onClick={handleBroadcastButtonClick} className={classNames(
              {[styles.select]: selectBroadcastButton})}>방송 조회
          </button>
          <button onClick={handleUserButtonClick}
                  className={classNames({[styles.select]: selectUserButton})}>유저
            조회
          </button>
        </div>

        <div className={styles.adminInfoContainer}>
          <div className={classNames(styles.itemsContainer,
              {[styles.hide]: hideBroadcasts})}>
            {broadcasts.map((broadcast, index) => (
                <div key={index} data-id={broadcast.id}
                     className={styles.itemContainer}
                     onClick={handleBroadcastClick}>
                  <span>{index + 1}.</span>
                  <div className={styles.itemListContent}>
                    <span>{broadcast.title}</span>
                    <span>{broadcast.streamer}</span>
                    <span>{broadcast.date}</span>
                  </div>
                </div>
            ))}
          </div>

          <div className={classNames(styles.itemsContainer,
              {[styles.hide]: hideUsers})}>
            {users.map((user, index) => (
                <div key={index} data-id={user.id}
                     className={styles.itemContainer} onClick={handleUserClick}>
                  <span>{index + 1}.</span>
                  <div className={styles.itemListContent}>
                    <span>{user.name}</span>
                    <span>{user.role}</span>
                  </div>
                </div>
            ))}
          </div>
        </div>

        <div className={classNames(styles.pageContainer, {[styles.hide]: hideBroadcasts})}>
          {Array.from({length: totalPage}, (_, index) => (
              <a key={index} onClick={handleBroadcastPageClick}>
                {index + 1}
              </a>
          ))}
        </div>

        <div className={classNames(styles.pageContainer, {[styles.hide]: hideUsers})}>
          {Array.from({length: totalPage}, (_, index) => (
              <a key={index} onClick={handleUserPageClick}>
                {index + 1}
              </a>
          ))}
        </div>
      </div>
  );
}

export default AdminPage;