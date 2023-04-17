import styles from './Box.module.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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

  let family;
  if (yesChecked === true ) {
    family = 'yes';
  } else if (noChecked === true ) {
    family = 'no';
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

  // const data = useSelector((state) => state.data.crematorium);

  // const [reservations, setReservations] = useState(data);

  // // console.log('year: ', props.year, '|', 'month: ', props.month, '|','day: ', props.day, '|','time: ', props.event);
  // console.log('DATA: ', data);

  // for (let year in data) {
  //   if (year === '2023'){
  //     console.log(year);
  //     for(let month in year) {
  //       console.log(month);
  //     }
  //   }
  // }

  // console.log(
  //   '++++++++++ ZMIENNE ++++++++++',
  //   'name: ', name,
  //   'surname: ', surname,
  //   'weight: ', weight,
  //   'family: ', family,
  //   'religion: ', religion,
  //   'company: ', company,
  //   'otherInfo: ', otherInfo,
  //   ' '
  // )

  let year = props.year.toString();
  let month = props.month.toString();
  let day = props.day.toString();
  let time = props.event.toString();

  // submitForm button

  const [message, setMessage] = useState('');

  const handleClick = () => {};
    // setMessage('Kliknięto przycisk!');
  // };

  const obj = [
    name,
    surname,
    weight,
    family,
    religion,
    company
  ]

  const submitForm = () => {
    // if (name === '') {
    //   handleClick();
    //   setMessage('Imie');
    // } else if (surname === '') {
    //   handleClick();
    //   setMessage('Nazwisko');
    // } else if (weight === '') {
    //   handleClick();
    //   setMessage('Waga');
    // } else if (family === undefined) {
    //   handleClick();
    //   setMessage('Rodzina');
    // } else if (religion === 'wybierz') {
    //   handleClick();
    //   setMessage('Religia');
    // } else if (company === 'wybierz' || company === '') {
    //   handleClick();
    //   setMessage('Firma');
    // } else {
    //   console.log('name: ', name, 'surname: ', surname, 'weight: ', weight,
    //   'family: ', family,  'religion: ',religion, 'company: ', company,  'otherInfo: ', otherInfo);
    //   console.log('DANE: ', year, month, day, time);
    // }

    if (name === '' || surname === '' || weight === '' || family === undefined || religion === 'wybierz' || company === 'wybierz' || company === '') {
      setMessage('Błędne wypełnienie!');
      handleClick();
    } else {
      // console.log('name: ', name, 'surname: ', surname, 'weight: ', weight,
      // 'family: ', family,  'religion: ',religion, 'company: ', company,  'otherInfo: ', otherInfo);
      // console.log('DANE: ', year, month, day, time);
      setMessage('');
      handleClick();

      if (props.windowVisibility === true) {
        props.setWindowVisibility(false);
        props.setEvent('');
      }


    }

    // for (let one of obj ) {
    //   console.log(one);
    //   handleClick();
    // }

  }

return (
  <div className={styles.window}>

    <div className={styles.labelInnerWindow}>
      <div 
      // className={styles.chosenTime}
      >
        <label><strong>{props.event} {props.dayOfTheWeek} {props.fixedDate}</strong></label>
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
        <button onClick={toggleMenuReligion}>{religion}</button>
        {isOpenReligion && (
          <ul className={styles.toggleMenu}>
            <li onClick={() => handleOptionClickReligion('chrześcijaństwo')}><button>{religion === 'chrześcijaństwo' ? <strong>chrześcijaństwo</strong> : 'chrześcijaństwo'}</button></li>
            <li onClick={() => handleOptionClickReligion('islam')}><button>{religion === 'islam' ? <strong>islam</strong> : 'islam'}</button></li>
            <li onClick={() => handleOptionClickReligion('hinduizm')}><button>{religion === 'hinduizm' ? <strong>hinduizm</strong> : 'hinduizm'}</button></li>
            <li onClick={() => handleOptionClickReligion('byddyzm')}><button>{religion === 'byddyzm' ? <strong>byddyzm</strong> : 'byddyzm'}</button></li>
            <li onClick={() => handleOptionClickReligion('sikhizm')}><button>{religion === 'sikhizm' ? <strong>sikhizm</strong> : 'sikhizm'}</button></li>
            <li onClick={() => handleOptionClickReligion('judaizm')}><button>{religion === 'judaizm' ? <strong>judaizm</strong> : 'judaizm'}</button></li>
            <li onClick={() => handleOptionClickReligion('bahaizm')}><button>{religion === 'bahaizm' ? <strong>bahaizm</strong> : 'bahaizm'}</button></li>
            <li onClick={() => handleOptionClickReligion('bezwyznaniowi')}><button>{religion === 'bezwyznaniowi' ? <strong>bezwyznaniowi</strong> : 'bezwyznaniowi'}</button></li>
          </ul>
        )}
      </div>

      <div className={styles.infoBox}>
        <label>Firma :&nbsp;</label>
        <button onClick={toggleMenuCompany}>{company}</button>
        {isOpenCompany && (
          <ul className={styles.toggleMenu}>
            <li onClick={() => handleOptionClickCompany('Firma 1')}><button>{selectedOptionCompany === 'Firma 1' ? <strong>Firma 1</strong> : 'Firma 1'}</button></li>
            <li onClick={() => handleOptionClickCompany('Firma 2')}><button>{selectedOptionCompany === 'Firma 2' ? <strong>Firma 2</strong> : 'Firma 2'}</button></li>
            <li onClick={() => handleOptionClickCompany('Firma 3')}><button>{selectedOptionCompany === 'Firma 3' ? <strong>Firma 3</strong> : 'Firma 3'}</button></li>
            <li onClick={() => handleOptionClickCompany('Firma 4')}><button>{selectedOptionCompany === 'Firma 4' ? <strong>Firma 4</strong> : 'Firma 4'}</button></li>
            <li onClick={() => handleOptionClickCompany('Firma 5')}><button>{selectedOptionCompany === 'Firma 5' ? <strong>Firma 5</strong> : 'Firma 5'}</button></li>
            <li onClick={() => handleOptionClickCompany('Firma 6')}><button>{selectedOptionCompany === 'Firma 6' ? <strong>Firma 6</strong> : 'Firma 6'}</button></li>
            <li onClick={() => handleOptionClickCompany('Firma 7')}><button>{selectedOptionCompany === 'Firma 7' ? <strong>Firma 7</strong> : 'Firma 7'}</button></li>
            <li onClick={() => handleOptionClickCompany('Firma 8')}><button>{selectedOptionCompany === 'Firma 8' ? <strong>Firma 8</strong> : 'Firma 8'}</button></li>
            <li onClick={() => handleOptionClickCompany('Firma 9')}><button>{selectedOptionCompany === 'Firma 9' ? <strong>Firma 9</strong> : 'Firma 9'}</button></li>
            <li onClick={() => handleOptionClickCompany('Firma 10')}><button>{selectedOptionCompany === 'Firma 10' ? <strong>Firma 10</strong> : 'Firma 10'}</button></li>

            <li onClick={() => handleOptionClickCompanyOther('Inna')}><button>
              {selectedOptionCompany === 'Inna' ? <strong>Inna</strong> : 'Inna'}</button>
              {selectedOptionCompany === 'Inna' && (
                <div>
                  <input type="text" value={inputValueCompany} onChange={handleInputChangeCompany} />
                  <button onClick={closeCompanies}>zatwierdź</button>
                </div>
              )}
            </li>
          </ul>
        )}
        {/* {selectedOptionCompany && (
          <p>You selected: {selectedOptionCompany}</p>
        )}
        {selectedOptionCompany === 'Inna' && (
          <p>You typed: {inputValueCompany}</p>
        )} */}
      </div>

      
    </div>
      
    <label>Uwagi :&nbsp;</label>
    <textarea
      className={styles.textarea}
      value={otherInfo}
      onChange={handleOtherInfoInputChange}
    />

    <div className={styles.submitWrapper}>
      <div className={styles.submitButtonDiv}>
        <button className={styles.submitButton} onClick={submitForm} >Rezerwuj</button>
      </div>
      {message && <div className={styles.message}>{message}</div>}
    </div>

  </div>
  )
}

export default Box;