import './App.css';
// import {useState} from 'react';
// import 'react-calendar/dist/Calendar.css'
import moment from 'moment';
// import Calendar from 'react-calendar'
// import './App.css';
import CalendarPage from './components/CalendarPage/CalendarPage';
import Login from './components/LoginPage/Login';
import LoginForm from './components/LoginPage/LoginForm';

function App() {

  // const tileContent = ({ date, view }) => {
  //   if (view === 'month') {
  //     const dayOfMonth = moment(date).format('D');
  //     return <div>{dayOfMonth}</div>;
  //   } else {
  //     return null;
  //   }
  // };

  return (
    <>
      {/* <Login /> */}
      <LoginForm />
      <CalendarPage 
      // tileContent={tileContent}
      />
    </>
    );
}

export default App;
