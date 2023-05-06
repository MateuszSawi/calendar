import styles from './Buttons.module.scss';
import axios from 'axios';

function Buttons(props) {

  // DELETE

  const handleDataDelete = () => {
    const data = { 
      exists: "0",
      name: props.name,
      surname: props.surname,
      weight: props.weight,
      family: props.family,
      company: props.company,
      religion: props.religion,
      otherInfo: props.otherInfo,
      time: props.time,
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
      console.log(response.data);
      // do something with response data
    })
    .catch(error => {
      console.error(error);
      // handle error
    });
  };








  // EDIT

  const handleDataEdit = () => {
    const data = { 
      exists: "2",
      name: props.name,
      surname: props.surname,
      weight: props.weight,
      family: props.family,
      company: props.company,
      religion: props.religion,
      otherInfo: props.otherInfo,
      time: props.time,
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
      console.log(response.data);
      // do something with response data
    })
    .catch(error => {
      console.error(error);
      // handle error
    });
  };
 
  return (
    <div className={styles.buttonsWrapper}>
    {props.addButtonVisibility && (
      <button onClick={() => {
        props.setTime(props.time);
        props.openWindow();
      }}> DODAJ </button>
    )} 

    {!props.addButtonVisibility && (
      <div className={styles.responseInfoButtons}>
      <button onClick={() => {
        handleDataEdit();
      }}> EDYTUJ </button>

      <button onClick={() => {
        handleDataDelete();
      }}> USUŃ </button>
    </div>
    )} 
  </div>
  )
}

export default Buttons;