import styles from './Box.module.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SubmitButton from './SubmitButton/SubmitButton';
import CloseBoxButton from './CloseBoxButton/CloseBoxButton';
import axios from 'axios';

function Box(props) {

  // let initialName = '';

  // console.log(props)

  // const handleDateChange = (date, event) => {
  //   // setDate(date);
  //   // setShowTime(true);
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
  //   const year = date.getFullYear();
  //   const data = { day: day, month: month, year: year };
  //   const sessionid = props.getCookie("jwt_token");
  //   // console.log(sessionid);

  //   // setIsLoading(true); // ustawienie stanu ładowania na true

  //   axios.post('http://localhost:8000/polls/readfromdatabase/', { day, month, year }, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': sessionid
  //     },
  //     withCredentials: true
  //   })
  //     .then(response => {
  //       console.log(event);
  //       // eslint-disable-next-line array-callback-return
  //       // const reservations = response.data.results.map(reservation => {
  //       //   let responseDataTime = reservation.time.substring(0, reservation.time.length - 3);

  //       //   if(event === responseDataTime) {
  //       //     console.log('TUTAJ: ', responseDataTime);
  //       //   }
  //       //   return '';
  //       // })

  //       // console.log(reservations);
  //       for (let reservation of response.data.results) {
  //         let responseDataTime = reservation.time.substring(0, reservation.time.length - 3);
  //         // console.log('TUTAJ: ', responseDataTime)
  //         if(event === responseDataTime) {
  //           console.log('TUTAJ: ', reservation);

  //           // initialName = name;

  //         }
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       // handle error
  //     });
  // };

  // // if (x === 0) {
  // handleDateChange(props.date, props.event);
  //   // console.(props.event);
  //   x = 1;
  // }

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

  // weight

  if (!responseDataInitial.weight) {responseDataInitial.weight = ''}
  if (responseDataInitial.weight === 0) {responseDataInitial.weight = ''}
  if (responseDataInitial.weight === '0') {responseDataInitial.weight = ''}

  const parsedWeight = parseInt(responseDataInitial.weight);

  const [weight, setWeight] = useState(parsedWeight);

  const handleWeightInputChange = (event) => {
    const value = event.target.value;
    setWeight(value);
  };

  // family

  let familyValue;

  if (responseDataInitial.family === 'tak') {
    familyValue = true;
  } else if (responseDataInitial.family === 'nie') {
    familyValue = false;
  }

  const [family, setFamily] = useState(familyValue);
  const [yesChecked, setYesChecked] = useState(responseDataInitial.family === 'tak');
  const [noChecked, setNoChecked] = useState(responseDataInitial.family === 'nie');

  const handleYesChange = () => {
    setYesChecked(true);
    setNoChecked(false);
    setFamily(true);
  };

  const handleNoChange = () => {
    setYesChecked(false);
    setNoChecked(true);
    setFamily(false);
  };

  // if(responseDataInitial.family === 'tak') {
  //   setYesChecked(true);
  //   setNoChecked(false);
  // }
  // if(responseDataInitial.family === 'false') {
  //   handleNoChange();
  // }

  // const [family, setFamily] = useState('');
  
  // if (yesChecked === true ) {
  //   setFamily(true);
  // } else if (noChecked === true ) {
  //   setFamily(false);
  // }

  //

  // if (!responseDataInitial.family) {responseDataInitial.family = ''}

  // const [family, setFamily] = useState(responseDataInitial.family);
  const [isOpenFamily, setIsOpenFamily] = useState(false);


  const toggleMenuFamily = () => {
    if (isOpenCompany === false && isOpenReligion === false) {
      setIsOpenFamily(!isOpenFamily);
    }
  };

  const handleOptionClickFamily = (option) => {
    setFamily(option);
    setIsOpenFamily(false);
  };

  // religion

  if (!responseDataInitial.religion) {responseDataInitial.religion = ''}

  const [religion, setReligion] = useState(responseDataInitial.religion);
  const [isOpenReligion, setIsOpenReligion] = useState(false);


  const toggleMenuReligion = () => {
    if (isOpenCompany === false && isOpenFamily === false) {
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

  if (!responseDataInitial.company) {responseDataInitial.company = ''}

  const [isOpenCompany, setIsOpenCompany] = useState(false);
  const [selectedOptionCompany, setSelectedOptionCompany] = useState(responseDataInitial.company);
  const [inputValueCompany, setInputValueCompany] = useState('');
  let company;

  const toggleMenuCompany = () => {
    if (isOpenReligion === false && isOpenFamily === false) {
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

        isFromEdit={props.isFromEdit}
        setIsFromEdit={props.setIsFromEdit}

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