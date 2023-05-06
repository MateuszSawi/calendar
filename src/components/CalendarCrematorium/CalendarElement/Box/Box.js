import styles from './Box.module.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SubmitButton from './SubmitButton/SubmitButton'

function Box(props) {

  const closeWindow = () => {
    if (props.windowVisibility === true) {
      props.setWindowVisibility(false);
      props.setEvent('');
    }
  };

  // name

  const [name, setName] = useState('');

  const handleNameInputChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  // surname

  const [surname, setSurname] = useState('');

  const handleSurnameInputChange = (event) => {
    const value = event.target.value;
    setSurname(value);
  };

  // weight

  const [weight, setWeight] = useState('');

  const handleWeightInputChange = (event) => {
    const value = event.target.value;
    setWeight(value);
    // const weightToSend = value ? value : 0; // jeśli wartość istnieje, użyj jej, w przeciwnym razie ustaw 0
    // setWeight(weightToSend);
  };

  // family

  const [yesChecked, setYesChecked] = useState(false);
  const [noChecked, setNoChecked] = useState(false);

  const handleYesChange = () => {
    setYesChecked(true);
    setNoChecked(false);
  };

  const handleNoChange = () => {
    setYesChecked(false);
    setNoChecked(true);
  };

  let family;
  if (yesChecked === true ) {
    family = 'true';
  } else if (noChecked === true ) {
    family = 'false';
  }

  // religion

  const [religion, setReligion] = useState('wybierz');
  const [isOpenReligion, setIsOpenReligion] = useState(false);


  const toggleMenuReligion = () => {
    if (isOpenCompany === false) {
      setIsOpenReligion(!isOpenReligion);
    }
  };

  const handleOptionClickReligion = (option) => {
    setReligion(option);
    setIsOpenReligion(false);
  };

  // company

  const [isOpenCompany, setIsOpenCompany] = useState(false);
  const [selectedOptionCompany, setSelectedOptionCompany] = useState('wybierz');
  const [inputValueCompany, setInputValueCompany] = useState('');
  let company;

  const toggleMenuCompany = () => {
    if (isOpenReligion === false) {
      setIsOpenCompany(!isOpenCompany);
    }
  };

  const handleOptionClickCompany = (option) => {
    setSelectedOptionCompany(option);
    setIsOpenCompany(false);
  };

  const handleOptionClickCompanyOther = (option) => {
    setSelectedOptionCompany(option);
  };

  const handleInputChangeCompany = (event) => {
    setInputValueCompany(event.target.value);
  };

  const closeCompanies = () => {
    setIsOpenCompany(false);
  }

  company = selectedOptionCompany;
  if (company === 'Inna') {
    company = inputValueCompany;
  }

  // otherInfo

  const [otherInfo, setotherInfo] = useState('');

  const handleOtherInfoInputChange = (event) => {
    const value = event.target.value;
    setotherInfo(value);
  };

  // filter

  let isMidnight = false;
  if (props.event === '00:00') {
    isMidnight = true;
  } else {
    isMidnight = false;
  }

return (
  <div className={styles.window}>

    <div className={styles.labelInnerWindow}>
      <div 
      // className={styles.chosenTime}
      >
        {/* <label><strong>{props.event} {props.dayOfTheWeek} {props.fixedDate}</strong></label> */}
        {!isMidnight && (
          <label><strong>{props.event} {props.dayOfTheWeek} {props.fixedDate}</strong></label>
        )}
        {isMidnight && (
          <label><strong>24:00 {props.dayOfTheWeek} {props.fixedDate}</strong></label>
        )}
      </div>

      <div 
      // className={styles.closeButton}
      >
        <button className={styles.closeWindowButton} onClick={closeWindow} >X</button>
      </div>
    </div>

    <div className={styles.innerWindow}>
      
      <div className={styles.infoBox}>
        <label>
          Imię :&nbsp;
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={handleNameInputChange}
            placeholder="Podaj imię"
          />
        </label>
      </div>

      <div className={styles.infoBox}>
        <label>
          Nazwisko :&nbsp;
          <input
            className={styles.input}
            type="text"
            value={surname}
            onChange={handleSurnameInputChange}
            placeholder="Podaj nazwisko"
          />
        </label>
      </div>
    
      <div className={styles.infoBoxKg}>
        <label>
          Waga :&nbsp;
          <input
            className={styles.input}
            type="number"
            value={weight}
            onChange={handleWeightInputChange}
            placeholder="Podaj wagę w kg"
          />
          &nbsp;kg
        </label>
      </div>

      <div className={styles.infoBox}>
        Udział rodziny :&nbsp;
        <div className={styles.checkboxWrapper}>
          <div>
            <input type="checkbox" checked={yesChecked} className={styles.checkboxInfo} onChange={handleYesChange} />
            Tak
          </div>
          
          <div>
            <input type="checkbox" checked={noChecked} className={styles.checkboxInfo} onChange={handleNoChange} />
            Nie
          </div>
        </div>
      </div>

      <div className={styles.infoBox}>
        <label>Wyznanie :&nbsp;</label>
        <button onClick={toggleMenuReligion} className={styles.optionButton}>{religion}</button>
        {isOpenReligion && (
          <div className={styles.toggleMenu}>
            <div onClick={() => handleOptionClickReligion('katolickie')} className={styles.religionButtonWrapper}><button className={styles.religionButton}>{religion === 'katolickie' ? <strong>katolickie</strong> : 'katolickie'}</button></div>
            <div onClick={() => handleOptionClickReligion('niekatolickie')} className={styles.religionButtonWrapper}><button className={styles.religionButton}>{religion === 'niekatolickie' ? <strong>niekatolickie</strong> : 'niekatolickie'}</button></div>
          </div>
        )}
      </div>

      <div className={styles.infoBox}>
        <label>Firma :&nbsp;</label>
        <button onClick={toggleMenuCompany} className={styles.optionButton}>{company}</button>
        {isOpenCompany && (
          <div className={styles.toggleMenu}>
            <div onClick={() => handleOptionClickCompany('Firma 1')} className={styles.companyButtonWrapper}><button className={styles.companyButton}>{selectedOptionCompany === 'Firma 1' ? <strong>Firma 1</strong> : 'Firma 1'}</button></div>
            <div onClick={() => handleOptionClickCompany('Firma 2')} className={styles.companyButtonWrapper}><button className={styles.companyButton}>{selectedOptionCompany === 'Firma 2' ? <strong>Firma 2</strong> : 'Firma 2'}</button></div>
            <div onClick={() => handleOptionClickCompany('Firma 3')} className={styles.companyButtonWrapper}><button className={styles.companyButton}>{selectedOptionCompany === 'Firma 3' ? <strong>Firma 3</strong> : 'Firma 3'}</button></div>
            <div onClick={() => handleOptionClickCompany('Firma 4')} className={styles.companyButtonWrapper}><button className={styles.companyButton}>{selectedOptionCompany === 'Firma 4' ? <strong>Firma 4</strong> : 'Firma 4'}</button></div>
            <div onClick={() => handleOptionClickCompany('Firma 5')} className={styles.companyButtonWrapper}><button className={styles.companyButton}>{selectedOptionCompany === 'Firma 5' ? <strong>Firma 5</strong> : 'Firma 5'}</button></div>
            <div onClick={() => handleOptionClickCompany('Firma 6')} className={styles.companyButtonWrapper}><button className={styles.companyButton}>{selectedOptionCompany === 'Firma 6' ? <strong>Firma 6</strong> : 'Firma 6'}</button></div>
            <div onClick={() => handleOptionClickCompany('Firma 7')} className={styles.companyButtonWrapper}><button className={styles.companyButton}>{selectedOptionCompany === 'Firma 7' ? <strong>Firma 7</strong> : 'Firma 7'}</button></div>
            <div onClick={() => handleOptionClickCompany('Firma 8')} className={styles.companyButtonWrapper}><button className={styles.companyButton}>{selectedOptionCompany === 'Firma 8' ? <strong>Firma 8</strong> : 'Firma 8'}</button></div>
            <div onClick={() => handleOptionClickCompany('Firma 9')} className={styles.companyButtonWrapper}><button className={styles.companyButton}>{selectedOptionCompany === 'Firma 9' ? <strong>Firma 9</strong> : 'Firma 9'}</button></div>
            <div onClick={() => handleOptionClickCompany('Firma 10')} className={styles.companyButtonWrapper}><button className={styles.companyButton}>{selectedOptionCompany === 'Firma 10' ? <strong>Firma 10</strong> : 'Firma 10'}</button></div>

            <div onClick={() => handleOptionClickCompanyOther('Inna')}  className={styles.companyButtonWrapper}><button className={styles.companyButton}>
              {selectedOptionCompany === 'Inna' ? <strong>Inna</strong> : 'Inna'}</button>
              {selectedOptionCompany === 'Inna' && (
                <div>
                  <input type="text" value={inputValueCompany} onChange={handleInputChangeCompany} className={styles.otherCompanyInput} />
                  <button onClick={closeCompanies} className={styles.submitOtherCompanyButton}>zatwierdź</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>      
    </div>
      
    <label>Uwagi :&nbsp;</label>
    <textarea
      className={styles.textarea}
      value={otherInfo}
      onChange={handleOtherInfoInputChange}
    />

    <SubmitButton 
      windowVisibility={props.windowVisibility}
      setWindowVisibility={props.setWindowVisibility}
      setEvent={props.setEvent}
      date={props.date} 

      day={props.day}
      month={props.month}
      year={props.year}
      time={props.event}

      setDate={props.setDate}
      setShowTime={props.setShowTime}
      getCookie={props.getCookie}
      
      setResponseData={props.setResponseData}
      setIsLoading={props.setIsLoading}

      handleDateChange={props.handleDateChange}

      responseData={props.responseData} 
      isLoading={props.isLoading}
      
      name={name}
      surname={surname}
      setWeight={setWeight}
      weight={weight}
      family={family}
      company={company}
      religion={religion}
      otherInfo={otherInfo} />
  </div>
  )
}

export default Box;