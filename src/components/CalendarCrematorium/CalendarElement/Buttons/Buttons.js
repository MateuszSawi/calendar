import styles from './Buttons.module.scss';
import axios from 'axios';
import React, { useState } from 'react';

function Buttons(props) {

  // USUŃ

  // const [confirmed, setConfirmed] = useState(false);

  // const deleteButtonClick = () => {
  //   if (!confirmed) {
  //     // Tutaj wyświetl modal lub potwierdzenie
  //     if (window.confirm('Czy na pewno chcesz usunąć rezerwację?')) {
  //       setConfirmed(true);

  //       handleDataDelete();

  //       handleDateChangeOnDelete(props.date);

  //       setTimeout(() => {
  //         handleDateChangeOnDelete(props.date);
  //       }, 2000);
  //     }
  //   } else {
  //     setConfirmed(false);
  //   }
  // }

  const handleDataDelete = () => {
    const data = { 
      exists: "0",
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

      cemetery: props.cemetery,
      dateofdeath: props.dateofdeath,
      paid: props.paid,
    };
    axios.post('http://localhost:8000/polls/addtodatabase/', data, {
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

  const [deleteNotificationVisability, setDeleteNotificationVisability] = useState(false);

  const deleteButtonClick = () => {
    // setConfirmed(true);
    setDeleteNotificationVisability(false);

    handleDataDelete();

    handleDateChangeOnDelete(props.date);

    setTimeout(() => {
      handleDateChangeOnDelete(props.date);
    }, 2000);
  }

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
    const data = { day: day, month: month, year: year };
    const sessionid = props.getCookie("jwt_token");
  
    // props.setIsLoading(true); // ustawienie stanu ładowania na true
  
    axios.post('http://localhost:8000/polls/readfromdatabase/', { day, month, year }, {
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

  // console.log(props);
 
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
              setDeleteNotificationVisability(true);
              // deleteButtonClick();
            }}> USUŃ </button>
          ) : null}

          {deleteNotificationVisability === true &&
            <div className={styles.confirmBoxBackground}>
              <div className={styles.confirmBox}>
                <p className={styles.notificationData}><strong>{props.time}</strong> {props.dayOfTheWeek} {props.fixedDate} - krematorium</p>
                <p>Czy na pewno chcesz usunąć rezerwację?</p>

                <button onClick={() => {
                  setDeleteNotificationVisability(false);
                }}> Anuluj </button>

                <button className={styles.buttonToDelete} onClick={() => {
                  deleteButtonClick();
                }}> Usuń </button>
              </div>
            </div>
          }
        </div>
      )} 
    </div>
  )
}

export default Buttons;