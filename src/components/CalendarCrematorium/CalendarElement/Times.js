import React, { useState, useEffect, useRef } from 'react';
import styles from './Times.module.scss';
import Box from './Box/Box';
import Buttons from './Buttons/Buttons';
import AddButton from './Buttons/AddButton';
import html2pdf from 'html2pdf.js';

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

  // API

  const [data, setData] = useState([]);

  // RESPONSE DATA

  const responseData = props.responseData;
  
  let addButtonVisibility = true;

  // powiadomienie przed usuń -----------------------------------

  const [notificationVisability, setNotificationVisability] = useState(false);





  





  // ------------------------------------------------------------

  const [isFromEdit, setIsFromEdit] = useState(false);

  // ------------------------------------------------------------

  const filename = `krematorium_${props.day}-${props.month}-${props.year}.pdf`; // Zmienna w nazwie pliku

  const componentRef = useRef(null);

  const handlePrint = () => {
    const element = componentRef.current;
    const opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };
  
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

    {/* <div className={styles.confirmBox}>
      <p>fsf</p>
    </div> */}

    <div>
      {/* Dodaj przycisk do wywołania drukowania */}
      <button className={styles.button} onClick={handlePrint}>Drukuj</button>
    </div>

    <div className={styles.printsection} ref={componentRef}>
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
                        <span><strong>{time}</strong> {props.dayOfTheWeek} {props.fixedDate} - krematorium</span>
                      )}
                      {isMidnight && (
                        <span><strong>24:00</strong> {props.dayOfTheWeek} {props.fixedDate} - krematorium</span>
                      )}
                    </div>
                  </div>

                  <div>
                    {responseData && (
                      responseData.results.map(response => {

                        let responseDataTime = response.time.substring(0, response.time.length - 3);
                        // let responseDataWeight = Math.round(response.weight);

                        // if (response.family === true) {
                        //   response.family = 'tak';
                        // } else if (response.family === false){
                        //   response.family = 'nie';
                        // }

                        // if (response.paid === true) {
                        //   response.paid = 'tak';
                        // } else if (response.paid === false){
                        //   response.paid = 'nie';
                        // }

                        if (responseDataTime === time) {
                          addButtonVisibility = false;

                          let isCompanyOnlySpaces = response.company.trim().length === 0;

                          return (
                            <div className={styles.innerTimeBox}>
                              <div className={styles.responseInfo}>
                                <div className={styles.reservationWrapper}>
                                  <p className={styles.reservationData}>{response.surname} {response.name}</p>
                                  {(response.weight !== '') &&
                                    <p className={styles.reservationData}>{response.weight} kg</p>
                                  }
                                </div>
                                  
                                <div className={styles.reservationWrapper}>
                                  {isCompanyOnlySpaces &&
                                    <p className={styles.reservationData}><strong>REZERWACJA KAPLICY</strong></p>
                                  } 
                                  {!isCompanyOnlySpaces &&
                                    <p className={styles.reservationData}>Firma: {response.company}</p>
                                  } 

                                  {(response.religion !== '') &&
                                    <p className={styles.reservationData}>Wyznanie: {response.religion}</p>
                                  } 
                                  
                                  {(response.dateofdeath !== '--') &&
                                    <p className={styles.reservationData}>Data zgonu: {response.dateofdeath}</p>
                                  }

                                  {(response.cemetery !== '') &&
                                    <p className={styles.reservationData}>Cmentarz: {response.cemetery}</p>
                                  }
                                </div>
                                  
                                <div className={styles.reservationWrapper}>
                                  {(response.otherInfo !== '') &&
                                    <p className={styles.reservationData}>Uwagi: {response.otherInfo}</p>
                                  }
                                </div>

                                <div className={styles.reservationWrapper}>
                                  <p className={styles.whoAdded}>Dodane przez: {response.userAdding}</p>
                                </div>

                                <div className={styles.reservationWrapper}>
                                  {(response.paid === 'tak' && (response.family === 'nie' || response.family === '')) &&
                                    // <p className={styles.reservationData}>Opłacone: <strong>{response.paid}</strong></p>
                                    <p className={styles.reservationData}><strong>Opłacone</strong></p>
                                  }
                                  {((response.paid === 'nie' || response.paid === '') && response.family === 'tak') &&
                                    // <p className={styles.reservationData}>Udział rodziny: <strong>{response.family}</strong></p>
                                    <p className={styles.reservationData}><strong>Udział rodziny</strong></p>
                                  }

                                  {(response.paid === 'tak' && response.family === 'tak') &&
                                    // <p className={styles.reservationData}>Udział rodziny: <strong>{response.family}</strong></p>
                                    <p className={styles.reservationData}><strong>Opłacone, Udział rodziny</strong></p>
                                  }
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
                                authorities={props.authorities}

                                response={response}

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
                          authorities={props.authorities}
          
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
              </div>
            )
          })}
        </div>
      )}
    </div>
  </div>
  )
}

export default Times;