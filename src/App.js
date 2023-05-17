import './App.css';
import CalendarPage from './components/CalendarPage';
import LoginForm from './components/LoginPage/LoginForm';
import Header from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

function App() {

  const [userName, setUserName] = useState('');

  return (
    <div className='container'>
      <Header 
        userName={userName}
      />

      <Routes>
        <Route path="/"
          element={<LoginForm 
            setUserName={setUserName}
          />} />
        <Route path="/calendar"
          element={<CalendarPage />} />
      </Routes>
    </div>
  );
}

export default App;