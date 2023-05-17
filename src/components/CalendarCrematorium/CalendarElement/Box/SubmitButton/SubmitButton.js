import React, { useState } from 'react';
import styles from './SubmitButton.module.scss';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SubmitButton(props) {

  // console.log(props);

  const handleDateChange = (date) => {
  props.setDate(date);
  props.setShowTime(true);
  const day = date.getDate();
  const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
  const year = date.getFullYear();
  const data = { day: day, month: month, year: year };
  const sessionid = props.getCookie("jwt_token");

  props.setIsLoading(true); // ustawienie stanu ładowania na true

  axios.post('http://localhost:8000/polls/readfromdatabase/', { day, month, year }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sessionid
    },
    withCredentials: true
  })
    .then(response => {

      // console.log('sdf')
      props.setResponseData(response.data);

      setTimeout(() => { // wymuszenie minimum czasu ładowania
        props.setResponseData(response.data);
        // props.setIsLoading(false); // ustawienie stanu ładowania na false
      }, 1000); // czas ładowania w milisekundach

      setTimeout(() => { // wymuszenie minimum czasu ładowania
        // props.setResponseData(response.data);
        props.setIsLoading(false); // ustawienie stanu ładowania na false
      }, 2000); // czas ładowania w milisekundach
    })
    .catch(error => {
      console.error(error);
    });
  };

  const submitForm = (time) => {
    if (!props.company || props.company === 'wybierz' || props.company === '') {
      setMessage('Błędne wypełnienie!');
      handleClick();
    } else {
      // if (!props.name) {
      //   props.name = '';
      // }


      setMessage('');
      handleClick();
      const weightToSend = props.weight ? props.weight : 0;
      const familyToSend = props.family ? props.family : false;
      handleDataSend(weightToSend, familyToSend);

      if (props.windowVisibility === true) {
        props.setWindowVisibility(false);
        props.setEvent('');
      }

      handleDateChange(props.date);
      // console.log('0');

      setTimeout(() => { // wymuszenie minimum czasu ładowania
        handleDateChange(props.date);
        // console.log('1');
      }, 2000);
    }
    // console.log(props.name,
    //   props.surname, ' | ',
    // //  weightToSend,' | ',
    //   props.family,' | ',
    //   props.company,' | ',
    //   props.religion,' | ',
    //   props.otherInfo,' | ',
    //   props.time,' | ',
    //   props.date,' | ',
    //   props.day,' | ',
    //    props.month,' | ',
    //   props.year,);
  }

  // message

  const [message, setMessage] = useState('');

  const handleClick = () => {};

  // API POST

  const [loading, setLoading] = useState(true);

  // console.log(props.family)

  const handleDataSend = (weightToSend, familyToSend) => {
    const data = { 
      exists: "2",
      name: props.name,
      surname: props.surname,
      weight: weightToSend,
      family: familyToSend,
      company: props.company,
      religion: props.religion,
      otherInfo: props.otherInfo,
      time: props.time,
      date: props.date,
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
      // console.log('xxx',response.data);
      
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
            props.setIsFromEdit(false);
            submitForm(props.time);
            // handleDataSend();
          }} 
        >Rezerwuj</button>
      </div>

      {message && <div className={styles.message}>{message}</div>}
    </div>
  )
}

export default SubmitButton;