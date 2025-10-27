import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import ChineseMedicine from './pages/ChineseMedicine';
import Nursing from './pages/Nursing';
import Dictionary from './pages/Dictionary';
import QA from './pages/QA';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import { Navigate } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  // localStorage에서 데이터 불러오기
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('qaQuestions');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        question: '뜸을 뜨고 물집이 생겼는데 어떻게 해야 하나요?',
        answer: '간호학 관점에서 2도 화상에 해당할 수 있으니, 즉시 찬물로 식히고 병원을 방문하는 것이 좋습니다...',
      },
      {
        id: 2,
        question: '소화가 안될 때 어떤 차를 마시는게 좋은가요?',
        answer: null,
      },
    ];
  });

  // 상태 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('qaQuestions', JSON.stringify(questions));
  }, [questions]);

  const addQuestion = (questionText) => {
    const newQuestion = {
      id: questions.length + 1,
      question: questionText,
      answer: null,
    };
    setQuestions([...questions, newQuestion]);
  };

  const addAnswer = (questionId, answerText) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, answer: answerText } : q
      )
    );
  };

  const deleteQuestion = (questionId) => {
    const newQuestions = questions.filter(q => q.id !== questionId);
    setQuestions(newQuestions);
  };

  return (
    <Router>
      <DarkModeProvider>
        <div className="App">
          <Header user={user} setUser={setUser} />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chinese-medicine" element={<ChineseMedicine />} />
              <Route path="/nursing" element={<Nursing />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/qa"
                element={user ? <QA questions={questions} addQuestion={addQuestion} /> : <Navigate to="/login" />}
              />
              <Route path="/admin" element={<AdminPage questions={questions} addAnswer={addAnswer} deleteQuestion={deleteQuestion} />} />
            </Routes>
          </main>
        </div>
      </DarkModeProvider>
    </Router>
  );
}

export default App;
