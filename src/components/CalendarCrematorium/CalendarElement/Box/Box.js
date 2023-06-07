import styles from './Box.module.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SubmitButton from './SubmitButton/SubmitButton';
import CloseBoxButton from './CloseBoxButton/CloseBoxButton';
import axios from 'axios';

function Box(props) {
  // const [responseDataInitial, setResponseDataInitial] = useState(null);
  let responseDataInitial = [];

  props.responseData.results.map(response => {
    let responseDataTime = response.time.substring(0, response.time.length - 3);

    if (props.event === responseDataTime) {
      // console.log('ELO: ', response)
      responseDataInitial = response;
    }
  })

  // console.log(responseDataInitial)


  // console.log(props.responseData);

  const closeWindow = () => {
    if (props.windowVisibility === true) {
      props.setWindowVisibility(false);
      props.setEvent('');
    }
  };

  // name

  if (!responseDataInitial.name) {responseDataInitial.name = ''}

  const [name, setName] = useState(responseDataInitial.name);

  const handleNameInputChange = (event) => {
    // handleDateChange(props.date, props.event);
    const value = event.target.value;
    setName(value);
  };

  // surname

  if (!responseDataInitial.surname) {responseDataInitial.surname = ''}

  const [surname, setSurname] = useState(responseDataInitial.surname);

  const handleSurnameInputChange = (event) => {
    const value = event.target.value;
    setSurname(value);
  };

  // responseDataInitial.dateofdeath

  // console.log(responseDataInitial.dateofdeath)

  if (!responseDataInitial.dateofdeath) {responseDataInitial.dateofdeath = '--'}


  let partsDay = responseDataInitial.dateofdeath.split("-");
  let dayInitial = partsDay[0].charAt(0) + (partsDay[0].length > 1 ? partsDay[0].charAt(1) : "");



  let partsMonth = responseDataInitial.dateofdeath.split("-");
  let monthInitial = partsMonth[1].substring(0, 2);



  let partsYear = responseDataInitial.dateofdeath.split("-");
  let yearInitial = partsYear[partsYear.length - 1];


  // console.log(dayInitial, monthInitial, yearInitial)
  
  // dayOfDeath

  if (!dayInitial) {dayInitial = ''}

  const [dayOfDeath, setdayOfDeath] = useState(dayInitial);

  const handledayOfDeathInputChange = (event) => {
    const value = event.target.value;
    setdayOfDeath(value);
  };

  // monthOfDeath

  if (!monthInitial) {monthInitial = ''}

  const [monthOfDeath, setmonthOfDeath] = useState(monthInitial);

  const handlemonthOfDeathInputChange = (event) => {
    const value = event.target.value;
    setmonthOfDeath(value);
  };

  // yearOfDeath

  if (!yearInitial) {yearInitial = ''}

  const [yearOfDeath, setyearOfDeath] = useState(yearInitial);

  const handleyearOfDeathInputChange = (event) => {
    const value = event.target.value;
    setyearOfDeath(value);
  };

  // dateofdeath

  let dateofdeath = dayOfDeath + '-' + monthOfDeath + '-' + yearOfDeath;

  // weight

  if (!responseDataInitial.weight) {responseDataInitial.weight = ''}
  // if (responseDataInitial.weight === 0) {responseDataInitial.weight = ''}
  // if (responseDataInitial.weight === '0') {responseDataInitial.weight = ''}

  // const parsedWeight = parseInt(responseDataInitial.weight);

  const [weight, setWeight] = useState(responseDataInitial.weight);

  const handleWeightInputChange = (event) => {
    const value = event.target.value;
    setWeight(value);
  };

  // family

  if (!responseDataInitial.family) {responseDataInitial.family = ''}

  const [family, setFamily] = useState(responseDataInitial.family);
  const [yesChecked, setYesChecked] = useState(family === 'tak');
  const [noChecked, setNoChecked] = useState(family === 'nie');

  const handleYesChange = () => {
    setYesChecked(!yesChecked);
    setNoChecked(false);
    setFamily('tak');
    if (family === 'nie' || family === '') {
      setFamily('tak');
    } else {
      setFamily('');
    }
  };

  const handleNoChange = () => {
    setYesChecked(false);
    setNoChecked(!noChecked);
    if (family === 'tak' || family === '') {
      setFamily('nie');
    } else {
      setFamily('');
    }
  };

  // paid

  if (!responseDataInitial.paid) {responseDataInitial.paid = ''}

  const [paid, setPaid] = useState(responseDataInitial.paid);
  const [yesCheckedPaid, setYesCheckedPaid] = useState(paid === 'tak');
  const [noCheckedPaid, setNoCheckedPaid] = useState(paid === 'nie');


  const handleYesChangePaid = () => {
    setYesCheckedPaid(!yesCheckedPaid);
    setNoCheckedPaid(false);
    if (paid === 'nie' || paid === '') {
      setPaid('tak');
    } else {
      setPaid('');
    }
  };

  const handleNoChangePaid = () => {
    setYesCheckedPaid(false);
    setNoCheckedPaid(!noCheckedPaid);
    if (paid === 'tak' || paid === '') {
      setPaid('nie');
    } else {
      setPaid('');
    }
  };

  // const [paid, setPaid] = useState(responseDataInitial.paid);
  // const [yesCheckedPaid, setYesCheckedPaid] = useState();
  // const [noCheckedPaid, setNoCheckedPaid] = useState();

  // if (!responseDataInitial.paid) {responseDataInitial.paid = ''}
  // if (responseDataInitial.paid === 'tak') {
  //   setYesCheckedPaid(true);
  //   setNoCheckedPaid(false);
  // }
  // if (responseDataInitial.paid === 'nie') {
  //   setYesCheckedPaid(false);
  //   setNoCheckedPaid(true);
  // }

  // const handleYesChangePaid = () => {
  //   setYesCheckedPaid(true);
  //   setNoCheckedPaid(false);
  //   setPaid('tak');
  // };

  // const handleNoChangePaid = () => {
  //   setYesCheckedPaid(false);
  //   setNoCheckedPaid(true);
  //   setPaid('nie');
  // };


  // religion

  if (!responseDataInitial.religion) {responseDataInitial.religion = ''}

  const [religion, setReligion] = useState(responseDataInitial.religion);
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
    'PPU "Zieleń" - Gdańsk',
    'Akcesoria Masiak-Lewandowska - Gdynia',
    'Anubis - Sopot',
    'Chejron - Gdynia',
    'Concordia - Gdynia',
    'Credo - Gdańsk',
    'Eternum - Rumia',
    'Hedez - Puck',
    'Henryk Pioch - Kartuzy',
    'Juka - Starogard Gdańsk',
    'Kalia - Gdańsk',
    'Kalia - Kleszczewo',
    'Kalia - Puck',
    'Kremo - Gdańsk',
    'Lademann - Wejherowo',
    'Lilia - Starogard Gdański',
    'M.Z.Z. Koziara - Gdańsk',
    'Ochnio - Wejherowo',
    'Ostatnia posługa - Rumia',
    'Orszak - Gdynia',
    'Obol - Sopot',
    'Przymorze - Gdańsk',
    'Róża - Gdynia',
    'Starówka - Tczew',
    'Św.Józef - Żukowo',
    'Światłość wiekuista - Pruszcz Gdański',
    'Tanatos - Gdańsk',
    'Zakrzewski - Gdynia',
    'Zarząd cmentarzy komunalnych - Gdynia',
    'ZCK Sopot'
  ];      

  if (!responseDataInitial.company) {responseDataInitial.company = ''}

  let company;

  const [isOpenCompany, setIsOpenCompany] = useState(false);
  const [selectedOptionCompany, setSelectedOptionCompany] = useState(responseDataInitial.company);
  const [inputValueCompany, setInputValueCompany] = useState('');

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

  // cemetery

  const cemeteries = [
    'Łostowicki',
    'Centralny',
    'Sobieszewo',
    'Ignacego',
    'Salvator',
    'Garnizonowy',
    'Oliwa',
    'NowyPort'
  ];      

  if (!responseDataInitial.cemetery) {responseDataInitial.cemetery = ''}

  const [isOpenCemetery, setIsOpenCemetery] = useState(false);
  const [selectedOptionCemetery, setSelectedOptionCemetery] = useState(responseDataInitial.cemetery);
  const [inputValueCemetery, setInputValueCemetery] = useState('');
  let cemetery;

  const toggleMenuCemetery = () => {
    if (isOpenReligion === false) {
      setIsOpenCemetery(!isOpenCemetery);
    }
  };

  const handleOptionClickCemetery = (option) => {
    setSelectedOptionCemetery(option);
    setIsOpenCemetery(false);
  };

  const handleOptionClickCemeteryOther = (option) => {
    setSelectedOptionCemetery(option);
  };

  const handleInputChangeCemetery = (event) => {
    setInputValueCemetery(event.target.value);
  };

  const closeCemeteries = () => {
    setIsOpenCemetery(false);
  }

  cemetery = selectedOptionCemetery;
  if (cemetery === 'Inna') {
    cemetery = inputValueCemetery;
  } 

  // otherInfo

  if (!responseDataInitial.otherInfo) {responseDataInitial.otherInfo = ''}

  const [otherInfo, setotherInfo] = useState(responseDataInitial.otherInfo);

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

  //

  const handleKeyDown = (event) => {
    const key = event.key;
    const { selectionStart, selectionEnd, target } = event;
  
    // Obsługa klawiszy strzałek
    if (key === "ArrowLeft" || key === "ArrowRight") {
      // Pozwól na poruszanie się kursora wewnątrz pola tekstowego
      return;
    }
  
    // Obsługa klawiszy Backspace i Delete
    if (key === "Backspace" || key === "Delete") {
      // Jeśli zaznaczono tekst, usuń go
      if (selectionStart !== selectionEnd) {
        const value = target ? target.value : '';
        const newValue = value.slice(0, selectionStart) + value.slice(selectionEnd);
        // Aktualizuj wartość pola tekstowego
        handledayOfDeathInputChange(newValue);
      }
      return;
    }
  
    // Sprawdzenie, czy wprowadzony znak jest cyfrą od 0 do 9
    if (!/[0-9]/.test(key)) {
      event.preventDefault(); // Zatrzymaj propagację zdarzenia
    }
  };

  //
  

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

            isFromEdit={props.isFromEdit}
            setIsFromEdit={props.setIsFromEdit}

            paid={paid}
            dateofdeath={dateofdeath}
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
      
        <div className={styles.infoBoxKg}>
          <label>
            Waga :&nbsp;
            {/* <input
              className={styles.input}
              type="number"
              value={weight}
              onChange={handleWeightInputChange}
              placeholder="Podaj wagę w kg"
            /> */}
            <input
              className={styles.input}
              type="text"
              maxLength="10" pattern="[0-9]*"
              value={weight}
              onChange={handleWeightInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Podaj wagę w kg"
            />
            &nbsp;kg
          </label>
        </div>

        <div className={styles.infoBox}>
          <label>
            Data śmierci :&nbsp;
            <input
              className={styles.inputDay}
              type="text"
              maxLength="2" pattern="[0-9]*"
              value={dayOfDeath}
              onChange={handledayOfDeathInputChange}
              onKeyDown={handleKeyDown}
              placeholder="DD"
            />-
            <input
              className={styles.inputDay}
              type="text"
              maxLength="2" pattern="[0-9]*"
              value={monthOfDeath}
              onChange={handlemonthOfDeathInputChange}
              onKeyDown={handleKeyDown}
              placeholder="MM"
            />-
            <input
              className={styles.inputYear}
              type="text"
              maxLength="4" pattern="[0-9]*"
              value={yearOfDeath}
              onChange={handleyearOfDeathInputChange}
              onKeyDown={handleKeyDown}
              placeholder="RRRR"
            />
          </label>
        </div>

        <div className={styles.infoBox}>
          Opłacone :&nbsp;
          <div className={styles.checkboxWrapper}>
            <div>
              <input type="checkbox" 
                checked={yesCheckedPaid} 
                value={true} 
                className={styles.checkboxInfo} 
                onChange={handleYesChangePaid} />
              Tak
            </div>
            
            <div>
              <input 
                type="checkbox" 
                checked={noCheckedPaid} 
                className={styles.checkboxInfo} 
                onChange={handleNoChangePaid} />
              Nie
            </div>
          </div>
        </div>

        <div className={styles.infoBox}>
          Udział rodziny :&nbsp;
          <div className={styles.checkboxWrapper}>
            <div>
              <input type="checkbox" 
                checked={yesChecked} 
                value={true} 
                className={styles.checkboxInfo} 
                onChange={handleYesChange} />
              Tak
            </div>
            
            <div>
              <input 
                type="checkbox" 
                checked={noChecked} 
                className={styles.checkboxInfo} 
                onChange={handleNoChange} />
              Nie
            </div>
          </div>
        </div>

        {/* <div className={styles.infoBox}>
          <label>Udział rodziny :&nbsp;</label>
          <button onClick={toggleMenuFamily} className={styles.optionButtonFamily}>{family}</button>
          {isOpenFamily && (
            <div className={styles.toggleMenu}>
              <div onClick={() => handleOptionClickFamily('tak')} className={styles.religionButtonWrapper}><button className={styles.familyButton}>{religion === 'tak' ? <strong>tak</strong> : 'tak'}</button></div>
              <div onClick={() => handleOptionClickFamily('nie')} className={styles.religionButtonWrapper}><button className={styles.familyButton}>{religion === 'nie' ? <strong>nie</strong> : 'nie'}</button></div>
            </div>
          )}
        </div>   */}

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
                  <div className={styles.companyOtherWrapper}>
                    {selectedOptionCompany === 'Inna' && (
                      <div className={styles.companyOtherWrapper}>
                        <input type="text" value={inputValueCompany} onChange={handleInputChangeCompany} className={styles.otherCompanyInput} />
                        <button onClick={closeCompanies} className={styles.submitOtherCompanyButton}>zatwierdź</button>
                      </div>
                    )}
                  </div>
              </div>
            </div>
          )}
        </div>   

        <div className={styles.infoBox}>
          <label>Cmentarz :&nbsp;</label>
          <button onClick={toggleMenuCemetery} className={styles.optionButton}>{cemetery}</button>
          {isOpenCemetery && (
            <div className={styles.toggleMenuCompany}>
              {cemeteries.map(singleCemetery => {
                return (
                  <div onClick={() => handleOptionClickCemetery(singleCemetery)} className={styles.companyButtonWrapper}>
                    <button className={styles.companyButton}>
                      <p className={styles.companyNameOnButton}>{selectedOptionCemetery === singleCemetery ? <strong>{singleCemetery}</strong> : singleCemetery}</p>
                    </button>
                  </div>
                )
              })}

              <div onClick={() => handleOptionClickCemeteryOther('Inna')}  className={styles.companyButtonWrapper}><button className={styles.companyButton}>
                <p className={styles.companyNameOnButton}>{selectedOptionCemetery === 'Inna' ? <strong>Inna</strong> : 'Inna'}</p></button>
                  <div className={styles.companyOtherWrapper}>
                    {selectedOptionCemetery === 'Inna' && (
                      <div className={styles.companyOtherWrapper}>
                        <input type="text" value={inputValueCemetery} onChange={handleInputChangeCemetery} className={styles.otherCompanyInput} />
                        <button onClick={closeCemeteries} className={styles.submitOtherCompanyButton}>zatwierdź</button>
                      </div>
                    )} 
                  </div>
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

        isFromEdit={props.isFromEdit}
        setIsFromEdit={props.setIsFromEdit}

        handleDateChange={props.handleDateChange}

        responseData={props.responseData} 
        isLoading={props.isLoading}
        
        paid={paid}
        dateofdeath={dateofdeath}
        cemetery={cemetery}
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