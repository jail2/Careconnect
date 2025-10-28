import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>Care-Connect</Link>
      </div>
      
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
        <Link to="/chinese-medicine" onClick={closeMenu}>중국 의학</Link>
        <Link to="/nursing" onClick={closeMenu}>현대 간호</Link>
        <Link to="/dictionary" onClick={closeMenu}>용어 사전</Link>
        <Link to="/qa" onClick={closeMenu}>Q&A</Link>
        <Link to="/about" onClick={closeMenu}>팀 소개</Link>
        <Link to="/admin" onClick={closeMenu}>관리자</Link>
        <div className="auth-section-mobile">
          {user ? (
            <button onClick={handleLogout} className="logout-btn">로그아웃</button>
          ) : (
            <Link to="/login" onClick={closeMenu} className="login-link">로그인</Link>
          )}
        </div>
      </nav>

      <div className="auth-section">
        {user ? (
          <button onClick={handleLogout} className="logout-btn">로그아웃</button>
        ) : (
          <Link to="/login" className="login-link">로그인</Link>
        )}
      </div>
    </header>
  );
}

export default Header;