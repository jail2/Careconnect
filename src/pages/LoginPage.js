import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Page.css';
import './LoginPage.css';

function LoginPage({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('아이디를 입력해주세요.');
      return false;
    }
    if (formData.username.length < 3) {
      setError('아이디는 3자 이상이어야 합니다.');
      return false;
    }
    if (!formData.password) {
      setError('비밀번호를 입력해주세요.');
      return false;
    }
    if (formData.password.length < 4) {
      setError('비밀번호는 4자 이상이어야 합니다.');
      return false;
    }
    if (!isLogin) {
      if (!formData.email.trim()) {
        setError('이메일을 입력해주세요.');
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('올바른 이메일 형식을 입력해주세요.');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.');
        return false;
      }
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    
    // 시뮬레이션을 위한 딜레이
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.username === formData.username && u.password === formData.password);
      
      if (user) {
        const userData = { username: user.username, email: user.email };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        navigate('/');
        setError('');
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
      setLoading(false);
    }, 1000);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // 회원가입 제한 (데모용 - 최대 10명)
      if (users.length >= 10) {
        setError('데모 버전에서는 최대 10명까지만 회원가입이 가능합니다.');
        setLoading(false);
        return;
      }
      
      // 중복 사용자 확인
      if (users.find(u => u.username === formData.username)) {
        setError('이미 존재하는 아이디입니다.');
        setLoading(false);
        return;
      }
      
      if (users.find(u => u.email === formData.email)) {
        setError('이미 존재하는 이메일입니다.');
        setLoading(false);
        return;
      }

      // 간단한 스팸 방지 (같은 시간대 연속 가입 방지)
      const recentSignups = users.filter(u => {
        const signupTime = new Date(u.createdAt);
        const now = new Date();
        return (now - signupTime) < 60000; // 1분 이내
      });
      
      if (recentSignups.length >= 3) {
        setError('잠시 후 다시 시도해주세요.');
        setLoading(false);
        return;
      }

      // 새 사용자 추가
      const newUser = {
        username: formData.username,
        password: formData.password, // 실제 서비스에서는 해시화 필요
        email: formData.email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // 자동 로그인
      const userData = { username: newUser.username, email: newUser.email };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/');
      setLoading(false);
    }, 1000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      password: '',
      confirmPassword: '',
      email: ''
    });
    setError('');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/" className="back-button">←</Link>
        <h1>{isLogin ? '로그인' : '회원가입'}</h1>
      </div>
      <div className="page-content">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h2>{isLogin ? '로그인' : '회원가입'}</h2>
              <p>{isLogin ? 'Care-Connect에 오신 것을 환영합니다' : '새 계정을 만들어보세요'}</p>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={isLogin ? handleLogin : handleSignup} className="login-form">
              <div className="form-group">
                <label htmlFor="username">아이디</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="아이디를 입력하세요"
                  required
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="email">이메일</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="이메일을 입력하세요"
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">비밀번호 확인</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="비밀번호를 다시 입력하세요"
                    required
                  />
                </div>
              )}

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? '처리 중...' : (isLogin ? '로그인' : '회원가입')}
              </button>
            </form>

            <div className="login-footer">
              <p>
                {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
                <button type="button" onClick={toggleMode} className="toggle-button">
                  {isLogin ? '회원가입' : '로그인'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;