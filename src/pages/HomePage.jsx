// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';
import './HomePage.css';
import clubLogo from '../assets/onezero.png'; // ✨ 1. 이미지 파일을 import 합니다.

const HomePage = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                {/* ✨ 2. <img> 태그를 사용하여 이미지를 삽입합니다. */}
                <img src={clubLogo} alt="동아리 로고" className="club-logo-img" />

                {/* 기존의 [ 동아리 마크 ] 텍스트는 이제 필요 없으니 삭제하거나 주석 처리합니다. */}
                {/* <div className="club-logo">[ 동아리 마크 ]</div> */}

                <h1>일  영</h1>
                <p>환영합니다! 시작하려면 로그인 또는 회원가입을 진행해주세요.</p>
            </div>
            <div className="home-buttons">
                <Link to="/login" className="home-button login">
                    로그인
                </Link>
                <Link to="/signup" className="home-button signup">
                    회원가입
                </Link>
            </div>
        </div>
    );
};

export default HomePage;