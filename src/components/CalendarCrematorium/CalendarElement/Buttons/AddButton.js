import styles from './Buttons.module.scss';
import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';

function AddButton(props) {

  // DODAJ

  const addButtonClick = (time) => {
    handleDataSend();

    if (props.windowVisibility === true) {
      props.setWindowVisibility(false);
      props.setEvent('');
    }

    handleDateChangeOnAdd(props.date);
    // console.log('0');

    setTimeout(() => { // wymuszenie minimum czasu ładowania
      handleDateChangeOnAdd(props.date);
      // console.log('1');
    }, 2000);
  }

  const handleDataSend = () => {
    const data = { 
      exists: "1",
      name: '',
      surname: '',
      weight: 0,
      family: '',
      company: '',
      religion: '',
      otherInfo: '',
      time: props.time,
      date: props.date,
      day: props.day,
      month: props.month,
      year: props.year,
    };
    axios.post('/polls/addtodatabase/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(response => { 
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleDateChangeOnAdd = (date) => {
    props.setDate(date);
    props.setShowTime(true);
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
    const year = date.getFullYear();
    const data = { day: day, month: month, year: year };
    const sessionid = props.getCookie("jwt_token");
  
    // props.setIsLoading(true); // ustawienie stanu ładowania na true
  
    axios.post('/polls/readfromdatabase/', { day, month, year }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionid
      },
      withCredentials: true
    })
    .then(response => {
      props.setResponseData(response.data);

      setTimeout(() => { // wymuszenie minimum czasu ładowania
        props.setResponseData(response.data);
      }, 2000); // czas ładowania w milisekundach
    })
    .catch(error => {
      console.error(error);
    });
  };

  ////////////////////////////////

  const handleDateChangeOnAddButtonClicked = (date) => {
    props.setDate(date);
    props.setShowTime(true);
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
    const year = date.getFullYear();
    const data = { day: day, month: month, year: year };
    const sessionid = props.getCookie("jwt_token");
  
    // props.setIsLoading(true); // ustawienie stanu ładowania na true
  
    axios.post('/polls/readfromdatabase/', { day, month, year }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionid
      },
      withCredentials: true
    })
    .then(response => {
      props.setResponseData(response.data);

      for (let item of response.data.results) {
        let preparedTime = item.time.slice(0, -3);
        // console.log(item)
        // console.log(preparedTime)
        // console.log(props.time)

        if (preparedTime === props.time){
          alreadyReserved = true;
        }
      }

      setTimeout(() => { // wymuszenie minimum czasu ładowania
        if (alreadyReserved === false) {
          props.setIsFromEdit(false);
          addButtonClick(props.time);
          props.setTime(props.time);
          props.openWindow();
        }
      }, 1000);
    })
    .catch(error => {
      console.error(error);
    });
  };

  let alreadyReserved = false;

  //

  const submitAddButtonClicked = () => {
    alreadyReserved = false;
    handleDateChangeOnAddButtonClicked(props.date);
  }
 
  return (
    <div className={styles.addButtonWrapper}>
      {props.authorities === 3 || props.authorities === 2 ? (
        <button onClick={() => {
          submitAddButtonClicked();
        }} >DODAJ
        </button>
      ) : null}
    </div>
  )
}

export default AddButton;