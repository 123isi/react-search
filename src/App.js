import './App.css';
import { useState } from 'react';

function App() {
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '데이트 코스 추천']);
  let [좋아요, 좋아요추가] = useState(0);
  let [선택된제목, 선택된제목수정] = useState(글제목[0]);
  let [날짜, 날짜수정] = useState(['2월 19일', '2월 18일', '2월 17일']);
  let [상세내용, 상세내용수정] = useState([
    'https://www.musinsa.com/search/goods?keyword=%EB%82%A8%EC%9E%90%EC%BD%94%ED%8A%B8%EC%B6%94%EC%B2%9C&gf=A',
    'https://www.diningcode.com/list.dc?query=%EA%B0%95%EB%82%A8%EC%97%AD%20%EC%9A%B0%EB%8F%99',
    'https://kr.hotels.com/go/south-korea/kr-best-seoul-couples-things-to-do'
  ]);
  let [선택된날짜, 선택된날짜수정] = useState(날짜[0]);
  let [선택된상세내용, 선택된상세내용수정] = useState(상세내용[0]);
  let [검색어, 검색어변경] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      let arr = 글제목.filter(title => title.includes(검색어));
      if (arr.length > 0) {
        let idx = 글제목.indexOf(arr[0]);
        선택된제목수정(arr[0]);
        선택된날짜수정(날짜[idx]);
        선택된상세내용수정(상세내용[idx]);
      } else {
        alert('검색 결과가 없습니다.');
      }
    }
  };

  return (
    <div className="App">
      <div className="black-nav">
        <h4>Reactblog</h4>
      </div>

      
      <input 
        type="text" 
        name="제목찾기" 
        placeholder='입력하세요.' 
        value={검색어} 
        onChange={(e) => 검색어변경(e.target.value)} 
        onKeyDown={handleKeyPress} 
      />
      
      <button onClick={() => {
        let sortlist = [...글제목];
        sortlist.sort();
        글제목변경(sortlist);
      }}>
        정렬하기
      </button>

      <Modal 제목={선택된제목} 날짜={선택된날짜} 상세내용={선택된상세내용}/>
      {/* {
        modal == true ? <Modal 제목={선택된제목} 날짜={선택된날짜} 상세내용={선택된상세내용}/> : null
      } */}
      
      <div className="list">
        <h4 onClick={() => {
          선택된제목수정(글제목[0]);
          선택된날짜수정(날짜[0]);
          선택된상세내용수정(상세내용[0]);
        }}>
          {글제목[0]} 
          <span 
            onClick={(e) => {
              좋아요추가(좋아요 + 1);
            }}
          > 
            ❤ 
          </span>
          {좋아요}
        </h4>
        <p>{날짜[0]}</p>
      </div>

      <div className="list">
        <h4 onClick={() => {
          선택된제목수정(글제목[1]);
          선택된날짜수정(날짜[1]);
          선택된상세내용수정(상세내용[1]);
        }}>
          {글제목[1]}
        </h4>
        <p>{날짜[1]}</p>
      </div>

      <div className="list">
        <h4 onClick={() => {
          선택된제목수정(글제목[2]);
          선택된날짜수정(날짜[2]);
          선택된상세내용수정(상세내용[2]);
        }}>
          {글제목[2]}
        </h4>
        <p>{날짜[2]}</p>
      </div>
    </div>
  );
}

function Modal({ 제목, 날짜, 상세내용 }) {
  return (
    <div className="modal">
      <h4>제목: {제목}</h4>
      <p>날짜: {날짜}</p>
      <p>상세 내용: <a href={상세내용}>링크</a></p>
    </div>
  );
}

export default App;
