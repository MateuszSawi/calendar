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
        authorities={props.authorities}

        readTextArea={props.readTextArea}
        setIsLoadingTextArea={props.setIsLoadingTextArea}
        isLoadingTextArea={props.isLoadingTextArea}


        handleDateChange={props.handleDateChange}
        isLoading={props.isLoading}

        setTextArea={props.setTextArea}
        textArea={props.textArea}
        
        cemetery={props.cemetery}
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