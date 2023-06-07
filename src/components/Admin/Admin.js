import { useState, useEffect } from "react";
import styles from './Admin.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin(props) {

  useEffect(() => {
    handleCheckSession();
  }, []);

  const navigate = useNavigate();

  const handleCheckSession = () => {
    // event.preventDefault();
    axios.get('/polls/checksession', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        props.setAuthorities(response.data.authorities);

        if (response.data.isLoggedIn) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // ----------------------------------------------------------------

  const [logsArr, setLogsArr] = useState([]);
  const [responseData, setResponseData] = useState(null);

  const getLogs = () => {
    // event.preventDefault();
    axios.get('/polls/getlogs', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        // console.log(response.data.results);
        setLogsArr(response.data.results);
        setResponseData(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // ----------------------------------------------------------------

  useEffect(() => {
    getAccounts();
  }, []);

  // ----------------------------------------------------------------

  let responseDataInitial = [];

  const [usersArr, setUsersArr] = useState([]);
  const [responseDataUsers, setResponseDataUsers] = useState(null);

  const getAccounts = () => {
    axios.get('/polls/readuser', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      setUsersArr(response.data.results);
      setResponseDataUsers(response.data.results);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  usersArr.map(response => {
    let responseDataTime = response.login.substring(0, response.login.length - 3);

    if (response.login === responseDataTime) {
      responseDataInitial = response;
    }
  })

  // ----------------------------------------------------------------

  const [addAccountVisibility, setaddAccountVisibility] = useState(false);

  const addAccount = () => {

    let authorityToSend = '';

    if (authority === 'administrator') {
      authorityToSend = 3

    } else if (authority === 'wyświetlanie i edycja') {
      authorityToSend = 2;

    } else if (authority === 'wyświetlanie') {
      authorityToSend = 1;

    }

    const data = { 
      addedLogin: login,
      addedPassword: password,
      addedAuth: authorityToSend
    };
    axios.post('/polls/adduser', data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(response => {
      getAccounts();

      setLogin('');
      setPassword('');
      setAuthority('wybierz');
      setSelectedAuthority('');

      setTimeout(() => { // wymuszenie minimum czasu ładowania
        getAccounts();
      }, 1000); // czas ładowania w milisekundach

      setTimeout(() => { // wymuszenie minimum czasu ładowania
        setIsLoading(false);
      }, 2000);
    })
    .catch(error => {
      console.error(error);
    });
  }

  // ----------------------------------------------------------------

  const deleteAccount = (login) => {
    const data = { 
      login: login,
      
    };
    axios.post('/polls/deleteuser', data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(response => {
      getAccounts();

      setTimeout(() => { // wymuszenie minimum czasu ładowania
        getAccounts();
      }, 1000); // czas ładowania w milisekundach

      setTimeout(() => { // wymuszenie minimum czasu ładowania
        setIsLoading(false);
      }, 2000);
    })
    .catch(error => {
      console.error(error);
    });
  }

  // ----------------------------------------------------------------

  const [showPasswordIndex, setShowPasswordIndex] = useState(-1);

  // authorities

  const authorities = [
    'wyświetlanie',
    'wyświetlanie i edycja',
    'administrator'
  ];      

  const [authority, setAuthority] = useState('wybierz');
  const [selectedAuthority, setSelectedAuthority] = useState('');
  const [isOpenAuthority, setIsOpenAuthority] = useState(false);

  const [isOpenAuthorityMenu, setIsOpenAuthorityMenu] = useState(false);

  const toggleMenuBurialtype = () => {
    setIsOpenAuthorityMenu(!isOpenAuthorityMenu);
  };

  const handleOptionClickAuthority = (option) => {
    setAuthority(option);
    setSelectedAuthority(option);
  };

  // ----------------------------------------------------------------

  const [login, setLogin] = useState('');

  const handleLoginInputChange = (event) => {
    const value = event.target.value;
    setLogin(value);
  }

  // ----------------------------------------------------------------

  const [password, setPassword] = useState('');

  const handlePasswordInputChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  // ----------------------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState('');

  const submitAddingUser = () => {

    if (!login || authority === 'wybierz' || !password) {
      setMessage('Błędne wypełnienie!');
    } else {
      setIsOpenAuthority(false);
      addAccount();
      setIsLoading(true);
      setMessage('');
    }
  }

  return (
    <div className={styles.adminPanel}>
      {isLoading ? <div className={styles.loading}>Ładowanie użytkowników...</div> : (
        <div>
          <div className={styles.x}>
            <button className={styles.button} onClick={() => {
              setIsOpenAuthority(true);
            }}>Dodaj użytkownika</button>
          </div>
        
            
          {responseDataUsers && (
            <div className={styles.usersWrapper}>
              {responseDataUsers &&
                usersArr.map((user, index) => {
                let timeOfLastLogIn = user.last_login ? user.last_login.slice(0, -8) : '';
                const lastLoginToDisplay = timeOfLastLogIn.replace(/T/g, ', ');

                const handleClick = (index) => {
                  setShowPasswordIndex(index === showPasswordIndex ? -1 : index);
                };
              
                const generateStars = (length) => {
                  return '*'.repeat(length);
                };

                let authorityToDispaly = '';

                if (user.authorities === 3) {
                  authorityToDispaly = 'administrator';
            
                } else if (user.authorities === 2) {
                  authorityToDispaly = 'wyświetlanie i edycja';
            
                } else if (user.authorities === 1) {
                  authorityToDispaly = 'wyświetlanie';
            
                }

                // zmieniony czas ostatniego logowania (+2h)

                let newTimeString;

                if (lastLoginToDisplay) {
                  const [date, time] = lastLoginToDisplay.split(', ');
                  const [hour, minute] = time.split(':');
                
                  // Zwiększenie godziny o 2
                  let newHour = parseInt(hour, 10) + 2;
                
                  newTimeString = `${date}, ${newHour.toString().padStart(2, '0')}:${minute}`;
                }

                return (
                  <div className={styles.container}>

                    {isOpenAuthority &&
                      <div className={styles.userBox}>
                        <div className={styles.infoBox}>
                          <label>
                            Login :&nbsp;
                            <input
                              className={styles.input}
                              type="text"
                              value={login}
                              onChange={handleLoginInputChange}
                              placeholder="nazwa użytkownika"
                            />
                          </label>
                        </div>

                        <div className={styles.infoBox}>
                          <label>
                            Hasło :&nbsp;
                            <input
                              className={styles.input}
                              type="text"
                              value={password}
                              onChange={handlePasswordInputChange}
                              placeholder="hasło"
                            />
                          </label>
                        </div>

                        <div className={styles.infoBox}>
                          <label>Uprawnienia :&nbsp;</label>
                          <button onClick={toggleMenuBurialtype} className={styles.optionButton}>{authority}</button>
                          {isOpenAuthorityMenu && (
                            <div className={styles.toggleMenuCompany}>
                              {authorities.map(singleAuthority => {
                                return (
                                  <div onClick={() => {
                                    handleOptionClickAuthority(singleAuthority);
                                    setIsOpenAuthorityMenu(false);
                                  }} className={styles.companyButtonWrapper}>
                                    <button className={styles.authorityButton}>
                                      <p className={styles.companyNameOnButton}>{selectedAuthority === singleAuthority ? <strong>{singleAuthority}</strong> : singleAuthority}</p>
                                    </button>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div> 

                        <div className={styles.submittingWrapper}>
                          <button className={styles.button} 
                            onClick={() => {
                              submitAddingUser();
                            }}>Dodaj użytkownika
                          </button>  

                          {message && <div className={styles.message}>{message}</div>}
                        </div>

                        <button className={styles.button} 
                          onClick={() => {
                            setLogin('');
                            setPassword('');
                            setAuthority('wybierz');
                            setSelectedAuthority('');
                            setIsOpenAuthority(false);
                          }}>Anuluj dodawanie użytkownika
                        </button>
                      </div>
                    }

                    <div className={styles.singleUserWrapper} key={user.id}>
                      <p>Login: {user.login}</p>
                      <p>
                        Hasło: {index === showPasswordIndex ? user.password : generateStars(user.password.length)}
                        <button onClick={() => handleClick(index)} className={styles.buttonPassword}>
                          {index === showPasswordIndex ? 'Ukryj' : 'Pokaż'}
                        </button>
                      </p>
                      <p>Ostatnie logowanie: &nbsp;
                        {/* {lastLoginToDisplay},  */}
                        {newTimeString}
                      </p>
                      <p>Uprawnienia: {authorityToDispaly}</p>

                      <button className={styles.buttonPassword} onClick={() => {
                        if(user.login !== 'admin') {
                          deleteAccount(user.login);
                          setIsLoading(true);
                        }
                      }}>Usuń użytkownika
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div>
        <button className={styles.button} onClick={() => {
          getLogs();
        }}>Historia edycji</button>
      </div>

      {responseData && (
        <div className={styles.logsWrapper}>
          {responseData && (
            logsArr.map((log) => {
              let timeOfChange = log.time ? log.time.slice(0, -7) : '';

              const [hour, minute] = timeOfChange.split(':');

              // Zwiększenie godziny o 2
              const newHour = parseInt(hour, 10) + 2;

              const newTimeString = `${newHour.toString().padStart(2, '0')}:${minute}`;

              // ---------- action --------------

              let action;

              if (log.action === 1) {
                action = 'Dodanie rezerwacji - krematorium';
              } 
              else if (log.action === 2) {
                action = 'Aktualizacja rezerwacji - krematorium';
              } 
              else if (log.action === 3) {
                action = 'Usunięcie rezerwacji - krematorium';
              }
              else if (log.action === 4) {
                action = 'Dodanie rezerwacji - cmentarz Łostowicki';
              }
              else if (log.action === 5) {
                action = 'Aktualizacja rezerwacji - cmentarz Łostowicki';
              }
              else if (log.action === 6) {
                action = 'Usunięcie rezerwacji - cmentarz Łostowicki';
              }
              else if (log.action === 7) {
                action = 'Dodanie rezerwacji - cmentarz Centralny';
              }
              else if (log.action === 8) {
                action = 'Aktualizacja rezerwacji - cmentarz Centralny';
              }
              else if (log.action === 9) {
                action = 'Usunięcie rezerwacji - cmentarz Centralny';
              }
              else if (log.action === 10) {
                action = 'Dodanie rezerwacji - cmentarz Sobieszewo';
              }
              else if (log.action === 11) {
                action = 'Aktualizacja rezerwacji - cmentarz Sobieszewo';
              }
              else if (log.action === 12) {
                action = 'Usunięcie rezerwacji - cmentarz Sobieszewo';
              }
              else if (log.action === 13) {
                action = 'Dodanie rezerwacji - cmentarz Ignacego';
              }
              else if (log.action === 14) {
                action = 'Aktualizacja rezerwacji - cmentarz Ignacego';
              }
              else if (log.action === 15) {
                action = 'Usunięcie rezerwacji - cmentarz Ignacego';
              }
              else if (log.action === 16) {
                action = 'Dodanie rezerwacji - cmentarz Salvator';
              }
              else if (log.action === 17) {
                action = 'Aktualizacja rezerwacji - cmentarz Salvator';
              }
              else if (log.action === 18) {
                action = 'Usunięcie rezerwacji - cmentarz Salvator';
              }
              else if (log.action === 19) {
                action = 'Dodanie rezerwacji - cmentarz Garnizonowy';
              }
              else if (log.action === 20) {
                action = 'Aktualizacja rezerwacji - cmentarz Garnizonowy';
              }
              else if (log.action === 21) {
                action = 'Usunięcie rezerwacji - cmentarz Garnizonowy';
              }
              else if (log.action === 22) {
                action = 'Dodanie rezerwacji - cmentarz Oliwa';
              }
              else if (log.action === 23) {
                action = 'Aktualizacja rezerwacji - cmentarz Oliwa ';
              }
              else if (log.action === 24) {
                action = 'Usunięcie rezerwacji - cmentarz Oliwa';
              }
              else if (log.action === 25) {
                action = 'Dodanie rezerwacji - cmentarz Nowy Port';
              }
              else if (log.action === 26) {
                action = 'Aktualizacja rezerwacji - cmentarz Nowy Port';
              }
              else if (log.action === 27) {
                action = 'Usunięcie rezerwacji - cmentarz Nowy Port';
              }
              
              return (
              <div className={styles.singleLogWrapper}>
                <p>Użytkownik: <strong>{log.userAdding}</strong></p>
                <p>Czas w którym użytkownik dokonał zmiany: &nbsp;
                  <strong>
                    {/* {timeOfChange} */}
                    {newTimeString}
                  </strong>, {log.date_of_activity}</p>
                <p>Zmiana w dniu: {log.date_of_action_plus_time}</p>
                <p>{action}</p>
              </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default Admin;