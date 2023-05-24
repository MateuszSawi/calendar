import React, { useState } from 'react';
import styles from './HourForm.module.scss';

function HourForm(props) {

  // const [isOpenMinute, setIsOpenMinute] = useState(false);
  // const [isOpenHour, setIsOpenHour] = useState(false);

  // hour

  const hours = [
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16'
  ];      

  // if (!responseDataInitial.hour) {responseDataInitial.hour = ''}

  const [hour, setHour] = useState('');
  const [selectedHour, setSelectedHour] = useState('');

  const toggleMenuHour = () => {
    if (props.isOpenCompany === false && 
        props.isOpenPlaceofentry === false && 
        props.isOpenBurialPlace === false && 
        props.isOpenBurialtype === false && 
        props.isOpenMinute === false
      ) {
        props.setIsOpenHour(!props.isOpenHour);
    }
  };

  const handleOptionClickHour = (option) => {
    setHour(option);
    props.setIsOpenHour(false);
    setSelectedHour(option);
  };  

  // hour

  const minutes = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59'
  ];      

  // if (!responseDataInitial.burialtype) {responseDataInitial.burialtype = ''}

  const [minute, setMinute] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');


  const toggleMenuMinute = () => {
    if (props.isOpenCompany === false && 
        props.isOpenPlaceofentry === false && 
        props.isOpenBurialPlace === false && 
        props.isOpenBurialtype === false && 
        props.isOpenHour === false
    ) {
      props.setIsOpenMinute(!props.isOpenMinute);
    }
  };

  const handleOptionClickMinute = (option) => {
    setMinute(option);
    props.setIsOpenMinute(false);
    setSelectedMinute(option);
  };  

  // console.log(hour)
  // console.log(minute)

  // if(hour === undefined) {
  //   setHour('00');
  // }
  // if(minute === undefined) {
  //   setMinute('00');
  // }

  // let setManualTime = `${hour}:${minute}`;
  // props.setSelectedTime(setManualTime);

  // console.log(props.time, setManualTime);

  // props.setEvent(setManualTime);
 
  return (
    <div className={styles.hourBox}>
      <label>Godzina :&nbsp;</label>
      <button onClick={toggleMenuHour} className={styles.optionButton}>{hour}</button>
      {props.isOpenHour && (
        <div className={styles.toggleMenuHour}>
          {hours.map(singleHour => {
            return (
              <div onClick={() => handleOptionClickHour(singleHour)} className={styles.buttonWrapper}>
                <button className={styles.timeButton}>
                  <p className={styles.nameOnButton}>{selectedHour === singleHour ? <strong>{singleHour}</strong> : singleHour}</p>
                </button>
              </div>
            )
          })}
        </div>
      )}

      <div className={styles.hourColon}>:</div>

      <button onClick={toggleMenuMinute} className={styles.optionButton}>{minute}</button>
      {props.isOpenMinute && (
        <div className={styles.toggleMenuMinute}>
          {minutes.map(singleMinute => {
            return (
              <div onClick={() => handleOptionClickMinute(singleMinute)} className={styles.buttonWrapper}>
                <button className={styles.timeButton}>
                  <p className={styles.nameOnButton}>{selectedMinute === singleMinute ? <strong>{singleMinute}</strong> : singleMinute}</p>
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default HourForm;