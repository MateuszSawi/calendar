import React, { useState } from 'react';
import styles from './SubmitButton.module.scss';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Time(props) {

  // submit form

  const submitForm = () => {
    if (
        props.name === '' || props.surname === '' || props.weight === '' || props.family === undefined || 
        props.religion === 'wybierz' || 
        props.company === 'wybierz' || props.company === '') {
      setMessage('Błędne wypełnienie!');
      handleClick();
    } else {
      setMessage('');
      handleClick();
      handleDataSend();
      if (props.windowVisibility === true) {
        props.setWindowVisibility(false);
        props.setEvent('');
      }

      props.handleDateChange(props.date);
    }
  }

  // message

  const [message, setMessage] = useState('');

  const handleClick = () => {};

  // API POST

  const handleDataSend = () => {
    const data = { 
      exists: "1",
      name: props.name,
      surname: props.surname,
      weight: props.weight,
      family: props.family,
      company: props.company,
      religion: props.religion,
      otherInfo: props.otherInfo,
      time: props.time,
      day: props.day,
      month: props.month,
      year: props.year,
    };
    axios.post('http://localhost:8000/polls/addtodatabase/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(response => {
      console.log(response.data);
      // do something with response data
    })
    .catch(error => {
      console.error(error);
      // handle error
    });
  };
 
  return (
    <div className={styles.submitWrapper}>
      <div className={styles.submitButtonDiv}>
        <button className={styles.submitButton} 
          onClick={() => {
            submitForm();
            // handleDataSend();
          }} 
        >Rezerwuj</button>
      </div>

      {message && <div className={styles.message}>{message}</div>}
    </div>
  )
}

export default Time;