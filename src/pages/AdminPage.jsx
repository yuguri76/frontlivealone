import React, {useEffect, useState} from 'react';
import axiosInstance from "../axiosInstance";
import styles from '../styles/AdminPage.module.css';
import {useNavigate} from "react-router-dom";

function AdminPage() {
      const navigate = useNavigate();
      const [broadcasts, setBroadcasts] = useState([]);
      const [totalPage, setTotalPage] = useState(1);

      useEffect(() => {
            const getRole = async () => {
                  try {
                        const response = await axiosInstance.get('/admin', {
                              headers: {
                                    Authorization: localStorage.getItem('accessToken')
                              }
                        });
                        if (response.data.data.role !== 'ADMIN') {
                              navigate('/myinfo');
                              alert('해당페이지에 관한 권한이 없습니다.');
                        }
                  } catch (error) {
                        console.error('Get role error!!!!!!', error);
                  }
            };

            getRole();
      }, []);

      const handleBroadcastClick = async () => {
        try {
          const response = await axiosInstance.get('/admin/broadcasts', {
            headers: {
              Authorization: localStorage.getItem('accessToken')
            }
          });

          console.log(response.data.data);
          console.log(response.data.data.content);
          setTotalPage(response.data.data.total_pages);
          setBroadcasts(response.data.data.content);
        } catch (error) {
          console.error('Get role error!!!!!!', error);
        }
      };

  return (
      <div className={styles.adminContainer}>
            <div className={styles.adminButtonContainer}>
                  <button onClick={handleBroadcastClick}>방송 조회</button>
                  <button>유저 조회</button>
            </div>
            <div>
              {broadcasts.map((broadcast, index) => (
                  <div key={index} className={styles.broadcastContainer}>
                    <span>{index + 1}.</span>
                    <span>{broadcast.title}</span>
                    <span>{broadcast.streamer}</span>
                    <span>{broadcast.date}</span>
                  </div>
              ))}
            </div>
        <div>
        </div>
      </div>
  );
}

export default AdminPage;