import React, { useState, useEffect } from 'react';
import styles from './Times.module.scss';
import Box from './Box/Box';
import { useSelector } from 'react-redux';

const times = ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00']

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

  // <div>
  //   <h1>Posts:</h1>
  //   <ul>
  //     {data.map(post => (
  //       <li key={post.id}>{post.title}</li>
  //     ))}
  //   </ul>
  // </div>
  
return (
  <>
    <p>
      <span>Wybrany dzień : </span>{event}
    </p>
 
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
          />
        </div>
      </div>
    )}

    <div className="times">
      {times.map(time => {
        return (
          <div className={styles.timeBox}>
            <div className={styles.leftWrapper}>
              <span><strong>{time}</strong> {props.dayOfTheWeek} {props.fixedDate}</span>

              <div>
                <p>

                </p>
              </div>
            </div>

            <div className={styles.rightWrapper}>
              <button onClick={()=> {
                setTime(time);
                openWindow();
              }}> DODAJ </button>
            </div>
          </div>
        )
      })}
      {/* <div>
        {info ? `Your appointment is set to ${event} | ${props.date.toDateString()}` : null}
      </div> */}
    </div>
  </>
  )
}

export default Times;