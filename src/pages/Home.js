import React from 'react';
import './Home.css';
import heroImage from '../assets/dohun.jpg';
import { useDarkMode } from '../contexts/DarkModeContext';

function Home() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="home-container">
      <div className="hero-content">
        <div className="hero-text">
          <h1>몸과 마음을 치유하는<br />환자 중심의 의료 서비스</h1>
          <p>사랑과 정성이 가득한 분위기로 어려움을 지닌 환자분들의 행복하고<br />건강한 삶을 위해 항상 노력합니다.</p>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Hero Illustration" />
        </div>
      </div>
      <button 
        onClick={toggleDarkMode} 
        className="dark-mode-toggle"
        aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
      >
        {isDarkMode ? '🌞' : '🌙'}
      </button>
    </div>
  );
}

export default Home;