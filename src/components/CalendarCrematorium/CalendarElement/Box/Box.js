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
      setMessage('');
      handleClick();
      if (props.windowVisibility === true) {
        props.setWindowVisibility(false);
        props.setEvent('');
      }
    }
  }

  // message

  const [message, setMessage] = useState('');

  const handleClick = () => {};

  // filter

  const obj = [
    name,
    surname,
    weight,
    family,
    religion,
    company
  ]

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
        <button onClick={toggleMenuReligion} className={styles.optionButton}>{religion}</button>
        {isOpenReligion && (
          <div className={styles.toggleMenu}>
            <div onClick={() => handleOptionClickReligion('chrześcijaństwo')} className={styles.religionButtonWrapper}><button className={styles.religionButton}>{religion === 'chrześcijaństwo' ? <strong>chrześcijaństwo</strong> : 'chrześcijaństwo'}</button></div>
            <div onClick={() => handleOptionClickReligion('islam')} className={styles.religionButtonWrapper}><button className={styles.religionButton}>{religion === 'islam' ? <strong>islam</strong> : 'islam'}</button></div>
            <div onClick={() => handleOptionClickReligion('hinduizm')} className={styles.religionButtonWrapper}><button className={styles.religionButton}>{religion === 'hinduizm' ? <strong>hinduizm</strong> : 'hinduizm'}</button></div>
            <div onClick={() => handleOptionClickReligion('byddyzm')} className={styles.religionButtonWrapper}><button className={styles.religionButton}>{religion === 'byddyzm' ? <strong>byddyzm</strong> : 'byddyzm'}</button></div>
            <div onClick={() => handleOptionClickReligion('sikhizm')} className={styles.religionButtonWrapper}><button className={styles.religionButton}>{religion === 'sikhizm' ? <strong>sikhizm</strong> : 'sikhizm'}</button></div>
            <div onClick={() => handleOptionClickReligion('judaizm')} className={styles.religionButtonWrapper}><button className={styles.religionButton}>{religion === 'judaizm' ? <strong>judaizm</strong> : 'judaizm'}</button></div>
            <div onClick={() => handleOptionClickReligion('bahaizm')} className={styles.religionButtonWrapper}><button className={styles.religionButton}>{religion === 'bahaizm' ? <strong>bahaizm</strong> : 'bahaizm'}</button></div>
            <div onClick={() => handleOptionClickReligion('bezwyznaniowi')} className={styles.religionButtonWrapper}><button className={styles.religionButton}>{religion === 'bezwyznaniowi' ? <strong>bezwyznaniowi</strong> : 'bezwyznaniowi'}</button></div>
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