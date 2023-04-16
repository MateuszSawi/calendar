import React from 'react'
import {useState} from 'react';
import styles from './Times.module.scss';
import Box from './Box/Box';

const times = ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00']

function Times(props) {

  const [event, setEvent] = useState('');
  const [info, setInfo] = useState(false);

  function setTime(e) {
    if (windowVisibility === false) {
      setInfo(true);
      setEvent(e.target.innerText);
    }
  }

  // console.log('====== Times ======');
  // console.log('props', props.fixedDate, '|||||', props);
  // console.log('XDD', event, '|', info);
  // console.log(' ');

  const [windowVisibility, setWindowVisibility] = useState(false);

  const openWindow = () => {
    if (windowVisibility === false) {
      setWindowVisibility(true);
    }
  };

  // filter

  const data = [
    { h: '01:00', name: 'John', age: 25 },
    { h: '05:00', name: 'Jane', age: 30 },
    { h: '20:00', name: 'Bob', age: 35 },
    { h: '13:00', name: 'Alice', age: 40 },
  ];

  const [yearFilter, setYearFilter] = useState('01:00');
  const [monthFilter, setMonthFilter] = useState('');
  const [dayFilter, setDayFilter] = useState('');
  const [hourFilter, setHourFilter] = useState('');

  const handleFilterChange = (event) => {
    setYearFilter(event.target.value);
  };

  const filteredData = data.filter((item) => item.name.toLowerCase().includes(yearFilter));

  const elementArray = filteredData.map((item) => (
    <div key={item.id}>
      <p>Name: {item.name}</p>
      <p>Age: {item.age}</p>
    </div>
  ));
  
return (
  <>
    <p>
      <span>Wybrany dzień : </span>{event}
    </p>
 
    {windowVisibility && (
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
    )}

    <div className="times">
      {times.map(time => {
        return (
          <div className={styles.timeBox}>
            <span><strong>{time}</strong> {props.dayOfTheWeek} {props.fixedDate}</span>

            {elementArray}

            <button onClick={(e)=> {
              setTime(e);
              openWindow();
            }}> {time} </button>
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