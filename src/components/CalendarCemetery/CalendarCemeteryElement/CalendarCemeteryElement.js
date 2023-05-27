import React, { useState, useEffect } from "react";
import moment from 'moment';
import Calendar from 'react-calendar';
import './CalendarCemeteryElement.css';
import TimeCemetery from './TimeCemetery';
import axios from 'axios';
import Cemeteries from './Cemeteries/Cemeteries';

function CalendarCemeteryElement() {
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

  // ------- cemetery -------

  // let cemetery;
  const [cemetery, setCemetery] = useState('lostowicki');

  // console.log(cemetery);

  // ------------ API ------------

  const handleDateChange = (date) => {

    // setTimes([]);

    setDate(date);
    setShowTime(true);
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
    const year = date.getFullYear();
    const data = { day: day, month: month, year: year, cemetery: cemetery };
    const sessionid = getCookie("jwt_token");
    // console.log(sessionid);

    setIsLoading(true); // ustawienie stanu ładowania na true

    axios.post('http://localhost:8000/polls/readcemetery/', { day, month, year, cemetery }, {
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
          // setIsLoading(false); // ustawienie stanu ładowania na false
        }, 1000); // czas ładowania w milisekundach

        setTimeout(() => { // TEGO NIE
          setIsLoading(false); // ustawienie stanu ładowania na false
        }, 2000);
      })
      .catch(error => {
        console.error(error);
        // handle error
      });
  };

  return (
    <div className='app'>
      {/* <h1 className='header'>Krematorium "Zieleń"</h1> */}

      <Cemeteries 
        cemetery={cemetery}
        setCemetery={setCemetery}
        handleDateChange={handleDateChange}
        date={date}

        setDate={setDate}
        setShowTime={setShowTime}
        getCookie={getCookie}
        setIsLoading={setIsLoading}
        setResponseData={setResponseData}
      />

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
  
        <TimeCemetery showTime={showTime} 
          date={date} 
          fixedDate={fixedDate} 
          dayOfTheWeek={dayOfTheWeek} 
          day={day} 
          month={month} 
          year={year} 
          responseData={responseData} 
          
          handleDateChange={handleDateChange}
          isLoading={isLoading}
          
          cemetery={cemetery}
          setDate={setDate}
          setShowTime={setShowTime}
          getCookie={getCookie}
          setResponseData={setResponseData}
          setIsLoading={setIsLoading} />
      </div>
    </div>
     )
}

export default CalendarCemeteryElement;
