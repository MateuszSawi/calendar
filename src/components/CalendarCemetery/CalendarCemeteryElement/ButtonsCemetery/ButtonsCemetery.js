import styles from './ButtonsCemetery.module.scss';
import axios from 'axios';
import React, { useState } from 'react';

function ButtonsCemetery(props) {

  // USUŃ

  const [confirmed, setConfirmed] = useState(false);

  const deleteButtonClick = () => {
    if (!confirmed) {
      // Tutaj wyświetl modal lub potwierdzenie
      if (window.confirm('Czy na pewno chcesz usunąć rezerwację?')) {
        setConfirmed(true);

        handleDataDelete();

        handleDateChangeOnDelete(props.date);

        setTimeout(() => {
          handleDateChangeOnDelete(props.date);
        }, 2000);
      }
    } else {
      setConfirmed(false);
    }
  }

  const handleDataDelete = () => {
    const data = { 
      exists: "0",
      name: props.name,
      surname: props.surname,
      trumpet: props.trumpet,
      orchestra: props.orchestra,
      company: props.company,
      placeofentry: props.placeofentry,
      burialplace: props.burialplace,
      burialtype: props.burialtype,
      servicedescription: props.servicedescription,
      others: props.others,
      time: props.time,
      day: props.day,
      month: props.month,
      year: props.year,

      cemetery: props.cemetery
    };
    axios.post('/polls/addtocemetery/', data, {
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

  const handleDateChangeOnDelete = (date) => {
    props.setDate(date);
    props.setShowTime(true);
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
    const year = date.getFullYear();
    const data = { day: day, month: month, year: year, cemetery:props.cemetery };
    const sessionid = props.getCookie("jwt_token");

    props.setIsLoading(true); // ustawienie stanu ładowania na true
    let cemetery = props.cemetery;
  
    axios.post('/polls/readcemetery/', { day, month, year, cemetery }, {
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
        // props.setIsLoading(false);
      }, 1000); // czas ładowania w milisekundach

      setTimeout(() => { // wymuszenie minimum czasu ładowania
        props.setIsLoading(false);
      }, 2000);
    })
    .catch(error => {
      console.error(error);
    });
  };

  // powiadomienie przed usuń

  // const showDeleteNotification = () => {
  //   props.setNotificationVisability(true);
  // }

  // if (props.deleteConfirm) {
  //   deleteButtonClick();
  //   props.setDeleteConfirm(false);
  //   props.setNotificationVisability(false);
  // }
  // deleteButtonClick();


  // EDYTUJ

  const editButtonClick = (time) => {
    if (props.windowVisibility === true) {
      props.setWindowVisibility(false);
      props.setEvent('');
    }
    handleDateChangeOnEdit(props.date);

    setTimeout(() => { // wymuszenie minimum czasu ładowania
      handleDateChangeOnEdit(props.date);
    }, 2000);
  }

  const handleDateChangeOnEdit = (date) => {
    props.setDate(date);
    props.setShowTime(true);
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
    const year = date.getFullYear();
    const data = { day: day, month: month, year: year, cemetery:props.cemetery };
    const sessionid = props.getCookie("jwt_token");
  
    // props.setIsLoading(true); // ustawienie stanu ładowania na true
    let cemetery = props.cemetery;
  
    axios.post('/polls/readcemetery/', { day, month, year, cemetery }, {
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
 
  return (
    <div className={styles.buttonsWrapper}>
      {!props.addButtonVisibility && (
        <div className={styles.responseInfoButtons}>
          {props.authorities === 3 || props.authorities === 2 ? (
            <button onClick={() => {
              props.setTime(props.time);
              props.openWindow();
              props.setIsFromEdit(true);
            }}> EDYTUJ </button>
          ) : null}

          {props.authorities === 3 || props.authorities === 2 ? (
            <button onClick={() => {
              // showDeleteNotification();
              deleteButtonClick();
            }}> USUŃ </button>
          ) : null}
        </div>
      )} 
    </div>
  )
}

export default ButtonsCemetery;