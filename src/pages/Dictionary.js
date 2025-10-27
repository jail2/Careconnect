import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Page.css';
import './Dictionary.css';

// 1. 예시 데이터베이스 생성 (검색 키워드 추가)
const db = {
  'diabetes': {
    term_ko: '당뇨병',
    term_zh: '糖尿病 (tángniàobìng)',
    category: 'endocrine',
    search_terms: ['당뇨병', 'diabetes', '소갈증', 'sogaljeung', '糖尿病'],
    term_explanation: "'소갈증(消渴症)'은 '몸이 소모되고(消) 갈증이 나는(渴) 병'이라는 뜻으로, 당뇨병의 주요 증상(다식, 다음, 다뇨)을 표현하는 전통 의학 용어입니다.",
    term_explanation_zh: "'消渴症' (xiāo kě zhèng) 的意思是 '身体消耗(消)且口渴(渴)的病症'，是描述糖尿病主要症状（多食、多饮、多尿）的传统医学术语。",
    pronunciation: 'tángniàobìng',
    related_terms: ['hypertension', 'chronic_fatigue'],
    tcm: {
      title: '중의학 관점 (소갈증 消渴症)',
      description: '소갈증은 갈증이 나고 소변을 많이 보며, 많이 먹어도 몸이 마르는 증상을 특징으로 합니다. 폐, 위, 신장의 기능 실조로 인해 발생한다고 보며, 주로 체내의 진액(津液) 부족과 음허(陰虛)를 원인으로 봅니다.',
      treatment: '치료는 주로 폐를 촉촉하게 하고(윤폐), 위의 열을 내리며(청위), 신장의 음기를 보충하는(자음보신) 약재(예: 천화분, 황련, 생지황)와 침술을 사용합니다. 환자의 체질과 증상에 따라 맞춤 처방을 합니다.'
    },
    tcm_zh: {
        title: '中医学观点 (消渴症)',
        description: '消渴症的特征是口渴、多尿、多食但身体消瘦。中医认为这是由于肺、胃、肾功能失调，主要是体内津液不足和阴虚所致。',
        treatment: '治疗主要采用润肺、清胃热、滋阴补肾的药材（如天花粉、黄连、生地黄）和针灸。根据患者的体质和症状进行个体化处方。'
    },
    nursing: {
      title: '현대 간호학 관점',
      description: '당뇨병은 인슐린의 분비량이 부족하거나 정상적인 기능이 이루어지지 않는 대사질환의 일종으로, 혈중 포도당 농도가 높은 것이 특징입니다. 제1형과 제2형으로 구분됩니다.',
      treatment: '주요 치료 및 간호는 혈당 관리에 중점을 둡니다. 생활 습관 교정(식이요법, 운동), 경구 혈당 강하제 또는 인슐린 주사, 정기적인 혈당 모니터링 및 합병증 예방 교육을 시행합니다.'
    },
    nursing_zh: {
        title: '现代护理学观点',
        description: '糖尿病是一种因胰岛素分泌不足或功能异常引起的代谢性疾病，特征是血糖水平过高。分为1型和2型糖尿病。',
        treatment: '主要治疗和护理重点是血糖管理。包括改变生活方式（饮食疗法、运动）、口服降糖药或注射胰岛素、定期监测血糖及预防并发症的教育。'
    }
  },
  'hypertension': {
    term_ko: '고혈압',
    term_zh: '高血壓 (gāoxuèyā)',
    category: 'cardiovascular',
    search_terms: ['고혈압', 'hypertension', '高血壓'],
    pronunciation: 'gāoxuèyā',
    related_terms: ['diabetes', 'indigestion'],
    term_explanation: null,
    tcm: {
      title: '중의학적 관점 (中醫學 視角)',
      description: '肝陽(Gānyáng) 상항, 痰濕(Tánshī), 또는 腎虛(Shènxū) 등으로 인해 발생하는 것으로 봅니다. 주로 머리가 어지럽고, 눈이 침침하며, 귀에서 소리가 나고, 뒷목이 뻣뻣한 증상을 동반합니다. 인체 내부 장기의 불균형, 특히 간, 신, 심장의 기능 실조로 인해 기혈 순환에 문제가 생겨 발생하는 것으로 해석합니다.',
      treatment: '변증(辨證)을 통해 환자의 개별적인 증상과 체질에 맞는 치료를 합니다. 주로 평간잠양(平肝潛陽), 활혈화어(活血化瘀), 보익간신(補益肝腎) 등의 방법을 사용하여 탕약, 침, 뜸 등을 활용합니다. 생활 습관 개선을 병행하여 기혈 순환을 돕고 스트레스를 관리합니다.'
    },
    tcm_zh: {
        title: '中医学观点',
        description: '多由肝阳上亢、痰湿或肾虚等引起。常伴有头晕、眼花、耳鸣、后颈僵硬等症状。中医认为这是由于内部脏腑失衡，主要是肝、肾、心功能失调，导致气血循环出现问题所致。',
        treatment: '通过辨证论治，根据患者的个别症状和体质进行治疗。主要采用平肝潜阳、活血化瘀、补益肝肾等方法，使用汤药、针灸、艾灸等。同时结合改善生活习惯，帮助气血循环和管理压力。'
    },
    nursing: {
      title: '현대 의학적 관점 (現代醫學 視角)',
      description: '심장의 수축과 이완 과정에서 혈관 벽에 가해지는 압력이 정상 범위를 초과하여 지속되는 상태입니다. 일차성(본태성) 고혈압과 이차성 고혈압으로 분류되며, 심혈관계 질환(뇌졸중, 심근경색 등)의 주요 위험 요인으로 간주됩니다.',
      treatment: '약물 치료(이뇨제, 베타차단제, 칼슘통로차단제, ACE 억제제 등)를 통해 혈압을 목표 범위 내로 조절합니다. 저염식, 운동, 금연, 절주 등 생활 습관 개선을 필수적으로 권고하며, 정기적인 혈압 측정 및 합병증 예방 관리를 중요시합니다.'
    },
    nursing_zh: {
        title: '现代医学观点',
        description: '指在心脏收缩和舒张过程中，施加于血管壁的压力持续高于正常范围的状态。分为原发性高血压和继发性高血压，是心血管疾病（如中风、心肌梗死）的主要危险因素。',
        treatment: '通过药物治疗（利尿剂、β-受体阻滞剂、钙通道阻滞剂、ACE抑制剂等）将血压控制在目标范围内。强烈建议改善生活方式，如低盐饮食、运动、戒烟、限酒，并重视定期测量血压和预防并发症的管理。'
    }
  },
  'indigestion': {
    term_ko: '소화불량',
    term_zh: '消化不良 (xiāohuà bùliáng)',
    category: 'digestive',
    search_terms: ['소화불량', 'indigestion', '체함', '消化不良'],
    pronunciation: 'xiāohuà bùliáng',
    related_terms: ['chronic_fatigue'],
    term_explanation: null,
    tcm: {
      title: '중의학적 관점 (中醫學 視角)',
      description: '脾胃(Píwèi) 기능의 실조로 인해 음식물의 소화, 흡수, 운화(運化) 기능에 장애가 발생한 상태를 말합니다. 주로 식적(食積), 비위허약(脾胃虛弱), 간위불화(肝胃不和) 등으로 구분됩니다. 헛배 부름, 트림, 구토, 상복부 통증 등의 증상이 나타납니다.',
      treatment: '건비화위(健脾和胃), 소식도체(消食導滯), 서간해울(舒肝解鬱) 등의 치법을 사용하여 비위의 기능을 회복시키고 소화를 돕습니다. 환자의 체질과 원인에 따라 적절한 탕약과 함께 복부 침, 뜸 등을 사용하여 위장관 운동을 조절합니다.'
    },
    tcm_zh: {
        title: '中医学观点',
        description: '指脾胃功能失调，导致食物的消化、吸收和运化功能出现障碍的状态。主要分为食积、脾胃虚弱、肝胃不和等类型。症状包括腹胀、嗳气、呕吐、上腹痛等。',
        treatment: '采用健脾和胃、消食导滞、疏肝解郁等治法，恢复脾胃功能，帮助消化。根据患者的体质和病因，使用合适的汤药，并配合腹部针灸、艾灸来调节胃肠道运动。'
    },
    nursing: {
      title: '현대 의학적 관점 (現代醫學 視角)',
      description: '위장관의 운동 기능 장애나 구조적 이상 없이 만성적이거나 반복적인 상복부 통증 또는 불쾌감이 발생하는 기능성 소화불량과, 기질적인 원인(위궤양, 위염 등)에 의한 소화불량으로 구분합니다.',
      treatment: '위산 분비 억제제(PPI), 위장관 운동 촉진제, 소화 효소제, 제산제 등을 사용하여 증상을 완화합니다. 식사 습관 개선(규칙적인 식사, 천천히 먹기, 과식 피하기) 및 스트레스 관리가 중요한 관리 방법입니다.'
    },
    nursing_zh: {
        title: '现代医学观点',
        description: '分为功能性消化不良和器质性消化不良。功能性消化不良指无胃肠道运动功能障碍或结构异常，但出现慢性或反复性上腹痛或不适。器质性原因包括胃溃疡、胃炎等。',
        treatment: '使用抑制胃酸分泌的药物（PPI）、胃肠动力促进剂、消化酶、制酸剂等来缓解症状。改善饮食习惯（规律饮食、细嚼慢咽、避免过食）和压力管理是重要的管理方法。'
    }
  },
  'chronic_fatigue': {
    term_ko: '만성 피로',
    term_zh: '慢性疲勞 (mànxìng píláo)',
    category: 'general',
    search_terms: ['만성 피로', '만성피로', 'chronic fatigue', '慢性疲勞'],
    pronunciation: 'mànxìng píláo',
    related_terms: ['diabetes', 'indigestion'],
    term_explanation: null,
    tcm: {
      title: '중의학적 관점 (中醫學 視角)',
      description: '氣血(Qìxuè) 부족, 陰陽(Yīnyáng) 불균형, 특히 비(脾)와 신(腎)의 허약으로 인해 기력이 없고 쉽게 지치며, 충분히 쉬어도 회복되지 않는 상태로 봅니다. 정신적인 스트레스와 과로로 인한 간(肝)의 울체도 주요 원인이 됩니다.',
      treatment: '보익기혈(補益氣血), 조리비신(調理脾腎), 익기양음(益氣養陰) 등을 주요 치법으로 사용하여 인체의 부족한 기운과 진액을 보충합니다. 사상체질(四象體質)에 맞춰 인삼, 황기, 당귀 등 약재를 활용한 맞춤 탕약을 처방하고, 침과 뜸으로 기혈 순환을 개선합니다.'
    },
    tcm_zh: {
        title: '中医学观点',
        description: '中医认为这是由于气血不足、阴阳失衡，特别是脾、肾虚弱，导致精力不济、容易疲劳，即使充分休息也无法恢复的状态。精神压力和过度劳累引起的肝气郁结也是主要原因。',
        treatment: '主要采用补益气血、调理脾肾、益气养阴等治法，补充人体不足的气和津液。根据四象体质，开具使用人参、黄芪、当归等药材的个性化汤药，并通过针灸、艾灸改善气血循环。'
    },
    nursing: {
      title: '현대 의학적 관점 (現代醫學 視角)',
      description: '6개월 이상 지속되거나 반복되는 심각한 피로로, 휴식으로도 회복되지 않고 일상생활에 심각한 장애를 초래하는 상태입니다. 명확한 기질적 원인이 없는 경우를 만성 피로 증후군(Chronic Fatigue Syndrome)으로 진단합니다.',
      treatment: '원인 질환이 있는 경우 이를 치료하고, 증상 완화를 위한 약물(통증 조절, 수면제 등)을 사용합니다. 인지 행동 치료(CBT)와 단계적 운동 치료(GET)를 통해 신체 활동 능력과 삶의 질을 개선하는 데 중점을 둡니다.'
    },
    nursing_zh: {
        title: '现代医学观点',
        description: '指持续或反复出现超过6个月的严重疲劳，休息后也无法恢复，并严重影响日常生活的状态。若无明确的器质性原因，则诊断为慢性疲劳综合征（Chronic Fatigue Syndrome）。',
        treatment: '若有潜在疾病则进行治疗，并使用药物（疼痛控制、安眠药等）缓解症状。重点是通过认知行为疗法（CBT）和分级运动疗法（GET）来改善身体活动能力和生活质量。'
    }
  }
};

