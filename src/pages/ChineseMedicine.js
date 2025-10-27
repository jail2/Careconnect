import React from 'react';
import './Page.css';

function ChineseMedicine() {
  return (
    <div className="page-container">
      <div className="page-title-section">
        <h2>중의학 (Traditional Chinese Medicine)</h2>
        <p>몸과 마음의 균형을 중시하는 중의학의 지혜를 탐구합니다.</p>
      </div>
      <div className="page-content">
        <div className="info-card">
          <div className="card-icon">🩺</div>
          <h3>진단 (診斷): 네 가지 진찰법 (四診)</h3>
          <p>망진(望診), 문진(聞診), 문진(問診), 절진(切診)을 통해 환자의 상태를 종합적으로 파악합니다.</p>
        </div>
        <div className="info-card">
          <div className="card-icon">🌿</div>
          <h3>치료 (治療): 자연의 힘을 빌려</h3>
          <p>한약, 침구(침, 뜸), 부항, 추나 요법 등을 통해 기의 흐름을 조절하고 몸의 균형을 회복시킵니다.</p>
        </div>
        <div className="info-card">
          <div className="card-icon"> 🩹</div>
          <h3>건강 관리와 예방 (預防)</h3>
          <p>체질 감별, 계절별 건강 관리, 식이 요법(食療)을 통해 질병을 예방하고 건강한 삶을 유지하도록 돕습니다.</p>
        </div>
        <div className="info-card">
          <div className="card-icon">🤝</div>
          <h3>현대 의학과의 협진</h3>
          <p>현대 의학과 협력하여 환자에게 더 종합적이고 효과적인 치료 방안을 제공합니다.</p>
        </div>
        <div className="info-card">
          <div className="card-icon">📚</div>
          <h3>교육 및 연구</h3>
          <p>고전 의서 연구와 임상 데이터 분석을 통해 중의학을 끊임없이 발전시키고 후학을 양성합니다.</p>
        </div>
      </div>
    </div>
  );
}

export default ChineseMedicine;