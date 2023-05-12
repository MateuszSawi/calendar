import React, { useState, useEffect, useMemo } from 'react';
import styles from './Times.module.scss';
import Box from './Box/Box';
import Buttons from './Buttons/Buttons';
import AddButton from './Buttons/AddButton';

const times = ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','00:00']

function Times(props) {

  const [event, setEvent] = useState('');
  const [info, setInfo] = useState(false);

  function setTime(time) {
    if (windowVisibility === false) {
      setInfo(true);
      setEvent(time);
    }
  }

  const [windowVisibility, setWindowVisibility] = useState(false);

  const openWindow = () => {
    if (windowVisibility === false) {
      setWindowVisibility(true);
    }
  };

  // data to edit

  // const [name, setName] = useState('');
  // const [surname, setSurname] = useState('');
  // const [weight, setWeight] = useState('');
  // const [family, setFamily] = useState(false);
  // const [religion, setReligion] = useState('wybierz');
  // const [company, setCompany] = useState('wybierz');
  // const [otherInfo, setOtherInfo] = useState('wybierz');

  // const [selectedOptionCompany, setSelectedOptionCompany] = useState('wybierz');


  // API

  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch('/polls/login/')  ///polls//
  //     .then(response => response.json())
  //     .then(data => setData(data))
  //     .catch(error => console.error(error));
  // }, []);

  // RESPONSE DATA

  const responseData = props.responseData;
  
  let addButtonVisibility = true;

  // const [x, setx] = useState(true);

  // console.log(responseData);
  
return (
  <div >
    {windowVisibility && (
      <div className={styles.windowBackground}>
        <div className={styles.window}>
          <Box 
            windowVisibility={windowVisibility} 
            setWindowVisibility={setWindowVisibility} 
            setEvent={setEvent} 
            event={event} 
            date={props.date} 
            fixedDate={props.fixedDate} 
            dayOfTheWeek={props.dayOfTheWeek} 
            day={props.day} 
            month={props.month} 
            year={props.year}

            // setSelectedOptionCompany={setSelectedOptionCompany}
            // selectedOptionCompany={selectedOptionCompany}

            setDate={props.setDate}
            setShowTime={props.setShowTime}
            getCookie={props.getCookie}

            handleDateChange={props.handleDateChange}

            setResponseData={props.setResponseData}
            setIsLoading={props.setIsLoading}
          />
        </div>
      </div>
    )}

    {props.isLoading ? <div>Ładowanie...</div> : (
      <div className="times" >
        {times.map(time => {    
          addButtonVisibility = true;

         

          let isMidnight = false;
          if (time === '00:00') {
            isMidnight = true;
          } else {
            isMidnight = false;
          }
                
          return (
            <div className={styles.container}>
              <div className={styles.timeBoxWrapper}>
                <div className={styles.timeBox}>
                  <div className={styles.leftWrapper}>
                    {!isMidnight && (
                      <span><strong>{time}</strong> {props.dayOfTheWeek} {props.fixedDate}</span>
                    )}
                    {isMidnight && (
                      <span><strong>24:00</strong> {props.dayOfTheWeek} {props.fixedDate}</span>
                    )}
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

                      if (responseDataTime === time) {
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

                            <Buttons 
                              addButtonVisibility={addButtonVisibility}
                              setTime={setTime}
                              openWindow={openWindow}
                              time={time}

                              windowVisibility={windowVisibility} 
                              setWindowVisibility={setWindowVisibility} 
                              setEvent={setEvent} 
                              event={event} 
                              date={props.date} 
                              fixedDate={props.fixedDate} 
                              dayOfTheWeek={props.dayOfTheWeek} 
                              day={props.day} 
                              month={props.month} 
                              year={props.year}
                              userAdding={props.userAdding}

                              setDate={props.setDate}
                              setShowTime={props.setShowTime}
                              getCookie={props.getCookie}
                              setResponseData={props.setResponseData}

                              handleDateChange={props.handleDateChange}

                              responseData={props.responseData} 
                              isLoading={props.isLoading}
                              setIsLoading={props.setIsLoading}
                            />
                          </div>                       
                        )
                      } else {
                        return '';
                      }
                    })
                  )}

                  {addButtonVisibility && (
                    <div className={styles.addButtonWrapper}>
                      <AddButton 
                        addButtonVisibility={addButtonVisibility}
                        setTime={setTime}
                        openWindow={openWindow}
                        time={time}
        
                        windowVisibility={windowVisibility} 
                        setWindowVisibility={setWindowVisibility} 
                        setEvent={setEvent} 
                        event={event} 
                        date={props.date} 
                        fixedDate={props.fixedDate} 
                        dayOfTheWeek={props.dayOfTheWeek} 
                        day={props.day} 
                        month={props.month} 
                        year={props.year}
                        userAdding={props.userAdding}
        
                        setDate={props.setDate}
                        setShowTime={props.setShowTime}
                        getCookie={props.getCookie}
                        setResponseData={props.setResponseData}
        
                        handleDateChange={props.handleDateChange}
        
                        responseData={props.responseData} 
                        isLoading={props.isLoading}
                      />
                    </div>
                  )}

                </div>
              </div>

              {/* <Buttons 
                addButtonVisibility={addButtonVisibility}
                setTime={setTime}
                openWindow={openWindow}
                time={time}

                windowVisibility={windowVisibility} 
                setWindowVisibility={setWindowVisibility} 
                setEvent={setEvent} 
                event={event} 
                date={props.date} 
                fixedDate={props.fixedDate} 
                dayOfTheWeek={props.dayOfTheWeek} 
                day={props.day} 
                month={props.month} 
                year={props.year}
                userAdding={props.userAdding}

                setDate={props.setDate}
                setShowTime={props.setShowTime}
                getCookie={props.getCookie}
                setResponseData={props.setResponseData}

                handleDateChange={props.handleDateChange}

                responseData={props.responseData} 
                isLoading={props.isLoading}
              /> */}
            </div>
          )
        })}
      </div>
    )}
  </div>
  )
}

export default Times;