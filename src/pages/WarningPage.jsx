import React from 'react';
import styles from '../styles/WarningPage.module.css'
import warning from '../assets/images/warning.png'

function WarningPage() {
    return (
        <div className={styles.container}>
            <img src={warning} alt="warning icon" className={styles.logo} />
            <p className={styles.message}>페이지가 존재하지 않습니다.</p>
        </div>
    );
}

export default WarningPage;