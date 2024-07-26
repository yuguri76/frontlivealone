import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('accessToken', token);
      navigate('/');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuth2RedirectHandler;
