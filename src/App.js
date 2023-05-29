import './App.css';
import CalendarPage from './components/CalendarPage';
import LoginForm from './components/LoginPage/LoginForm';
import Header from './components/Header/Header';
import Admin from './components/Admin/Admin';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function App() {
  const [userName, setUserName] = useState('');
  const [authorities, setAuthorities] = useState('');

  // console.log(authorities);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleBeforeUnload = () => {
    localStorage.setItem('userName', userName);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userName]);

  return (
    <div className='container'>
      <Header 
        userName={userName}
        setUserName={setUserName}
        authorities={authorities}
        setAuthorities={setAuthorities}
      />

      <Routes>
        <Route path="/" element={<LoginForm setUserName={setUserName} />} />
        <Route path="/calendar" element={<CalendarPage setAuthorities={setAuthorities} authorities={authorities} />} />
        <Route path="/admin" element={<Admin setUserName ={setUserName} setAuthorities={setAuthorities} />} />
      </Routes>
    </div>
  );
}

export default App;