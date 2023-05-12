import styles from './Box.module.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SubmitButton from './SubmitButton/SubmitButton';
import CloseBoxButton from './CloseBoxButton/CloseBoxButton';

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

  const [family, setFamily] = useState(false);
  
  if (yesChecked === true ) {
    setFamily(true);
  } else if (noChecked === true ) {
    setFamily(false);
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

  const companies = [
    'Obol - Sopot',
    'Zakrzewski - Gdynia',
    'Ostatnia posługa - Rumia',
    'Chejron - Gdynia',
    'Orszak - Gdynia',
    'Ochnio - Wejherowo',
    'Eternum - Rumia',
    'Tanatos - Gdańsk',
    'Zarząd cmentarzy komunalnych - Gdynia',
    'Lilia - Starogard Gdański',
    'Anubis - Sopot',
    'M.Z.Z. Koziara - Gdańsk',
    'Aakcesoria Masiak-Lewandowska - Gdynia',
    'Lademann - Wejherowo',
    'Henryk Pioch - Kartuzy',
    'Kalia - Kleszczewo',
    'Hedez - Puck',
    'Kalia - Gdańsk',
    'Juka - Starogard Gdańsk',
    'Św.Józef - Żukowo',
    'PPU "Zieleń" - Gdańsk',
    'Światłość wiekuista - Pruszcz Gdański',
    'Kremo - Gdańsk',
    'Kalia - Puck',
    'Przymorze - Gdańsk',
    'Credo - Gdańsk',
    'Róża - Gdynia',
    'Concordia - Gdynia',
    'Starówka - Tczew',
    'ZCK Sopot'
  ];      

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
      <div>
        {!isMidnight && (
          <label><strong>{props.event} {props.dayOfTheWeek} {props.fixedDate}</strong></label>
        )}
        {isMidnight && (
          <label><strong>24:00 {props.dayOfTheWeek} {props.fixedDate}</strong></label>
        )}
      </div>

      <div>
        <CloseBoxButton 
          closeWindow={closeWindow}
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
          otherInfo={otherInfo}
        />
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
        <label>Firma :&nbsp;</label>
        <button onClick={toggleMenuCompany} className={styles.optionButton}>{company}</button>
        {isOpenCompany && (
          <div className={styles.toggleMenuCompany}>
            {companies.map(singleCompany => {
              return (
                <div onClick={() => handleOptionClickCompany(singleCompany)} className={styles.companyButtonWrapper}>
                  <button className={styles.companyButton}>
                    <p className={styles.companyNameOnButton}>{selectedOptionCompany === singleCompany ? <strong>{singleCompany}</strong> : singleCompany}</p>
                  </button>
                </div>
              )
            })}

            <div onClick={() => handleOptionClickCompanyOther('Inna')}  className={styles.companyButtonWrapper}><button className={styles.companyButton}>
              <p className={styles.companyNameOnButton}>{selectedOptionCompany === 'Inna' ? <strong>Inna</strong> : 'Inna'}</p></button>
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

      <div className={styles.infoBox}>
        <label>Wyznanie :&nbsp;</label>
        <button onClick={toggleMenuReligion} className={styles.optionButton}>{religion}</button>
        {isOpenReligion && (
          <div className={styles.toggleMenu}>
            <div onClick={() => handleOptionClickReligion('katolickie')} className={styles.religionButtonWrapper}><button className={styles.religionButton}>{religion === 'katolickie' ? <strong>katolickie</strong> : 'katolickie'}</button></div>
            <div onClick={() => handleOptionClickReligion('Świadek Jehowy')} className={styles.religionButtonWrapper}><button className={styles.religionButton}>{religion === 'Świadek Jehowy' ? <strong>Świadek Jehowy</strong> : 'Świadek Jehowy'}</button></div>
            <div onClick={() => handleOptionClickReligion('inne')} className={styles.religionButtonWrapper}><button className={styles.religionButton}>{religion === 'inne' ? <strong>inne</strong> : 'inne'}</button></div>
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