import styles from './ButtonsCemetery.module.scss';
import axios from 'axios';

function AddButtonCemetery(props) {

  // DODAJ

  const addButtonClick = (time) => {
    handleDataSend();

    if (props.windowVisibility === true) {
      props.setWindowVisibility(false);
      props.setEvent('');
    }

    handleDateChangeOnAdd(props.date);
    // console.log('0');

    setTimeout(() => { // wymuszenie minimum czasu ładowania
      handleDateChangeOnAdd(props.date);
      // console.log('1');
    }, 2000);
  }

  const handleDataSend = () => {
    const data = { 
      exists: "1",
      cemetery: props.cemetery,
      name: '',
      surname: '',
      trumpet: true,
      orchestra: true,
      company: '',
      placeofentry: '',
      burialplace: '',
      burialtype: '',
      servicedescription: '',
      others: '',
      time: props.time,
      date: props.date,
      day: props.day,
      month: props.month,
      year: props.year,
    };
    axios.post('http://localhost:8000/polls/addtocemetery/', data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(response => { 
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleDateChangeOnAdd = (date) => {
    props.setDate(date);
    props.setShowTime(true);
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
    const year = date.getFullYear();
    const data = { day: day, month: month, year: year, cemetery:props.cemetery };
    const sessionid = props.getCookie("jwt_token");
  
    let cemetery = props.cemetery;
    // props.setIsLoading(true); // ustawienie stanu ładowania na true
  
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
      }, 2000); // czas ładowania w milisekundach
    })
    .catch(error => {
      console.error(error);
    });
  };
 
  return (
    <div className={styles.addButtonWrapper}>
      {props.authorities === 3 || props.authorities === 2 ? (
        <button onClick={() => {
          props.setIsFromEdit(false);
          addButtonClick(props.time);
          props.setTime(props.time);
          props.openWindow();}} >DODAJ
        </button>
      ) : null}
    </div>
  )
}

export default AddButtonCemetery;