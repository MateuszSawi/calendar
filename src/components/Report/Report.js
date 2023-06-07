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
    axios.get('/polls/checksession', {
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

  const months = [
    'styczeń',
    'luty',
    'marzec',
    'kwiecień',
    'maj',
    'czerwiec',
    'lipiec',
    'sierpień',
    'wrzesień',
    'październik',
    'listopad',
    'grudzień'
  ]; 

  const [month, setMonth] = useState('wybierz');
  const [selectedOptionMonth, setSelectedOptionMonth] = useState(month);
  const [isMonthOpen, setIsMonthOpen] = useState(false);


  const toggleMenuMonth = () => {
    setIsMonthOpen(!isMonthOpen);
  };

  const handleOptionClickMonth = (option) => {
    setMonth(option);
    setIsMonthOpen(false);
    setSelectedOptionMonth(option);
  };

  // --------------------- year -------------------------

  let currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);

  const handleYearInputChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]{0,4}$/; // Wyrażenie regularne dopasowujące tylko cyfry od 0 do 9, z maksymalnie 4 cyframi
    if (regex.test(value)) {
      setYear(value);
    }
  };

  // API

  const [reports, setReports] = useState();

  const getReport = () => {

    let monthToSend;

    if (month === 'styczeń') {monthToSend = '01'}
    else if (month === 'luty') {monthToSend = '02'}
    else if (month === 'marzec') {monthToSend = '03'}
    else if (month === 'kwiecień') {monthToSend = '04'}
    else if (month === 'maj') {monthToSend = '05'}
    else if (month === 'czerwiec') {monthToSend = '06'}
    else if (month === 'lipiec') {monthToSend = '07'}
    else if (month === 'sierpień') {monthToSend = '08'}
    else if (month === 'wrzesień') {monthToSend = '09'}
    else if (month === 'październik') {monthToSend = '10'}
    else if (month === 'listopad') {monthToSend = '11'}
    else if (month === 'grudzień') {monthToSend = '12'}

    const data = { 
      month: monthToSend,
      year: year
    };
  
    // const sessionid = props.getCookie("jwt_token");

    axios.post('/polls/report', data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
  
        // console.log(response.data.results)

        setReports(response.data.results);

      })
      .catch(error => {
        console.error(error);
      });
    };

  return (
    <div className={styles.reportPanel}>
      <div>
        <label>Miesiąc :&nbsp;</label>
        <button onClick={toggleMenuMonth} className={styles.optionButton}>{month}</button>
        {isMonthOpen && (
          <div className={styles.toggleMenuCompany}>
            {months.map(singleMonth => {
              return (
                <div onClick={() => handleOptionClickMonth(singleMonth)} className={styles.companyButtonWrapper}>
                  <button className={styles.companyButton}>
                    <p className={styles.companyNameOnButton}>{selectedOptionMonth === singleMonth ? <strong>{singleMonth}</strong> : singleMonth}</p>
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>   

      <div className={styles.infoBox}>
        <label>
          Rok :&nbsp;
          <input
            className={styles.input}
            type="text"
            value={year}
            onChange={handleYearInputChange}
            // placeholder="Podaj rok"
          />
        </label>
      </div>

      <button className={styles.button} onClick={() => {
          getReport();
        }}>Wygeneruj raport kremacji miesiąca
      </button>

      <div>
        {reports &&
          reports.map(report => {
            const isCompanyEmptySpaces = report.company.trim().length === 0;

            if (!isCompanyEmptySpaces) {
              return (
                <div className={styles.reportWrapper} key={report.id}>
                  <p>Firma: <strong>{report.company}</strong></p>
                  <p>Ilość kremacji: <strong>{report.count}</strong></p>
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
    </div>
  )
}

export default Report;