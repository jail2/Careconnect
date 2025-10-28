import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Page.css';
import './AdminPage.css';

const ADMIN_PASSWORD = 'jail2';

function AdminPage({ questions, addAnswer, deleteQuestion }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [answer, setAnswer] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // 시뮬레이션을 위한 딜레이
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('비밀번호가 올바르지 않습니다.');
      }
      setLoading(false);
    }, 800);
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (answer.trim() === '' || selectedQuestionId === null) return;
    addAnswer(selectedQuestionId, answer);
    setAnswer('');
    setSelectedQuestionId(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="page-container">
        <div className="page-header">
          <Link to="/" className="back-button">←</Link>
          <h1>관리자 로그인</h1>
        </div>
        <div className="page-content">
          <div className="admin-login-container">
            <div className="admin-login-card">
              <div className="admin-login-header">
                <div className="admin-icon">🔐</div>
                <h2>관리자 인증</h2>
                <p>관리자 권한이 필요한 페이지입니다</p>
              </div>
              
              {error && <div className="admin-error-message">{error}</div>}
              
              <form onSubmit={handleLogin} className="admin-login-form">
                <div className="admin-form-group">
                  <label htmlFor="admin-password">관리자 비밀번호</label>
                  <input
                    type="password"
                    id="admin-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="비밀번호를 입력하세요"
                    required
                  />
                </div>
                
                <button type="submit" className="admin-login-button" disabled={loading}>
                  {loading ? (
                    <span className="loading-spinner">
                      <span className="spinner"></span>
                      인증 중...
                    </span>
                  ) : (
                    '로그인'
                  )}
                </button>
              </form>
              
              <div className="admin-login-footer">
                <p>🛡️ 보안을 위해 관리자만 접근 가능합니다</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const answeredQuestions = questions.filter(q => q.answer);
  const pendingQuestions = questions.filter(q => !q.answer);

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/" className="back-button">←</Link>
        <h1>관리자 페이지</h1>
      </div>
      <div className="page-content">
        <div className="admin-main-container">
          {/* 통계 카드 */}
          <div className="admin-stats">
            <div className="admin-stat-card">
              <h3>{questions.length}</h3>
              <p>전체 질문</p>
            </div>
            <div className="admin-stat-card" style={{background: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)'}}>
              <h3>{pendingQuestions.length}</h3>
              <p>답변 대기</p>
            </div>
            <div className="admin-stat-card" style={{background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)'}}>
              <h3>{answeredQuestions.length}</h3>
              <p>답변 완료</p>
            </div>
          </div>

          {/* Q&A 관리 */}
          <div className="admin-questions-container">
            <h3 style={{marginTop: 0, marginBottom: '25px', fontSize: '1.5rem', color: '#2d3748'}}>Q&A 관리</h3>
            
            {questions.length === 0 ? (
              <div style={{textAlign: 'center', padding: '40px', color: '#718096'}}>
                <p style={{fontSize: '1.1rem'}}>아직 등록된 질문이 없습니다.</p>
              </div>
            ) : (
              questions.map((q) => (
                <div key={q.id} className="admin-question-item">
                  <div className="admin-question-text">
                    Q: {q.question}
                  </div>
                  <div className={`admin-answer-text ${!q.answer ? 'admin-answer-pending' : ''}`}>
                    {q.answer ? `A: ${q.answer}` : 'A: 답변 대기 중'}
                  </div>
                  <div className="admin-button-group">
                    {!q.answer && (
                      <button 
                        onClick={() => setSelectedQuestionId(q.id)}
                        className="admin-btn admin-btn-answer"
                      >
                        📝 답변하기
                      </button>
                    )}
                    <button 
                      onClick={() => deleteQuestion(q.id)}
                      className="admin-btn admin-btn-delete"
                    >
                      🗑️ 삭제
                    </button>
                  </div>
                </div>
              ))
            )}
            
            {selectedQuestionId && (
              <div className="admin-answer-form">
                <h4>📝 답변 작성</h4>
                <form onSubmit={handleAnswerSubmit}>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="전문적이고 도움이 되는 답변을 작성해주세요..."
                    className="admin-answer-textarea"
                    required
                  />
                  <div className="admin-form-buttons">
                    <button type="submit" className="admin-btn admin-btn-save">
                      💾 답변 저장
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        setSelectedQuestionId(null);
                        setAnswer('');
                      }}
                      className="admin-btn admin-btn-cancel"
                    >
                      ❌ 취소
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;