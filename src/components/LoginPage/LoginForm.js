import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './LoginForm.module.scss'
import { useNavigate } from 'react-router-dom';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitted, setIsSubmitted] = useState('false');
  const [isCorrect, setIsCorrect] = useState('false');

  const [wrongLogin, setWrongLogin] = useState('');

  const navigate = useNavigate();

  console.log(props)

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/polls/login/', {
      username: username,
      password: password
    }, 
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const headers = response.headers;
        // console.log('headers: ', headers)
        const cookies = headers.get('set-cookie');
        // console.log('cookies: ', cookies)
        
        // if (cookies) {
        //   const sessionIdCookie = cookies.filter((cookie) => {
        //     return cookie.startsWith('sessionid=');
        //   })[0];
        //   if (sessionIdCookie) {
        //     document.cookie = sessionIdCookie.split(';')[0];
        //   }
        // }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCheckSession = (event) => {
    event.preventDefault();
    axios.get('http://localhost:8000/polls/checksession', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        // console.log(response.data.login);
        if (response.data.isLoggedIn) {
          props.setUserName(response.data.login);
          navigate('/calendar');
          setWrongLogin('');
        } else {
          setWrongLogin('Błędne dane logowania.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    handleLogin(event);
    setTimeout(() => { // wymuszenie minimum czasu ładowania
      handleCheckSession(event);
    }, 1000); // czas ładowania w milisekundach
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <form onSubmit={handleSubmit}>
          <div className={styles.loginElement}>
            <label>
              Nazwa użytkownika : &nbsp;
              <input
                className={styles.input}
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
          </div>

          <div className={styles.loginElement}>
            <label>
              Hasło : &nbsp;
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </div>

          <div className={styles.loginButtonWrapper}>
            <button className={styles.loginButton} type="submit">Zaloguj</button>
          </div>

          {wrongLogin && <div className={styles.wrongLoginMessage}>{wrongLogin}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;