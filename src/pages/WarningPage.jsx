import React from 'react';
import styles from '../styles/WarningPage.module.css'
import warning from '../assets/images/warning.png'

function WarningPage() {
    return (
        <div className={styles.container}>
            <img src={warning} alt="warning icon" className={styles.icon} />
            <p className={styles.message}>페이지가 존재하지 않습니다.</p>
            <p className={styles.subMessage}>
                해당 페이지는 경로가 변경되었거나, 서버에 존재하지 않습니다.<br/>
                파일의 경로가 정확한지, URL 주소를 바르게 입력했는지 확인하세요.
            </p>
        </div>
    );
}

export default WarningPage;