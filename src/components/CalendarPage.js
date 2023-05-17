import CalendarCrematorium from './CalendarCrematorium/CalendarCrematorium';
import styles from './CalendarPage.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
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
        // console.log(response)
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
        <CalendarCrematorium />
      </div>

      {/* <div className={styles.calendar}>
        <CalendarCementary />
      </div> */}
    </div>
    );
}

export default App;
