import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/GuidePage.module.css';
import streamlab1 from '../assets/images/streamlab1.png';
import streamlab2 from '../assets/images/streamlab2.png';
import streamlab3 from '../assets/images/streamlab3.png';
import streamlab4 from '../assets/images/streamlab4.png';
import streamlab5 from '../assets/images/streamlab5.png';
import streamlab6 from '../assets/images/streamlab6.png';
import streamlab7 from '../assets/images/streamlab7.png';
import streamlab8 from '../assets/images/streamlab8.png';
import streamlab9 from '../assets/images/streamlab9.png';
import streamlab10 from '../assets/images/streamlab10.png';

function GuidePage() {
    const navigate = useNavigate();

    const handleStartStreamingClick = () => {
        navigate('/streamer');
    };

    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.title}>스트리밍을 위한 스트림랩 설치 및 세팅 가이드</h1>

                <div className={styles.step}>
                    <h2>1. 스트림랩 설치</h2>
                    <p><a href="https://streamlabs.com/ko-kr" target="_blank" rel="noopener noreferrer">https://streamlabs.com/ko-kr</a></p>
                    <p>로그인 필요없이 바로 다운로드 및 실행</p>
                    <img src={streamlab1} alt="Step 1" className={styles.image} />
                </div>

                <div className={styles.step}>
                    <h2>2. 스트림랩 초기 세팅</h2>
                    <img src={streamlab2} alt="Step 2" className={styles.image} />
                    <p>이후 '계속' 클릭</p>
                    <img src={streamlab3} alt="Step 3" className={styles.image} />
                    <img src={streamlab4} alt="Step 3" className={styles.image} />
                    <p>캠, 마이크 설정 다 한 뒤 계속 선택, 다음 페이지 건너뛰기 한 후 starter 선택</p>
                    <img src={streamlab5} alt="Step 4" className={styles.image} />
                    <p>'시작하세요' 선택</p>
                </div>

                <div className={styles.step}>
                    <h2>3. 스트림랩 방송 세팅</h2>
                    <img src={streamlab6} alt="Step 4" className={styles.image} />
                    <img src={streamlab7} alt="Step 4" className={styles.image} />
                    <p>URL에 rtmp://mabinogi.store:1935/live 붙여넣기</p>
                    <p>스트림 키에 예약페이지에서 예약을 완료하고 </p>
                    <p>이메일(카카오 아이디(이메일) 혹은 구글 이메일) 로 받은 스트림 키 붙여넣기 후 오른쪽 하단의 ‘완료’ 클릭</p>
                    <img src={streamlab8} alt="Step 4" className={styles.image} />
                    <img src={streamlab9} alt="Step 4" className={styles.image} />
                    <p>미디어 파일을 띄우고 싶다면 미디어 파일 선택, 캠을 띄우고 싶다면 웹캠 장치 선택 후 소스 추가</p>
                    <img src={streamlab10} alt="Step 4" className={styles.image} />
                    <p>설정 완료 후 스트리밍 화면 조절 가능 (클릭 후 위치 이동, 여러 소스를 동시에 띄울 수도 있음)</p>
                    <p>모든 설정이 끝난 후 '라이브하기' 클릭</p>
                    <p>조금 기다리면 새로고침하면 사이트에서 송출되는 화면을 볼 수 있습니다!</p>
                </div>

                <button className={styles.startButton} onClick={handleStartStreamingClick}>
                    스트리밍 시작해보기
                </button>
            </div>
        </div>
    );
}

export default GuidePage;
