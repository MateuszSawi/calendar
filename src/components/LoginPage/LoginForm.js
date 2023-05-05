import React, { useState } from 'react';
import axios from 'axios';

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
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nazwa użytkownika:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Hasło:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Zaloguj</button>
    </form>
  );
};

export default LoginForm;