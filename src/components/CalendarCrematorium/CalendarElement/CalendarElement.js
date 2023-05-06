import React, { useState, useEffect } from "react";
import moment from 'moment';
import Calendar from 'react-calendar';
import './CalendarElement.css';
import Time from './Time.js';
import axios from 'axios';

function CalendarElement() {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false); 

  // console.log(date);

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

  function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    return cookie[cookieName];
  }

  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleDateChange = (date) => {
    setDate(date);
    setShowTime(true);
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
    const year = date.getFullYear();
    const data = { day: day, month: month, year: year };
    const sessionid = getCookie("jwt_token");
    // console.log(sessionid);

    setIsLoading(true); // ustawienie stanu ładowania na true

    axios.post('http://localhost:8000/polls/readfromdatabase/', { day, month, year }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionid
      },
      withCredentials: true
    })
      .then(response => {
        // console.log(response.data);
        setResponseData(response.data);

        setTimeout(() => { // wymuszenie minimum czasu ładowania
          setResponseData(response.data);
          setIsLoading(false); // ustawienie stanu ładowania na false
        }, 1000); // czas ładowania w milisekundach
      })
      .catch(error => {
        console.error(error);
        // handle error
      });
  };

  // render calendar 

  return (
    <div className='app'>
      <h1 className='header'>Krematorium "Zieleń"</h1>
      
          <div>
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
              year={year} 
              responseData={responseData} 
              
              handleDateChange={handleDateChange}
              isLoading={isLoading}
              
              setDate={setDate}
              setShowTime={setShowTime}
              getCookie={getCookie}
              setResponseData={setResponseData}
              setIsLoading={setIsLoading} />
          </div>
        
    </div>
     )
}

export default CalendarElement;
