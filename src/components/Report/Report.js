import { useState, useEffect } from "react";
import styles from './Report.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Report(props) {

  // check if logged in --------------------------------------------------------------------

  useEffect(() => {
    handleCheckSession();
  }, []);

  const navigate = useNavigate();

  const handleCheckSession = () => {
    // event.preventDefault();
    axios.get('http://localhost:8000/polls/checksession', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        // props.setAuthorities(response.data.authorities);

        if (response.data.isLoggedIn) {
          navigate('/raport');
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // ---------------------------------------------------------------------------------------






  return (
    <div className={styles.reportPanel}>
      <p>Krasny wyciska 10kg na klate</p>
    </div>
  )
}

export default Report;