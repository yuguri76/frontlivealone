// HLSPlayer.jsx
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'; // video.js 스타일 가져오기

const HLSPlayer = ({ src, width = 720 }) => {
    // 비디오 요소에 대한 참조 생성
    const videoRef = useRef(null); // 비디오 DOM 요소를 참조하는 videoRef
    // 플레이어 인스턴스를 위한 참조 생성
    const playerRef = useRef(null); // video.js 플레이어 인스턴스를 참조하는 playerRef

    useEffect(() => {

        // 비디오 요소가 DOM에 추가된 후에 비디오.js 플레이어를 초기화
        if(videoRef.current && !playerRef.current){
            // 비디오 플레이어 초기화
            playerRef.current = videojs(videoRef.current, {
                controls: true, // 컨트롤 표시
                preload: 'auto', // 자동으로 비디오 로드
                width: width, // 비디오 너비 설정
                height: (width / 16) * 9, //16:9 비율 설정
                sources: [{
                    src: src, // HLS 스트림 URL
                    type: 'application/x-mpegURL' // 스트림 타입
                }]
            });
        } else if (playerRef.current) {
            // 비디오 플레이어가 이미 초기화 된 경우 src 업데이트
            playerRef.current.src({
                src: src,
                type: 'application/x-mpegURL',
            });
        }

        //메모리 누수 때문에 필요하다고 했는데 이게 있으면 플레이어가 아예 안 뜨는 문제로 인해 주석
        //작업일자 : 2024-07-30까지
        // 컴포넌트 언마운트 시 , src 변경 시 플레이어 해제
        // return () => {
        //     if (playerRef.current) {
        //         playerRef.current.dispose(); // 비디오.js 플레이어 해제
        //         playerRef.current = null; // 플레이어 참조 초기화
        //     }
        // };
    }, [src, width]); // src와 width가 변경될 때만 효과 실행

    return (
        <div>
            <h1></h1>
            <video
                ref={videoRef} // 비디오 요소에 대한 참조 연결
                className="video-js vjs-default-skin"
                playsInline
            />
        </div>
    );
};

export default HLSPlayer;
