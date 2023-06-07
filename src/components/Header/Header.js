import {useState} from 'react';
import styles from './Header.module.scss';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Header(props) {

  const navigate = useNavigate();

  const logOut = () => {
    // event.preventDefault();
    axios.post('http://localhost:8000/polls/logout', {
      
    }, 
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        // const headers = response.headers;
        // const cookies = headers.get('set-cookie');
        console.log(response)
      })
      .catch((error) => {
        console.error(error);
      });

      // navigate:

      props.setUserName('');
      props.setAuthorities('');
      navigate('/');

  }
  
return (
  <header className={styles.header}>
    <div className={styles.headerInner}>
      <Link to="/calendar" className={styles.link} >
        <div className={styles.imgDiv}>
          <img alt="zielen" src={process.env.PUBLIC_URL + 'logo_zielen_oryginalne.png'} />
        </div>
      </Link>

      {props.authorities === 3 || props.authorities === 2 || props.authorities === 1 ? (
        <div className={styles.userDiv}>
          <div className={styles.userData}>
            <FaUser size="1.4em" />
          </div>
          <div className={styles.userData}>
            {props.userName}
          </div>

          {props.authorities === 3 ? (
            <Link to="/admin" className={styles.link} >
              <div className={styles.user}>
                <button className={styles.button}>Admin</button>
              </div>
            </Link>
          ) : null}

          <Link to="/raport" className={styles.link} >
            <div className={styles.user}>
              <button className={styles.button}>Raport</button>
            </div>
          </Link>

          <div className={styles.user}>
            <button className={styles.button} onClick={() => {
              logOut();
            }}>Wyloguj</button>
          </div>
        </div>
      ) : null}
    </div>
  </header>
  )
}

export default Header;