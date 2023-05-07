import React, { useState } from 'react';
import styles from './SubmitButton.module.scss';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SubmitButton(props) {

  // const [isLoading, setIsLoading] = useState(false);
  // const [responseData, setResponseData] = useState(null);

  // console.log(props)

  // const handleDateChange = (date, time) => {
  //   props.setDate(date);
  //   props.setShowTime(true);
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
  //   const year = date.getFullYear();
  //   const data = { day: day, month: month, year: year };
  //   const sessionid = props.getCookie("jwt_token");
  
  //   props.setIsLoading(true); // ustawienie stanu ładowania na true
  
  //   const fetchFromDatabase = () => {
  //     axios
  //       .post(
  //         'http://localhost:8000/polls/readfromdatabase/',
  //         { day, month, year },
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: sessionid,
  //           },
  //           withCredentials: true,
  //         }
  //       )
  //       .then(response => {
  //         const results = response.data;
  //         const resultTimes = results.map(result =>
  //           result.time.substring(0, result.time.length - 3)
  //         );
  
  //         if (resultTimes.includes(time)) {
  //           props.setResponseData(response.data);
  //           props.setIsLoading(false); // ustawienie stanu ładowania na false
  //         } else {
  //           setTimeout(fetchFromDatabase, 1000); // Ponowne wywołanie funkcji fetchFromDatabase po 1 sekundzie
  //         }
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   };
  
  //   fetchFromDatabase();
  // };

  
  const handleDateChange = (date) => {
    props.setDate(date);
    props.setShowTime(true);
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
    const year = date.getFullYear();
    const data = { day: day, month: month, year: year };
    const sessionid = props.getCookie("jwt_token");
    // console.log(sessionid);

    props.setIsLoading(true); // ustawienie stanu ładowania na true

    axios.post('/polls/readfromdatabase/', { day, month, year }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionid
      },
      withCredentials: true
    })
      .then(response => {
        // console.log(response.data);
        props.setResponseData(response.data);

        setTimeout(() => { // wymuszenie minimum czasu ładowania
          props.setResponseData(response.data);
          props.setIsLoading(false); // ustawienie stanu ładowania na false
        }, 2000); // czas ładowania w milisekundach
      })
      .catch(error => {
        console.error(error);
        // handle error
      });
  };
  
  

  // submit form

  // const waitTwoSeconds = () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, 2000);
  //   });
  // };
  

  const submitForm = (time) => {
    if (
        // props.name === '' || props.surname === '' || props.weight === '' || props.family === undefined || 
        // props.religion === 'wybierz' || 
        props.company === 'wybierz' || props.company === '') {
      setMessage('Błędne wypełnienie!');
      handleClick();
    } else {
      setMessage('');
      handleClick();
      const weightToSend = props.weight ? props.weight : 0;

      handleDataSend(weightToSend);
      if (props.windowVisibility === true) {
        props.setWindowVisibility(false);
        props.setEvent('');
      }


      handleDateChange(props.date);
      console.log('0');

      setTimeout(() => { // wymuszenie minimum czasu ładowania
        handleDateChange(props.date);
        console.log('1');
      }, 2000);

      // setTimeout(() => { // wymuszenie minimum czasu ładowania
      //   handleDateChange(props.date);
      //   console.log('2');
      // }, 2000);

      // setTimeout(() => { // wymuszenie minimum czasu ładowania
      //   handleDateChange(props.date);
      //   console.log('3');
      // }, 3000);

      // setTimeout(() => { // wymuszenie minimum czasu ładowania
      //   handleDateChange(props.date);
      //   console.log('4');
      // }, 4000);

      // setTimeout(() => { // wymuszenie minimum czasu ładowania
      //   handleDateChange(props.date);
      //   console.log('5');
      // }, 5000);
    }
  }

  // message

  const [message, setMessage] = useState('');

  const handleClick = () => {};

  // API POST

  const [loading, setLoading] = useState(true);

  const handleDataSend = (weightToSend) => {
    const data = { 
      exists: "1",
      name: props.name,
      surname: props.surname,
      weight: weightToSend,
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
      // console.log('HH',response.data);
      
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