import './App.css';
import CalendarPage from './components/CalendarPage';
import LoginForm from './components/LoginPage/LoginForm';
import Header from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';

function App() {

  // const routes = useRoutes([
  //   { path: '/', element: <LoginForm /> },
  //   { path: '/calendar', element: <CalendarPage /> },
  // ]);

  return (
    <div className='container'>
      <Header />
      <Routes>
        <Route path="/"
          element={<LoginForm />} />
        <Route path="/calendar"
          element={<CalendarPage />} />
      </Routes>
    </div>
  );
}

export default App;