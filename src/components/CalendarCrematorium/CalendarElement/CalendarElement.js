import {useState} from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import './CalendarElement.css';
import Time from './Time.js'

function CalendarElement(props) {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false) 

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

  return (
    <div className='app'>
      <h1 className='header'>Zielen</h1>
      <div>
       <Calendar onChange={setDate} value={date} onClickDay={() => setShowTime(true)} />
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
