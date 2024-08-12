import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/ImageSlider.module.css';

const ImageSlider = () => {
    const settings = {
        dots: false,  // 슬라이더 하단의 도트(네비게이션 점)를 비활성화
        infinite: true,  // 슬라이드가 끝없이 반복되도록 설정
        speed: 10000,  // 슬라이드 전환 속도 설정
        slidesToShow: 1,  // 한 번에 보여줄 슬라이드의 개수
        slidesToScroll: 1,  // 한 번에 스크롤할 슬라이드의 개수
        autoplay: true,  // 자동 재생 활성화
        autoplaySpeed: 0,  // 자동 재생 속도 설정 (0으로 설정해 무한으로 재생)
        cssEase: "linear",  // 슬라이드 전환의 애니메이션을 선형으로 설정
        centerMode: true,  // 이미지를 중앙에 배치
        variableWidth: true,  // 슬라이더가 컨테이너를 넘어가도 잘리지 않도록 설정
        pauseOnHover: false,  // 슬라이드에 마우스를 올려도 멈추지 않도록 설정
        swipe: false,  // 사용자가 슬라이드를 손으로 넘길 수 없도록 설정 (원하는 경우)
    };
    return (
        <div className={styles.sliderContainer}>
            <Slider {...settings}>
                <div>
                    <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/168829700542391830.jpeg?gif=1&w=480&h=480&c=c&q=80&webp=1" alt="Slide 1" className={styles.slideImage} />
                </div>
                <div>
                    <img src="https://contents-cdn.viewus.co.kr/image/2024/01/CP-2023-0010/image-0045ed13-954b-4165-ac5f-de437db50ed1.jpeg" alt="Slide 2" className={styles.slideImage} />
                </div>
                <div>
                    <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/168075514144615527.jpeg?gif=1&w=480&h=480&c=c&q=80&webp=1" alt="Slide 3" className={styles.slideImage} />
                </div>
                <div>
                    <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/167405262037193441.jpeg?w=960&h=960&c=c" alt="Slide 4" className={styles.slideImage} />
                </div>
            </Slider>
        </div>
    );
};

export default ImageSlider;
