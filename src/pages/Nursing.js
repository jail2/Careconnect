import React from 'react';
import './Page.css';

function Nursing() {
  return (
    <div className="page-container">
      <div className="page-title-section">
        <h2>현대 간호 정보</h2>
        <p>현대 의학적 지식을 기반으로 환자 관리와 돌봄을 제공하는 전문 간호사의 역할을 알아봅니다.</p>
      </div>
      <div className="page-content">
        <div className="info-card">
          <div className="card-icon">🩺</div>
          <h3>직접 간호 (Direct Patient Care)</h3>
          <p>활력징후 측정, 투약 및 주사, 상처 소독, 심폐소생술(CPR) 등 환자의 상태를 직접 돌보는 핵심적인 역할을 수행합니다.</p>
        </div>
        <div className="info-card">
          <div className="card-icon">💬</div>
          <h3>교육 및 상담 (Education & Counseling)</h3>
          <p>환자와 보호자가 질병을 이해하고 스스로 건강을 관리할 수 있도록 교육하고, 건강 증진을 위한 상담을 제공합니다.</p>
        </div>
        <div className="info-card">
          <div className="card-icon">📋</div>
          <h3>행정 및 관리 (Administration & Management)</h3>
          <p>의료 기록 관리, 필요 물품 및 장비 관리, 간호 인력 관리 등 효율적인 의료 환경을 위한 행정 업무를 담당합니다.</p>
        </div>
        <div className="info-card">
          <div className="card-icon">🔬</div>
          <h3>연구 (Research)</h3>
          <p>간호 서비스의 질을 향상시키고 새로운 간호 기술을 개발하기 위한 임상 연구에 참여하여 간호학 발전에 기여합니다.</p>
        </div>
      </div>
    </div>
  );
}

export default Nursing;