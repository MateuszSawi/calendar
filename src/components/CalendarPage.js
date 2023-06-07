import CalendarCrematorium from './CalendarCrematorium/CalendarCrematorium';
import CalendarCemetery from './CalendarCemetery/CalendarCemetery';
import styles from './CalendarPage.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from "react";

function App(props) {
  const navigate = useNavigate();

  useEffect(() => {
    handleCheckSession();
  }, []);

  const handleCheckSession = () => {
    // event.preventDefault();
    axios.get('/polls/checksession', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        // console.log(response.data.authorities)

        props.setAuthorities(response.data.authorities);

        if (response.data.isLoggedIn) {
          navigate('/calendar');
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendar}>
        <CalendarCrematorium authorities={props.authorities} />
      </div>

      <div className={styles.calendar}>
        <CalendarCemetery authorities={props.authorities} />
      </div>
    </div>
    );
}

export default App;