// 카테고리 정의
const categories = {
  all: { ko: '전체', zh: '全部' },
  endocrine: { ko: '내분비계', zh: '内分泌系统' },
  cardiovascular: { ko: '심혈관계', zh: '心血管系统' },
  digestive: { ko: '소화기계', zh: '消化系统' },
  general: { ko: '일반', zh: '一般' }
};

// 디바운스 커스텀 훅
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const suggestedTerms = ['당뇨병', '고혈압', '소화불량', '만성 피로'];

function Dictionary() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('dictionary-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('dictionary-recent');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('dictionary-darkmode');
    return saved ? JSON.parse(saved) : false;
  });
  const [showRelated, setShowRelated] = useState(false);
  
  const debouncedQuery = useDebounce(query, 300);

  // 다크모드 토글
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('dictionary-darkmode', JSON.stringify(newMode));
  };

  // 즐겨찾기 토글
  const toggleFavorite = (termKey) => {
    const newFavorites = favorites.includes(termKey)
      ? favorites.filter(f => f !== termKey)
      : [...favorites, termKey];
    setFavorites(newFavorites);
    localStorage.setItem('dictionary-favorites', JSON.stringify(newFavorites));
  };

  // 최근 검색어 추가
  const addToRecentSearches = (term) => {
    const newRecent = [term, ...recentSearches.filter(r => r !== term)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('dictionary-recent', JSON.stringify(newRecent));
  };

  // 검색 함수
  const search = useCallback((searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    if (!lowerCaseSearchTerm) {
      setResults([]);
      return;
    }

    const isChineseQuery = /[一-龥]/.test(lowerCaseSearchTerm);

    let foundResults = Object.entries(db).filter(([key, term]) => {
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
      const matchesKorean = term.search_terms.some(st => st.toLowerCase().includes(lowerCaseSearchTerm));
      const matchesChinese = isChineseQuery && term.term_zh && term.term_zh.toLowerCase().includes(lowerCaseSearchTerm);
      
      return matchesCategory && (matchesKorean || matchesChinese);
    }).map(([key, term]) => ({ ...term, key }));

    setResults(foundResults);
    
    if (foundResults.length > 0) {
      addToRecentSearches(searchTerm);
    }
  }, [selectedCategory]);

  useEffect(() => {
    search(debouncedQuery);
  }, [debouncedQuery, search]);

  const handleSuggestionClick = (term) => {
    setQuery(term);
  };

  const highlightMatch = (text, highlight) => {
    if (!highlight || !text) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <strong key={i} className="highlight">{part}</strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  // 음성 발음 재생
  const playPronunciation = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      speechSynthesis.speak(utterance);
    }
  };

  // 관련 용어 가져오기
  const getRelatedTerms = (termKey) => {
    const term = db[termKey];
    if (!term || !term.related_terms) return [];
    return term.related_terms.map(key => ({ key, ...db[key] })).filter(Boolean);
  };

  // 다크모드 적용을 body에도 반영
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // 컴포넌트 언마운트 시 정리
    return () => {
      document.body.classList.remove('dark-mode');
    };
  }, [isDarkMode]);

  const isChineseQuery = /[一-龥]/.test(query);
  const currentTexts = isChineseQuery ? uiTexts.zh : uiTexts.ko;
  const currentSuggestedTerms = isChineseQuery ? suggestedTermsZh : suggestedTerms;

  return (
    <div className={`page-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="page-header">
        <Link to="/" className="back-button">←</Link>
        <h1>{currentTexts.title}</h1>
        <div className="header-controls">
          <button onClick={toggleDarkMode} className="mode-toggle">
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </div>
      
      <div className="page-content">
        <div className="search-container">
          <div className="search-input-container">
            <input 
              type="text" 
              className="search-input"
              placeholder={currentTexts.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="clear-button" onClick={() => setQuery('')}>✕</button>
          </div>
          
          {/* 카테고리 필터 */}
          <div className="category-filters">
            {Object.entries(categories).map(([key, category]) => (
              <button 
                key={key}
                className={`category-chip ${selectedCategory === key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(key)}
              >
                {isChineseQuery ? category.zh : category.ko}
              </button>
            ))}
          </div>
          
          {/* 추천 검색어 */}
          <div className="suggestions">
            <span>{currentTexts.suggestedTerms}: </span>
            {currentSuggestedTerms.map(term => (
              <button key={term} onClick={() => handleSuggestionClick(term)} className="suggestion-chip">
                {term}
              </button>
            ))}
          </div>
          
          {/* 최근 검색어 */}
          {recentSearches.length > 0 && (
            <div className="recent-searches">
              <span>{currentTexts.recentSearches}: </span>
              {recentSearches.map(term => (
                <button key={term} onClick={() => handleSuggestionClick(term)} className="recent-chip">
                  {term}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="results-container">
          {query && results.length === 0 && <p className="no-results">{currentTexts.noResults}</p>}
          {results.map((result, index) => {
            const relatedTerms = getRelatedTerms(result.key);
            return (
              <div key={index} className="result-card">
                <div className="result-header">
                  <h2>
                    {highlightMatch(result.term_ko, query)} / {highlightMatch(result.term_zh, query)}
                  </h2>
                  <div className="result-actions">
                    {result.pronunciation && (
                      <button 
                        className="pronunciation-btn"
                        onClick={() => playPronunciation(result.pronunciation)}
                        title={currentTexts.pronunciation}
                      >
                        🔊
                      </button>
                    )}
                    <button 
                      className={`favorite-btn ${favorites.includes(result.key) ? 'active' : ''}`}
                      onClick={() => toggleFavorite(result.key)}
                      title={currentTexts.favorites}
                    >
                      {favorites.includes(result.key) ? '★' : '☆'}
                    </button>
                  </div>
                </div>
                
                {result.term_explanation && (
                  <p className="term-explanation">
                    {isChineseQuery ? result.term_explanation_zh : result.term_explanation}
                  </p>
                )}
                
                <div className="comparison-grid">
                  <div className="perspective-card tcm-card">
                    <h4>{isChineseQuery ? result.tcm_zh.title : result.tcm.title}</h4>
                    <p><strong>{currentTexts.definition}:</strong> {isChineseQuery ? result.tcm_zh.description : result.tcm.description}</p>
                    <p><strong>{currentTexts.treatment}:</strong> {isChineseQuery ? result.tcm_zh.treatment : result.tcm.treatment}</p>
                  </div>
                  <div className="perspective-card nursing-card">
                    <h4>{isChineseQuery ? result.nursing_zh.title : result.nursing.title}</h4>
                    <p><strong>{currentTexts.definition}:</strong> {isChineseQuery ? result.nursing_zh.description : result.nursing.description}</p>
                    <p><strong>{currentTexts.treatment}:</strong> {isChineseQuery ? result.nursing_zh.treatment : result.nursing.treatment}</p>
                  </div>
                </div>
                
                {/* 관련 용어 */}
                {relatedTerms.length > 0 && (
                  <div className="related-terms">
                    <h5>{currentTexts.relatedTerms}:</h5>
                    <div className="related-chips">
                      {relatedTerms.map(related => (
                        <button 
                          key={related.key}
                          className="related-chip"
                          onClick={() => setQuery(isChineseQuery ? related.term_zh.split(' ')[0] : related.term_ko)}
                        >
                          {isChineseQuery ? related.term_zh.split(' ')[0] : related.term_ko}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* 즐겨찾기 섹션 */}
        {favorites.length > 0 && !query && (
          <div className="favorites-section">
            <h3>{currentTexts.favorites}</h3>
            <div className="favorites-grid">
              {favorites.map(key => {
                const term = db[key];
                return term ? (
                  <div key={key} className="favorite-item" onClick={() => setQuery(isChineseQuery ? term.term_zh.split(' ')[0] : term.term_ko)}>
                    <span>{isChineseQuery ? term.term_zh.split(' ')[0] : term.term_ko}</span>
                    <span className="favorite-zh">{isChineseQuery ? term.term_ko : term.term_zh}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dictionary;

// 중국어 UI 텍스트
const uiTexts = {
  ko: {
    title: '용어 사전',
    searchPlaceholder: '의학 용어를 검색해보세요...',
    suggestedTerms: '추천 검색어',
    recentSearches: '최근 검색',
    noResults: '검색 결과가 없습니다.',
    definition: '정의',
    treatment: '치료/관리',
    relatedTerms: '관련 용어',
    favorites: '즐겨찾기',
    pronunciation: '발음 듣기'
  },
  zh: {
    title: '术语词典',
    searchPlaceholder: '请搜索医学术语...',
    suggestedTerms: '推荐搜索',
    recentSearches: '最近搜索',
    noResults: '没有搜索结果。',
    definition: '定义',
    treatment: '治疗/管理',
    relatedTerms: '相关术语',
    favorites: '收藏夹',
    pronunciation: '听发音'
  }
};

// 중국어 추천 검색어
const suggestedTermsZh = ['糖尿病', '高血压', '消化不良', '慢性疲劳'];