import React, { useState } from 'react';
import axios from 'axios';
import styles from './LoginForm.module.scss'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitted, setIsSubmitted] = useState('false');
  const [isCorrect, setIsCorrect] = useState('false');

  const handleSubmit = (event) => {
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
        console.log(headers)
        const cookies = headers.get('set-cookie');
        console.log(cookies)
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

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios.get('/polls/login/', {
  //   }, 
  //   {
  //     withCredentials: true,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then((response) => {
  //       isLoggedIn = true - mozna dodawac i edit
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };


  

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
        </form>
      </div>
    </div>
  );
};

export default LoginForm;