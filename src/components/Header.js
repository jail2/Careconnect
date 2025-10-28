import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ user, setUser }) {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Care-Connect</Link>
      </div>
      <nav className="nav-menu">
        <Link to="/chinese-medicine">중국 의학</Link>
        <Link to="/nursing">현대 간호</Link>
        <Link to="/dictionary">용어 사전</Link>
        <Link to="/qa">Q&A</Link>
        <Link to="/about">팀 소개</Link>
        <Link to="/admin">관리자</Link>
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