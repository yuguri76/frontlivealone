import React, { useState, useEffect } from 'react';

const AddressForm = ({ onSubmit }) => {
    // 상태 관리
    const [postcode, setPostcode] = useState('');
    const [roadAddress, setRoadAddress] = useState('');
    const [jibunAddress, setJibunAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const [guide, setGuide] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    // Daum 우편번호 API 스크립트 로드
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // 우편번호 찾기 실행 함수
    const handlePostcodeSearch = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                let roadAddr = data.roadAddress;
                let extraRoadAddr = '';

                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }

                if (data.buildingName !== '' && data.apartment === 'Y'){
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }

                if (extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }

                setPostcode(data.zonecode);
                setRoadAddress(roadAddr);
                setJibunAddress(data.jibunAddress);
                setExtraAddress(extraRoadAddr);

                if (data.autoRoadAddress) {
                    const expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    setGuide(`(예상 도로명 주소 : ${expRoadAddr})`);
                } else if (data.autoJibunAddress) {
                    const expJibunAddr = data.autoJibunAddress;
                    setGuide(`(예상 지번 주소 : ${expJibunAddr})`);
                } else {
                    setGuide('');
                }
            }
        }).open();
    };

    // 입력된 값을 onSubmit 콜백 함수로 전달
    const handleSubmit = () => {
        const fullAddress = `${postcode} ${roadAddress} ${jibunAddress} ${extraAddress} ${detailAddress}`;
        onSubmit({
            fullAddress
        });
    };

    return (
        <div>
            <input
                type="text"
                id="sample4_postcode"
                placeholder="우편번호"
                value={postcode}
                readOnly
            />
            <input
                type="button"
                onClick={handlePostcodeSearch}
                value="우편번호 찾기"
            /><br />
            <input
                type="text"
                id="sample4_roadAddress"
                placeholder="도로명주소"
                value={roadAddress}
                readOnly
            />
            <input
                type="text"
                id="sample4_jibunAddress"
                placeholder="지번주소"
                value={jibunAddress}
                readOnly
            />
            <span id="guide" style={{ color: '#999' }}>{guide}</span>
            <input
                type="text"
                id="sample4_detailAddress"
                placeholder="상세주소"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
            />
            <input
                type="text"
                id="sample4_extraAddress"
                placeholder="참고항목"
                value={extraAddress}
                readOnly
            />
            <button onClick={handleSubmit}>확인</button>
        </div>
    );
};

export default AddressForm;
