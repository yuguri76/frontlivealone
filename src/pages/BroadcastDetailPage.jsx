import React, {useEffect} from 'react';
import BroadcastDetail from "../components/BroadcastDetail";
import axiosInstance from "../axiosInstance";
import {useNavigate} from "react-router-dom";

function BroadcastDetailPage() {
  const navigate = useNavigate();

  useEffect(() => {
    getRole();
  }, []);

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

  return (
      <div className="broadcast-detail-page">
        <BroadcastDetail />
      </div>
  );
}

export default BroadcastDetailPage;