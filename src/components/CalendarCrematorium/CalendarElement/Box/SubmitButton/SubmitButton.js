import React, { useState } from 'react';
import styles from './SubmitButton.module.scss';

function Time(props) {

  // submit form

  const submitForm = () => {
    if (props.name === '' || props.surname === '' || props.weight === '' || props.family === undefined || props.religion === 'wybierz' || props.company === 'wybierz' || props.company === '') {
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
    }
  }

  // message

  const [message, setMessage] = useState('');

  const handleClick = () => {};

  // API POST

  const handleDataSend = () => {
    const data = { 
      // day: day, month: month, year: year 
      exists: 1,
      name: props.name,
      name: props.name,
      surname: props.surname,
      weight: props.weight,
      family: props.family,
      company: props.company,
      religion: props.religion,
      otherInfo: props.otherInfo,
    };
    fetch('/polls/addtodatabase/2/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
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