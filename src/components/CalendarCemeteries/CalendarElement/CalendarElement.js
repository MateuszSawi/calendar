import {useState} from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import './CalendarElement.css';
import Time from './Time.js';
// import axios from 'axios';

function CalendarElement() {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false); 

  let fixedDate = moment(date).format('DD/MM/YYYY');
  let dayOfTheWeek = moment(date).format('dddd'); 
  let day = moment(date).format('DD'); 
  let month = moment(date).format('MM'); 
  let year = moment(date).format('YYYY'); 

  if (dayOfTheWeek === 'Monday') {
    dayOfTheWeek = 'Poniedziałek';
  } else if (dayOfTheWeek === 'Tuesday') {
    dayOfTheWeek = 'Wtorek';
  } else if (dayOfTheWeek === 'Wednesday') {
    dayOfTheWeek = 'Środa';
  } else if (dayOfTheWeek === 'Thursday') {
    dayOfTheWeek = 'Czwartek';
  } else if (dayOfTheWeek === 'Friday') {
    dayOfTheWeek = 'Piątek';
  } else if (dayOfTheWeek === 'Saturday') {
    dayOfTheWeek = 'Sobota';
  } else if (dayOfTheWeek === 'Sunday') {
    dayOfTheWeek = 'Niedziela';
  }

  // console.log('====== CalendarElement ======');
  // console.log('Date before fix - ', date);
  // console.log('fixedDate - ', fixedDate);
  // console.log('Date params - ', dayOfTheWeek, '|', day, '|', month, '|', year);
  // console.log(' ');

  const handleDateChange = (date) => {
    setDate(date);
    setShowTime(true);
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
    const year = date.getFullYear();
    const data = { day: day, month: month, year: year };
    fetch('/polls/addtodatabase/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // do something with response data
      })
      .catch(error => {
        console.error(error);
        // handle error
      });
  };

  return (
    <div className='app'>
      <h1 className='header'>Cmentarz</h1>
      <div>
       <Calendar onChange={handleDateChange} value={date} 
        onClickDay={() => {
          setShowTime(true);
        }} />
      </div>
   
      {date.length > 0 ? (
      <p>
        <span>Start:</span>
        {date[0].toDateString()}
        &nbsp;
        &nbsp;
        <span>End:</span>{date[1].toDateString()}
      </p>
             ) : (
      <p>
        <span>Wybrany dzień : </span>{fixedDate}
      </p> 
             )
      }
      <p>
        &nbsp;  
      </p>
      <Time showTime={showTime} 
        date={date} 
        fixedDate={fixedDate} 
        dayOfTheWeek={dayOfTheWeek} 
        day={day} 
        month={month} 
        year={year} />
    </div>
     )
}

export default CalendarElement;
