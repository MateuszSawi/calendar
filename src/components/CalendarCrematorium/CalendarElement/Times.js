import React from 'react'
import {useState} from 'react';
import moment from 'moment';
import styles from './Times.module.scss';
import Box from './Box/Box';

const time = ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00']

function Times(props) {

  const [event, setEvent] = useState('01:00');
  const [info, setInfo] = useState(false);



  function displayInfo(e) {
    setInfo(true);
    setEvent(e.target.innerText);
  }

  console.log('====== Times ======');
  console.log('props', props.fixedDate, '|||||', props);
  console.log('XDD', event, '|', info);
  console.log(' ');

  const [windowVisibility, setWindowVisibility] = useState(false);

  const openWindow = () => {
    // setWindowVisibility(!windowVisibility);
    if (windowVisibility === false) {
      setWindowVisibility(true);
      console.log(windowVisibility);
    }
  };

return (
  <>
    <p>
      <span>Wybrany dzień : </span>{event}
    </p>
 
    <div className={styles.window}>
      <Box windowVisibility={windowVisibility} setWindowVisibility={setWindowVisibility} />
    </div>

    <div className="times">
      {time.map(times => {
        return (
          <div className={styles.timeBox}>
            <span>{times} {props.dayOfTheWeek} {props.fixedDate}</span>

            <button onClick={(e)=> {
              displayInfo(e);
              openWindow();
            }}> {times} </button>

            {/* <button className={isActive ? 'your_className': null} onClick={toggleClass}>
              korpo szczur krasny
            </button> */}

            {/* <form>
              <label className={styles.label}>
                <input className={styles.input} mbsc-input data-label="First name" type="text" placeholder="First Name" />
              </label>
            </form> */}
          </div>
      )
    })}

      <div>
        {info ? `Your appointment is set to ${event} | ${props.date.toDateString()}` : null}
      </div>
    </div>
  </>
  )
}

export default Times;