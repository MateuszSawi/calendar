import React, { useState, useEffect, useMemo } from 'react';
import styles from './Times.module.scss';
import Box from './Box/Box';
import { useSelector } from 'react-redux';

const times = ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00']

function Times(props) {

  const [event, setEvent] = useState('');
  const [info, setInfo] = useState(false);

  function setTime(time) {
    if (windowVisibility === false) {
      setInfo(true);
      // setEvent(e.target.innerText);
      setEvent(time);
    }
  }

  const [windowVisibility, setWindowVisibility] = useState(false);

  const openWindow = () => {
    if (windowVisibility === false) {
      setWindowVisibility(true);
    }
  };

  // API

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/polls//')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  // RESPONSE DATA

  const responseData = props.responseData;

  // if (responseData) {
  //   for (let singleResponseData of responseData.results) {
  //     let responseDataTime = singleResponseData.time;
  //     responseDataTime = responseDataTime.substring(0, responseDataTime.length - 3);
  //   }
  // }

  // reload calendar
  
  
  let addButtonVisibility = true;

  // setAddButtonVisibility(false);

  
return (
  <div >
    {windowVisibility && (
      <div className={styles.windowBackground}>
        <div className={styles.window}>
          <Box windowVisibility={windowVisibility} 
            setWindowVisibility={setWindowVisibility} 
            setEvent={setEvent} 
            event={event} 
            date={props.date} 
            fixedDate={props.fixedDate} 
            dayOfTheWeek={props.dayOfTheWeek} 
            day={props.day} 
            month={props.month} 
            year={props.year}

            setDate={props.setDate}
            setShowTime={props.setShowTime}
            getCookie={props.getCookie}
            setResponseData={props.setResponseData}

            handleDateChange={props.handleDateChange}
          />
        </div>
      </div>
    )}

    {props.isLoading ? <div>Ładowanie...</div> : (
      <div className="times" >
        {times.map(time => {    

          addButtonVisibility = true;
                
          return (
            <div className={styles.container}>
              <div className={styles.timeBoxWrapper}>
                <div className={styles.timeBox}>
                  <div className={styles.leftWrapper}>
                    <span><strong>{time}</strong> {props.dayOfTheWeek} {props.fixedDate}</span>
                  </div>
                </div>

                <div>
                  {responseData && (
                    responseData.results.map(response => {
                      let responseDataTime = response.time.substring(0, response.time.length - 3);
                      let responseDataWeight = Math.round(response.weight);

                      if (response.family === true) {
                        response.family = 'tak';
                      } else if (response.family === false){
                        response.family = 'nie';
                      }

                      if(responseDataTime === time) {

                        addButtonVisibility = false;

                        return (
                          <div className={styles.innerTimeBox}>
                            <div className={styles.responseInfo}>
                              <div className={styles.reservationWrapper}>
                                <p className={styles.reservationData}>{response.name} {response.surname}</p>
                                <p className={styles.reservationData}>{responseDataWeight} kg</p>
                              </div>
                                
                              <div className={styles.reservationWrapper}>
                                <p className={styles.reservationData}>Udział rodziny: {response.family}</p>
                                <p className={styles.reservationData}>Wyznanie: {response.religion}</p>
                                <p className={styles.reservationData}>Firma: {response.company}</p>
                              </div>
                                
                              <div className={styles.reservationWrapper}>
                                <p className={styles.reservationData}>Uwagi: {response.otherInfo}</p>
                              </div>

                              <div className={styles.reservationWrapper}>
                                <p className={styles.reservationData}>Dodane przez: {response.userAdding}</p>
                              </div>
                            </div>  

                            {/* <div className={styles.responseInfoButtons}>
                              <button>
                                EDYTUJ
                              </button>

                              <button>
                                USUŃ
                              </button>
                            </div>  */}
                          </div>                       
                        )
                      } else {
                        return '';
                      }
                    })
                  )}
                </div>
              </div>

              <div className={styles.buttonsWrapper}>
                {addButtonVisibility && (
                  <button onClick={() => {
                    setTime(time);
                    openWindow();
                  }}> DODAJ </button>
                )} 

                {!addButtonVisibility && (
                  <div className={styles.responseInfoButtons}>
                  <button>
                    EDYTUJ
                  </button>

                  <button>
                    USUŃ
                  </button>
                </div>
                )} 
              </div>


              {/* <div className={styles.rightWrapper}>
                {!responseData && (
                  <button onClick={()=> {
                    setTime(time);
                    openWindow();
                  }}> DODAJ </button>
                )} 
              </div> */}
            </div>
          )
        })}
      </div>
    )}
  </div>
  )
}

export default Times;