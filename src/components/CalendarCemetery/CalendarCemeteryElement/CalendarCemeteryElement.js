import React, { useState, useEffect } from "react";
import moment from 'moment';
import Calendar from 'react-calendar';
import './CalendarCemeteryElement.css';
import TimeCemetery from './TimeCemetery';
import axios from 'axios';
// import Cemeteries from './Cemeteries/Cemeteries';
import styles from './Cemeteries/Cemeteries.module.scss'

function CalendarCemeteryElement(props) {
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
  const [cemeteryToDisplay, setCemeteryToDisplay] = useState('Łostowicki');
  const [selectedOptionCemetery, setSelectedOptionCemetery] = useState(cemeteryToDisplay);
  const [isOpenCemetery, setIsOpenCemetery] = useState(false);

  // const cemeteriesToDisplay = [
  //   'lostowicki',
  //   'centralny',
  //   'sobieszewo',
  //   'ignacego',
  //   'salvator',
  //   'garnizonowy',
  //   'oliwa',
  //   'nowyport',
  // ];

  const cemeteriesToDisplay = [
    'Łostowicki',
    'Centralny',
    'Sobieszewo',
    'Ignacego',
    'Salvator',
    'Garnizonowy',
    'Oliwa',
    'Nowy Port',
  ];

  if(cemetery === 'Łostowicki') {
    setCemetery('lostowicki');
    setCemeteryToDisplay('Łostowicki');
  
  } else if(cemetery === 'Centralny') {
    setCemetery('centralny');
    setCemeteryToDisplay('Centralny');

  } else if(cemetery === 'Sobieszewo') {
    setCemetery('sobieszewo');
    setCemeteryToDisplay('Sobieszewo');

  } else if(cemetery === 'Ignacego') {
    setCemetery('ignacego');
    setCemeteryToDisplay('Ignacego');

  } else if(cemetery === 'Salvator') {
    setCemetery('salvator');
    setCemeteryToDisplay('Salvator');

  } else if(cemetery === 'Garnizonowy') {
    setCemetery('garnizonowy');
    setCemeteryToDisplay('Garnizonowy');

  } else if(cemetery === 'Oliwa') {
    setCemetery('oliwa');
    setCemeteryToDisplay('Oliwa');

  } else if(cemetery === 'Nowy Port') {
    setCemetery('nowyport');
    setCemeteryToDisplay('Nowy Port');

  }

  const toggleMenuCemeteries = () => {
    setIsOpenCemetery(!isOpenCemetery);
  };

  const handleOptionClickPlaceofentry = (option) => {
    setIsOpenCemetery(false);
    setSelectedOptionCemetery(option);
    setCemetery(option);
  };

  // ------------ API ------------

  const handleDateChange = (date) => {
    setDate(date);
    setShowTime(true);
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
    const year = date.getFullYear();
    // const cemeteryToSend = cemetery;
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
        console.error(error); // handle error
      });
  };
  
  useEffect(() => {
    handleDateChange(date);
  }, [cemetery]);

  return (
    <div className='app'>

      <div className={styles.infoBox}>
      <h1 className='header'>Cmentarz :&nbsp;</h1>
      <button onClick={toggleMenuCemeteries} className={styles.optionButton}><h1 className={styles.cemeteryTitle}>{cemeteryToDisplay}</h1></button>
      {isOpenCemetery && (
        <div className={styles.toggleMenuCompany}>
          {cemeteriesToDisplay.map(singleCemetery => {
            return (
              <div onClick={() => handleOptionClickPlaceofentry(singleCemetery)} className={styles.companyButtonWrapper}>
                <button className={styles.companyButton}>
                  <p className={styles.companyNameOnButton}>
                    {selectedOptionCemetery === singleCemetery ? <strong>{singleCemetery}</strong> : singleCemetery}
                  </p>
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div> 

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
        authorities={props.authorities}
        
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
