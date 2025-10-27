import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Page.css';

const ADMIN_PASSWORD = 'jail2';

function AdminPage({ questions, addAnswer, deleteQuestion }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [answer, setAnswer] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
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
          <form onSubmit={handleLogin} className="info-card" style={{gridColumn: '1 / -1'}}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
            />
            <button type="submit">로그인</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <Link to="/" className="back-button">←</Link>
        <h1>관리자 페이지</h1>
      </div>
      <div className="page-content">
        <div className="info-card" style={{gridColumn: '1 / -1'}}>
          <h3>Q&A 관리</h3>
          {questions.map((q) => (
            <div key={q.id} style={{borderTop: '1px solid #eee', marginTop: '20px', paddingTop: '20px'}}>
              <strong>Q: {q.question}</strong>
              <p>{q.answer ? `A: ${q.answer}` : 'A: 답변 대기 중'}</p>
              {!q.answer && (
                <button onClick={() => setSelectedQuestionId(q.id)}>
                  답변하기
                </button>
              )}
              <button 
                onClick={() => deleteQuestion(q.id)}
                style={{marginLeft: '10px', backgroundColor: '#ff4444', color: 'white'}}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;