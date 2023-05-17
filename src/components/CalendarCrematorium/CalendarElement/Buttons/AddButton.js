import styles from './Buttons.module.scss';
import axios from 'axios';

function AddButton(props) {

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
      name: '',
      surname: '',
      weight: 0,
      family: '',
      company: '',
      religion: '',
      otherInfo: '',
      time: props.time,
      date: props.date,
      day: props.day,
      month: props.month,
      year: props.year,
    };
    axios.post('http://localhost:8000/polls/addtodatabase/', data, {
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
    const data = { day: day, month: month, year: year };
    const sessionid = props.getCookie("jwt_token");
  
    // props.setIsLoading(true); // ustawienie stanu ładowania na true
  
    axios.post('http://localhost:8000/polls/readfromdatabase/', { day, month, year }, {
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
      <button onClick={() => {
        props.setIsFromEdit(false);
        addButtonClick(props.time);
        props.setTime(props.time);
        props.openWindow();}} >DODAJ
      </button>
    </div>
  )
}

export default AddButton;