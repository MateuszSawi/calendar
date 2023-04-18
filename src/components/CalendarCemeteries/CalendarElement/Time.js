import Times from './Times.js';
import React from 'react';
import styles from './Time.module.scss'

function Time(props) {
 
  return (
  <div className={styles.container}>
    {props.showTime ? <Times 
      date={props.date} 
      fixedDate={props.fixedDate} 
      dayOfTheWeek={props.dayOfTheWeek} 
      day={props.day} 
      month={props.month} 
      year={props.year} /> : null}
  </div>
  )
}

export default Time;