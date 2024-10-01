import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, { text: todo, completed: false, deleted: false }]);
  };

  const complete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = true;
    setTodos(newTodos);
  };

  const deleted = (index) => {
    const newTodos = [...todos];
    newTodos[index].deleted = true;
    setTodos(newTodos);
  };

  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/write">글쓰기 페이지</Link> | <Link to="/">메인 페이지</Link>
        </nav>
        <Routes>
          <Route path="/" element={<MainPage todos={todos} complete={complete} deleted={deleted} />} />
          <Route path="/write" element={<WritePage addTodo={addTodo} />} />
        </Routes>
      </div>
    </Router>
  );
}

function MainPage({ todos, complete, deleted }) {
  return (
    <div className="container">
      <h1>할 일 목록</h1>
      <ul>
        {todos.map((todo, index) => (
          !todo.deleted && (
            <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
              {!todo.completed && <button id="btn1" onClick={() => complete(index)}>완료</button>}
              <button id="btn2" onClick={() => deleted(index)}>삭제</button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
}

function WritePage({ addTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim() !== '') {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="container">
      <h1>글쓰기 페이지</h1>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력하세요" 
      />
      <button onClick={handleSubmit} id="btn1">추가</button>
    </div>
  );
}

export default App;
