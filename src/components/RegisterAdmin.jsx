import { useState } from 'react';
import axiosInstance from "../axiosInstance";
import { useNavigate } from 'react-router-dom';
import styles from '../styles/RegisterAdmin.module.css';

const RegisterAdmin = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');

  const hadleSubmitClick = async () => {
    try {
      await axiosInstance.put('/admin', {
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken')
        }
      });

      alert("관리자로 등록되었습니다.");
      const user = JSON.parse(localStorage.getItem('user'));
      navigate(`/user/${user.id}`);

    } catch(error) {
      alert("암호가 일치하지 않습니다.");
    }
  }

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  return (
      <div className={styles.adminRegisterContainer}>
            <span>관리자 암호: </span>
            <input value={password} type="text" onChange={handleInputChange}/>
            <button onClick={hadleSubmitClick}>확인</button>
      </div>
  );
};

export default RegisterAdmin;