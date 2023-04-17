import React from 'react'
import {useState} from 'react';
import styles from './Times.module.scss';
import Box from './Box/Box';
import { useSelector } from 'react-redux';

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

  const [windowVisibility, setWindowVisibility] = useState(false);

  const openWindow = () => {
    if (windowVisibility === false) {
      setWindowVisibility(true);
    }
  };

  // filter

  // const datta = [
  //   { h: '01:00', name: 'John', age: 25 },
  //   { h: '05:00', name: 'Jane', age: 30 },
  //   { h: '20:00', name: 'Bob', age: 35 },
  //   { h: '13:00', name: 'Alice', age: 40 },
  // ];

  // // const data = useSelector((state) => state.data.crematorium);

  // const [yearFilter, setYearFilter] = useState('');
  // const [monthFilter, setMonthFilter] = useState('');
  // const [dayFilter, setDayFilter] = useState('');
  // const [hourFilter, setHourFilter] = useState('');

  // const handleFilterChange = (event) => {
  //   setYearFilter(event.target.value);
  // };

  // const filteredData = datta.filter((item) => item.name.toLowerCase().includes(yearFilter));

  // const elementArray = filteredData.map((item) => (
  //   <div key={item.id}>
  //     <p>Name: {item.name}</p>
  //     <p>Age: {item.age}</p>
  //   </div>
  // ));

  // // ===================== //

  // const data = useSelector((state) => state.data.crematorium);

  // const [reservations, setReservations] = useState(data);

  // // console.log('year: ', props.year, '|', 'month: ', props.month, '|','day: ', props.day, '|','time: ', props.event);
  // console.log('DATA: ', data);

  // if(yearFilter !== '' && monthFilter !== '' && dayFilter !== '' && hourFilter !== '') {
  //   // console.log(data.yearFilter.monthFilter.dayFilter.hourFilter);
  //   console.log('Filters: ', yearFilter, monthFilter, dayFilter, hourFilter);
  //   let fixedYear = yearFilter.toString();

  //   console.log('Filters: ', fixedYear, monthFilter, dayFilter, hourFilter);
  //   console.log(data.fixedYear);
  // }
  

  // for (let year in data) {
  //   if (year === '2023'){
  //     console.log(year);
  //     for(let month in year) {
  //       console.log(month);
  //     }
  //   }
  // }

  // console.log('====== Times ======');
  // console.log('year: ', props.year, '|', 'month: ', props.month, '|','day: ', props.day, '|','time: ', times);
  // console.log(' ');

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();



  // const dateTimeObject = { year, month, day, hour };
  // const dateTimeObject = { year, month, props.day, event };
  // console.log(year, month, day, hour)
  console.log(dateTimeObject); // { year: 2023, month: 4, day: 17, hour: 10 }
  
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
            <span><strong>{time}</strong> {props.dayOfTheWeek} {props.fixedDate}</span>

            {/* {elementArray} */}

            <button onClick={(e)=> {
              // setYearFilter(props.year);
              // setMonthFilter(props.month);
              // setDayFilter(props.day);
              // setHourFilter(time);
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