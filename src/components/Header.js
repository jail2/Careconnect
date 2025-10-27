import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">Care-Connect</Link>
      </div>
      <nav className="app-nav">
        <Link to="/chinese-medicine">중국 의학</Link>
        <Link to="/nursing">현대 간호</Link>
        <Link to="/dictionary">용어 사전</Link>
        <Link to="/qa">Q&A</Link>
        <Link to="/admin">관리자</Link> {/* 관리자 페이지 링크 추가 */}
      </nav>
      {user ? (
        <button onClick={handleLogout} style={{marginLeft: '10px'}}>
          로그아웃
        </button>
      ) : (
        <Link to="/login" style={{marginLeft: '10px'}}>
          로그인
        </Link>
      )}
    </header>
  );
}

export default Header;