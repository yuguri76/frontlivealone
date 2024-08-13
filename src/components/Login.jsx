import React from 'react';
import kakaoLogo from '../assets/images/kakao_login.png';
import googleLogo from '../assets/images/google_login.png';
import loginLogo from '../assets/images/login_logo.png';
import '../styles/Login.css';


const Login = () => {

    const handleKakaoLogin = () => {
        window.location.href = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_SERVER_ADDRESS}/oauth2/authorization/kakao`;
    };

    const handleNaverLogin = () => {
        window.location.href = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_SERVER_ADDRESS}/oauth2/authorization/naver`;
    };

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_SERVER_ADDRESS}/oauth2/authorization/google`;
    };

    return (
        <div className="login-container">
            <div className="login-content">
            <div style={{textAlign: 'center', marginTop: '50px'}}>
                <div>
                    <img src={loginLogo} alt="Kakao Login"
                         style={{width: '300px', margin: '10px'}}/>
                </div>
                <div className="login-buttons">
                    <button onClick={handleKakaoLogin}
                            style={{border: 'none', background: 'none'}}>
                        <img src={kakaoLogo} alt="Kakao Login" className="rounded-logo"
                             style={{width: '200px', margin: '10px'}}/>
                    </button>
                    <button onClick={handleGoogleLogin}
                            style={{border: 'none', background: 'none'}}>
                        <img src={googleLogo} alt="Google Login"
                             style={{width: '200px', margin: '10px'}}/>
                    </button>
                </div>
            </div>
            </div>
        </div>
    );

};

export default Login;