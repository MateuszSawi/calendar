import React, { useState, useEffect, useMemo } from 'react';
import styles from './TimesCemetery.module.scss';
import BoxCemetery from './BoxCemetery/BoxCemetery';
import ButtonsCemetery from './ButtonsCemetery/ButtonsCemetery';
import AddButtonCemetery from './ButtonsCemetery/AddButtonCemetery';
// import NotificationDeleteButton from './NotificationDeleteButton/NotificationDeleteButton'

const timesCemetery = [
    '07:00','07:15','07:30','07:45',
    '08:00','08:15','08:30','08:45',
    '09:00','09:15','09:30','09:45',
    '10:00','10:15','10:30','10:45',
    '11:00','11:15','11:30','11:45',
    '12:00','12:15','12:30','12:45',
    '13:00','13:15','13:30','13:45',
    '14:00','14:15','14:30','14:45',
    '15:00','15:15','15:30','15:45',
    '16:00','16:15','16:30','16:45'
  ];

function TimesCemetery(props) {

  // const [times, setTimes] = useState([
  //   '07:00','07:15','07:30','07:45',
  //   '08:00','08:15','08:30','08:45',
  //   '09:00','09:15','08:30','08:45',
  //   '10:00','10:15','10:30','10:45',
  //   '11:00','11:15','11:30','11:45',
  //   '12:00','12:15','12:30','12:45',
  //   '13:00','13:15','13:30','13:45',
  //   '14:00','14:15','14:30','14:45',
  //   '15:00','15:15','15:30','15:45',
  //   '16:00','16:15','16:30','16:45'
  // ]);

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

  // API

  const [data, setData] = useState([]);

  // RESPONSE DATA

  const responseData = props.responseData;
  
  let addButtonVisibility = true;

  // powiadomienie przed usuń

  // const [notificationVisability, setNotificationVisability] = useState(false);
  const [isFromEdit, setIsFromEdit] = useState(false);

  // TIMES

  // if(props.responseData){
  //   for (let result of props.responseData.results) {
  //     let timeFromResponse = result.time.toString();
  //     let finalTimeFromResponse = timeFromResponse.substring(0, timeFromResponse.length - 3);
  //     // console.log(finalTimeFromResponse);

  //     setTimes([...times, finalTimeFromResponse])


  //   }
  // }

  // console.log(times);

return (
  <div >
    {windowVisibility && (
      <div className={styles.windowBackground}>
        <div className={styles.window}>
          <BoxCemetery 
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

            cemetery={props.cemetery}

            // setSelectedOptionCompany={setSelectedOptionCompany}
            // selectedOptionCompany={selectedOptionCompany}
            // name={name}
            // setName={setName}

            isFromEdit={isFromEdit}
            setIsFromEdit={setIsFromEdit}

            setDate={props.setDate}
            setShowTime={props.setShowTime}
            getCookie={props.getCookie}

            handleDateChange={props.handleDateChange}

            responseData={props.responseData}
            setResponseData={props.setResponseData}
            setIsLoading={props.setIsLoading}
          />
        </div>
      </div>
    )}

    {props.isLoading ? <div>Ładowanie...</div> : (
      <div className="times" >
        {timesCemetery.map(time => {    
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
                      // let responseDataWeight = Math.round(response.weight);

                      if (response.trumpet === true) {
                        response.trumpet = 'tak';
                      } else if (response.trumpet === false){
                        response.trumpet = 'nie';
                      }

                      if (response.orchestra === true) {
                        response.orchestra = 'tak';
                      } else if (response.orchestra === false){
                        response.orchestra = 'nie';
                      }

                      if (responseDataTime === time) {
                        addButtonVisibility = false;

                        return (
                          <div className={styles.innerTimeBox}>
                            <div className={styles.responseInfo}>
                              <div className={styles.reservationWrapper}>
                                <p className={styles.reservationData}>{response.name} {response.surname}</p>
                              </div>

                              <div className={styles.reservationWrapper}>
                                <p className={styles.reservationData}>Firma: {response.company}</p>
                                <p className={styles.reservationData}>Miejsce wyjścia: {response.placeofentry}</p>
                              </div>

                              <div className={styles.reservationWrapper}>
                                <p className={styles.reservationData}>Miejsce pochówku: {response.burialplace}</p>
                                <p className={styles.reservationData}>Rodzaj pochówku: {response.burialtype}</p>
                              </div>

                              <div className={styles.reservationWrapper}>
                                <p className={styles.reservationData}>trąbka: {response.trumpet}</p>
                                <p className={styles.reservationData}>organista: {response.orchestra}</p>
                              </div>

                              <div className={styles.reservationWrapper}>
                                <p className={styles.reservationData}>Opis usługi: {response.servicedescription}</p>
                              </div>
                                
                              <div className={styles.reservationWrapper}>
                                <p className={styles.reservationData}>Uwagi: {response.others}</p>
                              </div>

                              <div className={styles.reservationWrapper}>
                                <p className={styles.reservationData}>Dodane przez: {response.userAdding}</p>
                              </div>
                            </div>  

                            <ButtonsCemetery
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

                              cemetery={props.cemetery}

                              setDate={props.setDate}
                              setShowTime={props.setShowTime}
                              getCookie={props.getCookie}
                              setResponseData={props.setResponseData}

                              handleDateChange={props.handleDateChange}
                              // setNotificationVisability={setNotificationVisability}
                              // notificationVisability={notificationVisability}

                              // deleteConfirm={deleteConfirm}
                              // setDeleteConfirm={setDeleteConfirm}

                              isFromEdit={isFromEdit}
                              setIsFromEdit={setIsFromEdit}

                              responseData={props.responseData} 
                              isLoading={props.isLoading}
                              setIsLoading={props.setIsLoading}
                            />

                            {/* {notificationVisability && (
                              // klasa times żeby dodały sie style przyciskow
                              <div className={styles.notificationBackground}>
                                <div className={styles.notificationWrapper}>
                                  <div className={styles.notificationBar}>
                                    <button className={styles.closeWindowButton} onClick={() => {
                                        setNotificationVisability(false);
                                      }}>X
                                    </button>
                                  </div>

                                  <div className="times" > 
                                    <div className={styles.notificationBox}>
                                      <p>Czy napewno usunąć rezerwację?</p>

                                      <button 
                                        onClick={() => {
                                          setDeleteConfirm(true);
                                        }}> USUŃ 
                                      </button>

                                      // {/* <NotificationDeleteButton 
                                      //   addButtonVisibility={addButtonVisibility}
                                      //   setTime={setTime}
                                      //   openWindow={openWindow}
                                      //   time={time}

                                      //   windowVisibility={windowVisibility} 
                                      //   setWindowVisibility={setWindowVisibility} 
                                      //   setEvent={setEvent} 
                                      //   event={event} 
                                      //   date={props.date} 
                                      //   fixedDate={props.fixedDate} 
                                      //   dayOfTheWeek={props.dayOfTheWeek} 
                                      //   day={props.day} 
                                      //   month={props.month} 
                                      //   year={props.year}
                                      //   userAdding={props.userAdding}

                                      //   setDate={props.setDate}
                                      //   setShowTime={props.setShowTime}
                                      //   getCookie={props.getCookie}
                                      //   setResponseData={props.setResponseData}

                                      //   handleDateChange={props.handleDateChange}
                                      //   setNotificationVisability={setNotificationVisability}

                                      //   responseData={props.responseData} 
                                      //   isLoading={props.isLoading}
                                      //   setIsLoading={props.setIsLoading}
                                      // />                 
                                    </div>
                                  </div>

                                  <div className={styles.notificationBar}>

                                  </div>
                                </div>
                              </div>
                            )} */}
                          </div>                       
                        )
                      } else {
                        return '';
                      }
                    })
                  )}

                  {addButtonVisibility && (
                    <div className={styles.addButtonWrapper}>
                      <AddButtonCemetery 
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

                        cemetery={props.cemetery}

                        setIsFromEdit={setIsFromEdit}
        
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

export default TimesCemetery;