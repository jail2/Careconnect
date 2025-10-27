import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Page.css';

const QA = ({ questions, addQuestion }) => {
  const [newQuestion, setNewQuestion] = useState('');

  // 텍스트area 자동 높이 조절
  const autoResizeTextarea = useCallback((e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim() === '') return;
    addQuestion(newQuestion);
    setNewQuestion('');
  };

  return (
    <div className="page-container qa-page">
      <div className="page-header">
        <Link to="/" className="back-button">←</Link>
        <h1>Q&A</h1>
      </div>

      <div className="page-content">
        <section className="info-card qa-card">
          <h3 className="qa-title">질문과 답변</h3>
          <p className="qa-description">
            이곳은 사용자들이 중의학 및 현대 간호에 대해 궁금한 점을 질문하고 답변을 받는 공간입니다.
          </p>

          <form onSubmit={handleSubmit} className="question-form">
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              onInput={autoResizeTextarea}
              placeholder="여기에 질문을 입력하세요..."
              rows="1"
              className="question-input"
              aria-label="질문 입력창"
            />
            <button
              type="submit"
              className="submit-button"
              disabled={!newQuestion.trim()}
            >
              질문하기
            </button>
          </form>

          <div className="questions-list">
            {questions.map((q) => (
              <article key={q.id} className="question-item">
                <strong className="question-text">Q: {q.question}</strong>
                <p className="answer-text">
                  {q.answer ? `A: ${q.answer}` : 'A: 아직 답변이 등록되지 않았습니다.'}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default QA;