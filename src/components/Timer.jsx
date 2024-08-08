// Timer.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Timer 컴포넌트 정의
const Timer = ({ initialTime, onExpire }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        // 타이머 설정
        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => {
                // 시간이 1초 줄어들며 0초가 되면 종료
                if (prevTime <= 1) {
                    clearInterval(timerId); // 타이머 종료
                    onExpire(); // 부모로부터 전달된 만료 처리 함수 호출
                    return 0;
                }
                return prevTime - 1; // 타이머 1초 감소
            });
        }, 1000); // 1초마다 실행

        // 컴포넌트 언마운트 시 타이머 정리
        return () => clearInterval(timerId);
    }, [onExpire]); // onExpire 함수 변경 시에도 useEffect 재실행

    // 남은 시간을 분:초 형식으로 변환
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // 초가 한자리 수일 경우 0 추가
    };

    return (
        <div className="timer">
            <p>결제까지 남은 시간: {formatTime(timeLeft)}</p> {/* 남은 시간 표시 */}
        </div>
    );
};

// PropTypes를 사용하여 props 타입 검증
Timer.propTypes = {
    initialTime: PropTypes.number.isRequired, // 초기 시간 (초 단위)
    onExpire: PropTypes.func.isRequired, // 타이머 만료 시 호출할 함수
};

export default Timer;
