import CalendarCrematorium from './CalendarCrematorium/CalendarCrematorium';
import styles from './CalendarPage.module.scss';

function App() {

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendar}>
        <CalendarCrematorium />
      </div>

      {/* <div className={styles.calendar}>
        <CalendarCrematorium />
      </div> */}
    </div>
    );
}

export default App;
