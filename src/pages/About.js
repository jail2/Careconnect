import React from 'react';
import './About.css';
import dohunImage from '../assets/dohunnurse.jpg';
import jungwonImage from '../assets/jungwon.jpg';
import jaewhonImage from '../assets/jaewhon.jpg';

function About() {
  const teamMembers = [
    {
      id: 1,
      name: '황도훈',
      role: '팀 리더 · 간호학과',
      image: dohunImage,
      description: '팀을 이끌며 현대의학 정보를 제공합니다. 간호학 전공으로 환자 중심의 의료 서비스를 추구합니다.'
    },
    {
      id: 2,
      name: '박중원',
      role: '중의학 전문가 · 중어중문학과',
      image: jungwonImage,
      description: '중어중문학 전공으로 중의학 정보를 제공합니다. 전통 의학과 현대 의학의 조화를 추구합니다.'
    },
    {
      id: 3,
      name: '이재원',
      role: '풀스택 개발자 · 컴퓨터공학과',
      image: jaewhonImage,
      description: '컴퓨터공학 전공으로 사이트 제작을 담당합니다. 프론트엔드와 백엔드 개발을 모두 담당합니다.'
    }
  ];

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <h1>팀 소개</h1>
          <p>Care-Connect를 만든 열정적인 개발팀을 소개합니다.</p>
        </div>
        
        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-card">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-description">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;