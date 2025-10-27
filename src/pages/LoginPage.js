import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link 추가
import './Page.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 실제 서비스에서는 백엔드 인증을 사용해야 합니다
    if (username && password) {
      localStorage.setItem('user', JSON.stringify({ username }));
      navigate('/qa');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/" className="back-button">←</Link>
        <h1>로그인</h1>
      </div>
      <div className="page-content">
        <form onSubmit={handleLogin} className="info-card" style={{gridColumn: '1 / -1'}}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;