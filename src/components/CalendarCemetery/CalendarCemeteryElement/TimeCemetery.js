import TimesCemetery from './TimesCemetery.js';
import React from 'react';
import styles from './TimeCemetery.module.scss'

function TimeCemetery(props) {
 
  return (
    <div className={styles.container}>
      {props.showTime ? <TimesCemetery 
        date={props.date} 
        fixedDate={props.fixedDate} 
        dayOfTheWeek={props.dayOfTheWeek} 
        day={props.day} 
        month={props.month} 
        year={props.year}
        responseData={props.responseData} 

        handleDateChange={props.handleDateChange}
        isLoading={props.isLoading}
        
        setDate={props.setDate}
        setShowTime={props.setShowTime}
        getCookie={props.getCookie}
        setResponseData={props.setResponseData}
        setIsLoading={props.setIsLoading}
      /> : null}
    </div>
  )
}

export default TimeCemetery;