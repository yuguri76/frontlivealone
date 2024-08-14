import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerIcons}>
                    <a href="https://github.com/UDM2C">
                        <img
                            src="https://velog.velcdn.com/images/ysy9976/post/41447dd9-9ff0-4db9-92c8-7d9f0149f5f6/image.png"
                            alt="GitHub"
                            className={styles.footerIconImage} />
                    </a>
                    <a href="https://teamsparta.notion.site/UDM2C-c2d348d3bf2f47be82bde005cb28c4f2">
                        <img
                            src="https://velog.velcdn.com/images/ysy9976/post/0dc694a1-b66e-4612-9d2f-ba9ca238e408/image.png"
                            alt="Notion"
                            className={styles.footerIconImage} />
                    </a>
                </div>
                <div className={styles.footerLinks}>
                    <a href="/">HOME</a>
                    <a href="/streaming">BROADCAST</a>
                    <a href="WarningPage">가이드(브로셔)</a>
                    <a href="WarningPage">고객의 소리(제출폼링크)</a>
                    <a href="https://nbcamp2024.slack.com/team/U06K01GG031">고객센터</a>
                </div>
                <div className={styles.footerInfoCustom}>
                    <h3>상호: LiveAlone | 대표팀: UDM2C | 사업자등록번호: SPARTA-A1-UDM2C</h3>
                    <h3>만든사람들 : 유규리 노석준 김채민 김혜은 권수연 | 리더 이메일: ysy9976@naver.com</h3>
                    <h3>주소: Spring Boot Java 5기 - Team UDM2C</h3>
                </div>
                <div className={styles.footerLegal}>
                    <a>이용약관</a> | <a>개인정보처리방침</a>
                </div>
                <h3 className={styles.footerCopy}>© 2024, UDM2C. All rights reserved.</h3>
            </div>
        </footer>
    );
};

export default Footer;
