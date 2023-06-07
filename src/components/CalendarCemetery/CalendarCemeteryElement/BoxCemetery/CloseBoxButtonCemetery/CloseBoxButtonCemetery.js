import styles from './CloseBoxButtonCemetery.module.scss';
import axios from 'axios';

function CloseBoxButtonCemetery(props) {

  const deleteButtonClick = (time) => {
    if (!props.isFromEdit) {
      handleDataDelete();

      handleDateChangeOnDelete(props.date);

      setTimeout(() => {
        handleDateChangeOnDelete(props.date);
      }, 2000);
    }
  }

  const handleDataDelete = () => {
    const data = { 
      exists: "0",
      cemetery: props.cemetery,
      name: props.name,
      surname: props.surname,
      trumpet: props.trumpet,
      orchestra: props.orchestra,
      company: props.company,
      placeofentry: props.placeofentry,
      burialplace: props.burialplace,
      burialtype: props.burialtype,
      servicedescription: props.servicedescription,
      others: props.others,
      time: props.time,
      day: props.day,
      month: props.month,
      year: props.year,
      paid: props.paid
    };
    axios.post('http://localhost:8000/polls/addtocemetery/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(response => {
      // console.log(response.data);
      // do something with response data
    })
    .catch(error => {
      console.error(error);
      // handle error
    });
  };

  const handleDateChangeOnDelete = (date) => {
    props.setDate(date);
    props.setShowTime(true);
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
    const year = date.getFullYear();
    const data = { day: day, month: month, year: year, cemetery: props.cemetery };
    const sessionid = props.getCookie("jwt_token");

    props.setIsLoading(true);
  
    // props.setIsLoading(true); // ustawienie stanu ładowania na true
    let cemetery = props.cemetery;
  
    axios.post('http://localhost:8000/polls/readcemetery/', { day, month, year, cemetery }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionid
      },
      withCredentials: true
    })
    .then(response => {
      props.setResponseData(response.data);

      setTimeout(() => { // wymuszenie minimum czasu ładowania
        props.setResponseData(response.data);
        // props.setIsLoading(false);
      }, 1000); // czas ładowania w milisekundach

      setTimeout(() => { // wymuszenie minimum czasu ładowania
        // props.setResponseData(response.data);
        props.setIsLoading(false);
      }, 2000); // czas ładowania w milisekundach
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <button className={styles.closeWindowButton} 
      onClick={() => {
        props.closeWindow();
        deleteButtonClick();
      }}>X
    </button>
  )
}

export default CloseBoxButtonCemetery;