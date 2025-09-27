// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';
import './HomePage.css';
import clubLogo from '../assets/onezero.png';

const HomePage = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                <img src={clubLogo} alt="동아리 로고" className="club-logo-img" />
                <h1>일 영</h1>
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
