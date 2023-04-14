import styles from './Box.module.scss';
import React, { useState } from 'react';

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
  const [selectedOptionCompany, setSelectedOptionCompany] = useState('');
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

  //

  console.log(
    '++++++++++ ZMIENNE ++++++++++',
    'name: ', name,
    'surname: ', surname,
    'weight: ', weight,
    'family: ', family,
    'religion: ', religion,
    'company: ', company,
    'otherInfo: ', otherInfo,
    ' '
  )

return (
  <div className={styles.window}>
    <div className={styles.innerWindow}>
      <div>
        <div>
          <label><strong>{props.event} {props.dayOfTheWeek} {props.fixedDate}</strong></label>
        </div>
        
        <label>
          Imię :&nbsp;
          <input
            type="text"
            value={name}
            onChange={handleNameInputChange}
            placeholder="Podaj imię"
          />
        </label>

        <label>
          Nazwisko :&nbsp;
          <input
            type="text"
            value={surname}
            onChange={handleSurnameInputChange}
            placeholder="Podaj nazwisko"
          />
        </label>
      
        <label>
          Waga :&nbsp;
          <input
            type="number"
            value={weight}
            onChange={handleWeightInputChange}
            placeholder="Podaj wagę w kilogramach"
          />
          &nbsp;kg
        </label>

        <div>
          <label>
            Udział rodziny :&nbsp;
            <label>
              <input type="checkbox" checked={yesChecked} onChange={handleYesChange} />
              Tak
            </label>
            <label>
              <input type="checkbox" checked={noChecked} onChange={handleNoChange} />
              Nie
            </label>
          </label>
        </div>

        <div>
          <label>Wyznanie :&nbsp;</label>
          <button onClick={toggleMenuReligion}>{religion}</button>
          {isOpenReligion && (
            <ul className={styles.x}>
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

        <div>
          <button onClick={toggleMenuCompany}>{company}</button>
          {isOpenCompany && (
            <ul className={styles.x}>
              <li onClick={() => handleOptionClickCompany('Firma 1')}><button>{selectedOptionCompany === 'Firma 1' ? <strong>Firma 1</strong> : 'Firma 1'}</button></li>
              <li onClick={() => handleOptionClickCompany('Firma 2')}><button>{selectedOptionCompany === 'Firma 2' ? <strong>Firma 2</strong> : 'Firma 2'}</button></li>
              <li onClick={() => handleOptionClickCompany('Firma 3')}><button>{selectedOptionCompany === 'Firma 3' ? <strong>Firma 3</strong> : 'Firma 3'}</button></li>
              <li onClick={() => handleOptionClickCompany('Firma 4')}><button>{selectedOptionCompany === 'Firma 4' ? <strong>Firma 3</strong> : 'Firma 4'}</button></li>
              <li onClick={() => handleOptionClickCompany('Firma 5')}><button>{selectedOptionCompany === 'Firma 5' ? <strong>Firma 3</strong> : 'Firma 5'}</button></li>
              <li onClick={() => handleOptionClickCompany('Firma 6')}><button>{selectedOptionCompany === 'Firma 6' ? <strong>Firma 3</strong> : 'Firma 6'}</button></li>
              <li onClick={() => handleOptionClickCompany('Firma 7')}><button>{selectedOptionCompany === 'Firma 7' ? <strong>Firma 3</strong> : 'Firma 7'}</button></li>
              <li onClick={() => handleOptionClickCompany('Firma 8')}><button>{selectedOptionCompany === 'Firma 8' ? <strong>Firma 3</strong> : 'Firma 8'}</button></li>
              <li onClick={() => handleOptionClickCompany('Firma 9')}><button>{selectedOptionCompany === 'Firma 9' ? <strong>Firma 3</strong> : 'Firma 9'}</button></li>
              <li onClick={() => handleOptionClickCompany('Firma 10')}><button>{selectedOptionCompany === 'Firma 10' ? <strong>Firma 3</strong> : 'Firma 10'}</button></li>

              <li onClick={() => handleOptionClickCompanyOther('Inna')}><button>
                {selectedOptionCompany === 'Inna' ? <strong>Inna</strong> : 'Inna'}</button>
                {selectedOptionCompany === 'Inna' && (
                  <div>
                    <input type="text" value={inputValueCompany} onChange={handleInputChangeCompany} />
                    <button onClick={closeCompanies} >zatwierdź</button>
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

      <div>
        <button className={styles.closeWindowButton} onClick={closeWindow} >X</button>
      </div>
    </div>
      
    <label>Uwagi :&nbsp;</label>
    <textarea
      className={styles.textarea}
      value={otherInfo}
      onChange={handleOtherInfoInputChange}
    />

  </div>
  )
}

export default Box;