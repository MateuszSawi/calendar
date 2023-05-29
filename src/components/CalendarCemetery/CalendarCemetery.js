import styles from './CalendarCemetery.module.scss';
import CalendarCemeteryElement from './CalendarCemeteryElement/CalendarCemeteryElement';

function CalendarCemetery(props) {
  
  return (
    <CalendarCemeteryElement authorities={props.authorities} />
  );
}

export default CalendarCemetery;
