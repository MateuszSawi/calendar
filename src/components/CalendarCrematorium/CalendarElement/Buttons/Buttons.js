import styles from './Buttons.module.scss';
import axios from 'axios';

function Buttons(props) {

  // DODAJ

  // const addButtonClick = (time) => {
  //   handleDataSend();

  //   if (props.windowVisibility === true) {
  //     props.setWindowVisibility(false);
  //     props.setEvent('');
  //   }

  //   handleDateChangeOnAdd(props.date);
  //   // console.log('0');

  //   setTimeout(() => { // wymuszenie minimum czasu ładowania
  //     handleDateChangeOnAdd(props.date);
  //     // console.log('1');
  //   }, 2000);
  // }

  // const handleDataSend = () => {
  //   const data = { 
  //     exists: "1",
  //     name: '',
  //     surname: '',
  //     weight: 0,
  //     family: '',
  //     company: '',
  //     religion: '',
  //     otherInfo: '',
  //     time: props.time,
  //     date: props.date,
  //     day: props.day,
  //     month: props.month,
  //     year: props.year,
  //   };
  //   axios.post('http://localhost:8000/polls/addtodatabase/', data, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     withCredentials: true,
  //   })
  //   .then(response => {
  //     // console.log('HH',response.data);
      
  //   })
  //   .catch(error => {
  //     console.error(error);
  //     // handle error
  //   });
  // };

  // const handleDateChangeOnAdd = (date) => {
  //   props.setDate(date);
  //   props.setShowTime(true);
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1; // add 1 since getMonth() returns zero-based index
  //   const year = date.getFullYear();
  //   const data = { day: day, month: month, year: year };
  //   const sessionid = props.getCookie("jwt_token");
  
  //   // props.setIsLoading(true); // ustawienie stanu ładowania na true
  
  //   axios.post('http://localhost:8000/polls/readfromdatabase/', { day, month, year }, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': sessionid
  //     },
  //     withCredentials: true
  //   })
  //   .then(response => {
  //     props.setResponseData(response.data);

  //     setTimeout(() => { // wymuszenie minimum czasu ładowania
  //       props.setResponseData(response.data);
  //     }, 2000); // czas ładowania w milisekundach
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  // };

  // USUŃ

  const deleteButtonClick = (time) => {
    handleDataDelete();

    handleDateChangeOnDelete(props.date);

    setTimeout(() => {
      handleDateChangeOnDelete(props.date);
    }, 2000);
  }

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
    const data = { day: day, month: month, year: year };
    const sessionid = props.getCookie("jwt_token");

    props.setIsLoading(true);
  
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
        props.setIsLoading(false);
      }, 2000); // czas ładowania w milisekundach
    })
    .catch(error => {
      console.error(error);
    });
  };








  // EDYTUJ

  const editButtonClick = (time) => {
    handleDataEdit();

    if (props.windowVisibility === true) {
      props.setWindowVisibility(false);
      props.setEvent('');
    }

    handleDateChangeOnEdit(props.date);
    // console.log('0');

    setTimeout(() => { // wymuszenie minimum czasu ładowania
      handleDateChangeOnEdit(props.date);
      // console.log('1');
    }, 2000);
  }

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

  const handleDateChangeOnEdit = (date) => {
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

  // console.log(props.addButtonVisibility);
 
  return (
    <div className={styles.buttonsWrapper}>
      {/* {props.addButtonVisibility && (
        <button onClick={() => {
          addButtonClick(props.time);
          props.setTime(props.time);
          props.openWindow();
        }}> DODAJ </button>
      )}  */}

      {!props.addButtonVisibility && (
        <div className={styles.responseInfoButtons}>
        <button onClick={() => {
          editButtonClick();
          props.setTime(props.time);
          props.openWindow();
        }}> EDYTUJ </button>

        <button onClick={() => {
          deleteButtonClick();
        }}> USUŃ </button>
      </div>
      )} 
    </div>
  )
}

export default Buttons;