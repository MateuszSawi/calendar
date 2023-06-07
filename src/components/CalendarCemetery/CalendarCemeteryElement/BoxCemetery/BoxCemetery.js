import styles from './BoxCemetery.module.scss';
import React, { useState } from 'react';
import SubmitButtonCemetery from './SubmitButtonCemetery/SubmitButtonCemetery';
import CloseBoxButtonCemetery from './CloseBoxButtonCemetery/CloseBoxButtonCemetery';
import HourForm from './HourForm/HourForm';

function BoxCemetery(props) {

  let responseDataInitial = [];

  props.responseData.results.map(response => {
    let responseDataTime = response.time.substring(0, response.time.length - 3);

    if (props.event === responseDataTime) {
      responseDataInitial = response;
    }
  })

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

  // // weight

  // if (!responseDataInitial.weight) {responseDataInitial.weight = ''}
  // if (responseDataInitial.weight === 0) {responseDataInitial.weight = ''}
  // if (responseDataInitial.weight === '0') {responseDataInitial.weight = ''}

  // const parsedWeight = parseInt(responseDataInitial.weight);

  // const [weight, setWeight] = useState(parsedWeight);

  // const handleWeightInputChange = (event) => {
  //   const value = event.target.value;
  //   setWeight(value);
  // };

  // trumpet

  if (!responseDataInitial.trumpet) {responseDataInitial.trumpet = ''}

  const [trumpet, setTrumpet] = useState(responseDataInitial.trumpet);
  const [yesCheckedTrumpet, setYesCheckedTrumpet] = useState(trumpet === 'tak');
  const [noCheckedTrumpet, setNoCheckedTrumpet] = useState(trumpet === 'nie');

  const handleYesChangeTrumpet = () => {
    setYesCheckedTrumpet(!yesCheckedTrumpet);
    setNoCheckedTrumpet(false);
    if (trumpet === 'nie' || trumpet === '') {
      setTrumpet('tak');
    } else {
      setTrumpet('');
    }
  };

  const handleNoChangeTrumpet = () => {
    setYesCheckedTrumpet(false);
    setNoCheckedTrumpet(!noCheckedTrumpet);
    setTrumpet('nie');
    if (trumpet === 'tak' || trumpet === '') {
      setTrumpet('nie');
    } else {
      setTrumpet('');
    }
  };

  // orchestra

  if (!responseDataInitial.orchestra) {responseDataInitial.orchestra = ''}

  const [orchestra, setOrchestra] = useState(responseDataInitial.orchestra);
  const [yesCheckedOrchestra, setYesCheckedOrchestra] = useState(orchestra === 'tak');
  const [noCheckedOrchestra, setNoCheckedOrchestra] = useState(orchestra === 'nie');

  const handleYesChangeOrchestra = () => {
    setYesCheckedOrchestra(!yesCheckedOrchestra);
    setNoCheckedOrchestra(false);
    if (orchestra === 'nie' || orchestra === '') {
      setOrchestra('tak');
    } else {
      setOrchestra('');
    }
  };

  const handleNoChangeOrchestra = () => {
    setYesCheckedOrchestra(false);
    setNoCheckedOrchestra(!noCheckedOrchestra);
    if (orchestra === 'tak' || orchestra === '') {
      setOrchestra('nie');
    } else {
      setOrchestra('');
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

  const [isOpenCompany, setIsOpenCompany] = useState(false);
  const [selectedOptionCompany, setSelectedOptionCompany] = useState(responseDataInitial.company);
  const [inputValueCompany, setInputValueCompany] = useState('');
  let company;

  const toggleMenuCompany = () => {
    if (isOpenPlaceofentry === false && isOpenBurialPlace === false && isOpenBurialtype === false) {
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

  // placeofentry

  const entryPlaces = [
    'Od bramy głównej',
    'Od bramy ul. Cedrowa',
    'Od bramy ul. Kartuska',
    'Z kaplicy',
    'Przy kaplicy',
    'Przy grobie',
    'Przy Niszy',
    'Przy Grobowcu',
  ];      

  if (!responseDataInitial.placeofentry) {responseDataInitial.placeofentry = ''}

  const [placeofentry, setPlaceofentry] = useState(responseDataInitial.placeofentry);
  const [selectedOptionPlaceofentry, setSelectedOptionPlaceofentry] = useState(responseDataInitial.placeofentry);
  const [isOpenPlaceofentry, setIsOpenPlaceofentry] = useState(false);


  const toggleMenuPlaceofentry = () => {
    if (isOpenCompany === false && isOpenBurialPlace === false && isOpenBurialtype === false) {
      setIsOpenPlaceofentry(!isOpenPlaceofentry);
    }
  };

  const handleOptionClickPlaceofentry = (option) => {
    setPlaceofentry(option);
    setIsOpenPlaceofentry(false);
    setSelectedOptionPlaceofentry(option);
  };

  // burialplace

  const burialPlaces = [
    'Na nowym miejscu',
    'Na miejscu odzyskanym',
    'Na nowym miejscu do pochówku urnowego',
    'Do grobu rodzinnego',
    'Na miejscu rezerwowym',
    'Do grobowca',
    'Do grobowca dla dzieci martwo-narodzonych',
    'Do kolumbarium',
    'Do murowanego grobu zbiorowego dla urn',
    'Ekshumacja'
  ];      

  if (!responseDataInitial.burialplace) {responseDataInitial.burialplace = ''}

  const [burialplace, setBurialPlace] = useState(responseDataInitial.burialplace);
  const [selectedOptionBurialplace, setSelectedOptionBurialplace] = useState(responseDataInitial.burialplace);
  const [isOpenBurialPlace, setIsOpenBurialPlace] = useState(false);


  const toggleMenuBurialPlace = () => {
    if (isOpenCompany === false && isOpenPlaceofentry === false && isOpenBurialtype === false) {
      setIsOpenBurialPlace(!isOpenBurialPlace);
    }
  };

  const handleOptionClickBurialPlace = (option) => {
    setBurialPlace(option);
    setIsOpenBurialPlace(false);
    setSelectedOptionBurialplace(option);
  };

  // burialtype

  const burialTypes = [
    'Trumna',
    'Urna'
  ];      

  if (!responseDataInitial.burialtype) {responseDataInitial.burialtype = ''}

  const [burialtype, setBurialtype] = useState(responseDataInitial.burialtype);
  const [selectedOptionBurialtype, setSelectedOptionBurialtype] = useState(responseDataInitial.burialtype);
  const [isOpenBurialtype, setIsOpenBurialtype] = useState(false);


  const toggleMenuBurialtype = () => {
    if (isOpenCompany === false && isOpenPlaceofentry === false && isOpenBurialPlace === false) {
      setIsOpenBurialtype(!isOpenBurialtype);
    }
  };

  const handleOptionClickBurialtype = (option) => {
    setBurialtype(option);
    setIsOpenBurialtype(false);
    setSelectedOptionBurialtype(option);
  };

  // servicedescription

  if (!responseDataInitial.servicedescription) {responseDataInitial.servicedescription = ''}

  const [servicedescription, setServiceDescription] = useState(responseDataInitial.servicedescription);

  const handleServiceDescriptionInputChange = (event) => {
    const value = event.target.value;
    setServiceDescription(value);
  };

  // others

  if (!responseDataInitial.others) {responseDataInitial.others = ''}

  const [others, setothers] = useState(responseDataInitial.others);

  const handleothersInputChange = (event) => {
    const value = event.target.value;
    setothers(value);
  };
 
  // filter

  let isMidnight = false;
  if (props.event === '00:00') {
    isMidnight = true;
  } else {
    isMidnight = false;
  }

  // // time form

  // const [isOpenMinute, setIsOpenMinute] = useState(false);
  // const [isOpenHour, setIsOpenHour] = useState(false);

  // const [selectedTime, setSelectedTime] = useState(false);
  // // let selectedTime;

  // console.log(selectedTime)

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
          <CloseBoxButtonCemetery
            closeWindow={closeWindow}
            windowVisibility={props.windowVisibility}
            setWindowVisibility={props.setWindowVisibility}
            setEvent={props.setEvent}
            date={props.date} 
      
            day={props.day}
            month={props.month}
            year={props.year}
            time={props.event}

            cemetery={props.cemetery}
            paid={paid}
      
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
            trumpet={trumpet}
            orchestra={orchestra}
            company={company}
            placeofentry={placeofentry}
            burialplace={burialplace}
            burialtype={burialtype}
            servicedescription={servicedescription}
            others={others}
          />
        </div>
      </div>

      <div className={styles.innerWindow}>

        {/* <HourForm 
          isOpenBurialPlace={isOpenBurialPlace}
          isOpenBurialtype={isOpenBurialtype}
          isOpenCompany={isOpenCompany}
          isOpenPlaceofentry={isOpenPlaceofentry}
          time={props.event}

          isOpenMinute={isOpenMinute}
          setIsOpenMinute={setIsOpenMinute}
          isOpenHour={isOpenHour}
          setIsOpenHour={setIsOpenHour}

          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}

          setEvent={props.setEvent}

          cemetery={props.cemetery}
        /> */}

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
      
        {/* <div className={styles.infoBoxKg}>
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
        </div> */}

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
          Trąbka :&nbsp;
          <div className={styles.checkboxWrapper}>
            <div>
              <input type="checkbox" 
                checked={yesCheckedTrumpet} 
                value={true} 
                className={styles.checkboxInfo} 
                onChange={handleYesChangeTrumpet} />
              Tak
            </div>
            
            <div>
              <input 
                type="checkbox" 
                checked={noCheckedTrumpet} 
                className={styles.checkboxInfo} 
                onChange={handleNoChangeTrumpet} />
              Nie
            </div>
          </div>

          <div className={styles.checkBoxGap}></div>

          Organista :&nbsp;
          <div className={styles.checkboxWrapper}>
            <div>
              <input type="checkbox" 
                checked={yesCheckedOrchestra} 
                value={true} 
                className={styles.checkboxInfo} 
                onChange={handleYesChangeOrchestra} />
              Tak
            </div>
            
            <div>
              <input 
                type="checkbox" 
                checked={noCheckedOrchestra} 
                className={styles.checkboxInfo} 
                onChange={handleNoChangeOrchestra} />
              Nie
            </div>
          </div>
        </div>

        {/* <div className={styles.infoBox}>
          Organista :&nbsp;
          <div className={styles.checkboxWrapper}>
            <div>
              <input type="checkbox" 
                checked={yesCheckedOrchestra} 
                value={true} 
                className={styles.checkboxInfo} 
                onChange={handleYesChangeOrchestra} />
              Tak
            </div>
            
            <div>
              <input 
                type="checkbox" 
                checked={noCheckedOrchestra} 
                className={styles.checkboxInfo} 
                onChange={handleNoChangeOrchestra} />
              Nie
            </div>
          </div>
        </div> */}

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
          <label>Miejsce wyjścia :&nbsp;</label>
          <button onClick={toggleMenuPlaceofentry} className={styles.optionButton}>{placeofentry}</button>
          {isOpenPlaceofentry && (
            <div className={styles.toggleMenuCompany}>
              {entryPlaces.map(singleEntryPlace => {
                return (
                  <div onClick={() => handleOptionClickPlaceofentry(singleEntryPlace)} className={styles.companyButtonWrapper}>
                    <button className={styles.companyButton}>
                      <p className={styles.companyNameOnButton}>{selectedOptionPlaceofentry === singleEntryPlace ? <strong>{singleEntryPlace}</strong> : singleEntryPlace}</p>
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>   

        <div className={styles.infoBox}>
          <label>Miejsce pochówku :&nbsp;</label>
          <button onClick={toggleMenuBurialPlace} className={styles.optionButton}>{burialplace}</button>
          {isOpenBurialPlace && (
            <div className={styles.toggleMenuCompany}>
              {burialPlaces.map(singleBurialPlace => {
                return (
                  <div onClick={() => handleOptionClickBurialPlace(singleBurialPlace)} className={styles.companyButtonWrapper}>
                    <button className={styles.companyButton}>
                      <p className={styles.companyNameOnButton}>{selectedOptionBurialplace === singleBurialPlace ? <strong>{singleBurialPlace}</strong> : singleBurialPlace}</p>
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>   

        <div className={styles.infoBox}>
          <label>Rodzaj pochówku :&nbsp;</label>
          <button onClick={toggleMenuBurialtype} className={styles.optionButton}>{burialtype}</button>
          {isOpenBurialtype && (
            <div className={styles.toggleMenuCompany}>
              {burialTypes.map(singleBurialType => {
                return (
                  <div onClick={() => handleOptionClickBurialtype(singleBurialType)} className={styles.companyButtonWrapper}>
                    <button className={styles.burialButton}>
                      <p className={styles.companyNameOnButton}>{selectedOptionBurialtype === singleBurialType ? <strong>{singleBurialType}</strong> : singleBurialType}</p>
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <label>Opis usługi :&nbsp;</label>
      <textarea
        className={styles.textareaDesc}
        value={servicedescription}
        onChange={handleServiceDescriptionInputChange}
      />
        
      <label>Uwagi :&nbsp;</label>
      <textarea
        className={styles.textarea}
        value={others}
        onChange={handleothersInputChange}
      />

      <SubmitButtonCemetery
        windowVisibility={props.windowVisibility}
        setWindowVisibility={props.setWindowVisibility}
        setEvent={props.setEvent}
        date={props.date} 

        cemetery={props.cemetery}

        day={props.day}
        month={props.month}
        year={props.year}
        time={props.event}
        paid={paid}

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
        trumpet={trumpet}
        orchestra={orchestra}
        company={company}
        placeofentry={placeofentry}
        burialplace={burialplace}
        burialtype={burialtype}
        servicedescription={servicedescription}
        others={others} />
    </div>
  )
}

export default BoxCemetery;