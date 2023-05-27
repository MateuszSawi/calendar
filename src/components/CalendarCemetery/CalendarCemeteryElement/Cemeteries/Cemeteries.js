import React, { useState } from "react";
import styles from './Cemeteries.module.scss'
import axios from 'axios';

function Cemeteries(props) {

  // const cemeteriesToDisplay = [
  //   'Łostowicki',
  //   'Centralny',
  //   'Sobieszewo',
  //   'Ignacego',
  //   'Salvator',
  //   'Garnizonowy',
  //   'Oliwa',
  //   'Nowy Port',
  // ];

  const cemeteriesToDisplay = [
    'lostowicki',
    'centralny',
    'sobieszewo',
    'ignacego',
    'salvator',
    'garnizonowy',
    'oliwa',
    'nowyport',
  ];

  const [cemeteryToDisplay, setCemeteryToDisplay] = useState('lostowicki');

  // const [cemetery, setCemetery] = useState('lostowicki');
  const [selectedOptionCemetery, setSelectedOptionCemetery] = useState(cemeteryToDisplay);
  const [isOpenCemetery, setIsOpenCemetery] = useState(false);

  let cemetery;

  const prepareCemetery = () => {
    if(cemeteryToDisplay === 'Łostowicki') {
      cemetery = 'lostowicki';
      props.setCemetery('lostowicki');

    } else if(cemeteryToDisplay === 'Centralny') {
      cemetery = 'centralny';
      props.setCemetery('centralny');

    } else if(cemeteryToDisplay === 'Sobieszewo') {
      cemetery = 'sobieszewo';
      props.setCemetery('sobieszewo');

    } else if(cemeteryToDisplay === 'Ignacego') {
      cemetery = 'ignacego';
      props.setCemetery('ignacego');

    } else if(cemeteryToDisplay === 'Salvator') {
      cemetery = 'salvator';
      props.setCemetery('salvator');

    } else if(cemeteryToDisplay === 'Garnizonowy') {
      cemetery = 'garnizonowy';
      props.setCemetery('garnizonowy');

    } else if(cemeteryToDisplay === 'Oliwa') {
      cemetery = 'oliwa';
      props.setCemetery('oliwa');

    } else if(cemeteryToDisplay === 'Nowy Port') {
      cemetery = 'nowyport';
      props.setCemetery('nowyport');
    }
  }

  prepareCemetery();

  const toggleMenuPlaceofentry = () => {
    setIsOpenCemetery(!isOpenCemetery);
  };

  const handleOptionClickPlaceofentry = (option) => {
    setCemeteryToDisplay(option);
    setIsOpenCemetery(false);
    setSelectedOptionCemetery(option);

    // prepareCemetery();
    props.setCemetery(cemeteryToDisplay);
    props.handleDateChange(props.date, cemeteryToDisplay);
  };

  return (
    <div className={styles.infoBox}>
      <h1 className='header'>Cmentarz :&nbsp;</h1>
      <button onClick={toggleMenuPlaceofentry} className={styles.optionButton}><h1 className={styles.cemeteryTitle}>{cemeteryToDisplay}</h1></button>
      {isOpenCemetery && (
        <div className={styles.toggleMenuCompany}>
          {cemeteriesToDisplay.map(singleCemetery => {
            return (
              <div onClick={() => handleOptionClickPlaceofentry(singleCemetery)} className={styles.companyButtonWrapper}>
                <button className={styles.companyButton}>
                  <p className={styles.companyNameOnButton}>
                    {selectedOptionCemetery === singleCemetery ? <strong>{singleCemetery}</strong> : singleCemetery}
                  </p>
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div> 
  )
}

export default Cemeteries;
