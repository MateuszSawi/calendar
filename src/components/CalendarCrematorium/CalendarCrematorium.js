import styles from './CalendarCrematorium.module.scss';
import CalendarElement from './CalendarElement/CalendarElement';

function CalendarCrematorium(props) {
  
  return (
    <CalendarElement authorities={props.authorities} />
  );
}

export default CalendarCrematorium;
