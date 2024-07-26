import axios from 'axios';

const setupInterceptors = (navigate) => {
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('accessToken');
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );
};

export default setupInterceptors;
