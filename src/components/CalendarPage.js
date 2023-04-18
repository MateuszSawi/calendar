import CalendarCrematorium from './CalendarCrematorium/CalendarCrematorium';
import styles from './CalendarPage.module.scss';

import CalendarCementary from './CalendarCemeteries/CalendarCementary';

function App() {

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendar}>
        <CalendarCrematorium />
      </div>

      <div className={styles.calendar}>
        <CalendarCementary />
      </div>
    </div>
    );
}

export default App;
