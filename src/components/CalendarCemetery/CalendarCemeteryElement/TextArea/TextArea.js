import styles from './TextArea.module.scss';
import { useState, useEffect } from "react";
import axios from 'axios';

function TextArea(props) {

  const [isLoading, setIsLoading] = useState(false);

  //
 
  // const [textArea, setTextArea] = useState('');

  const handleChange = (event) => {
    props.setTextArea(event.target.value);
  };

  // useEffect(() => {
  //   readTextArea();
  // }, []);

  

  const updateTextArea = () => {
    axios.post('/polls/addtb', { 
      day: props.day, 
      month: props.month, 
      year: props.year, 
      calendar : props.cemetery,
      textfield: props.textArea
    },{
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
      .then(response => {
  
        // console.log(response)
      })
      .catch(error => {
        console.error(error);
      });
  };

  const submitForm = () => {
    props.setIsLoadingTextArea(true);
    updateTextArea();
    props.readTextArea(props.day, props.month, props.year, props.cemetery);

    setTimeout(() => { // wymuszenie minimum czasu ładowania
      props.readTextArea(props.day, props.month, props.year, props.cemetery);
    }, 1000); // czas ładowania w milisekundach

    setTimeout(() => { // wymuszenie minimum czasu ładowania
      props.setIsLoadingTextArea(false);
    }, 2000); // czas ładowania w milisekundach
  }

  // console.log(props.textArea)

  return (
    <div className={styles.wrapper}>

      {props.isLoadingTextArea ? <div className={styles.loading}>Ładowanie...</div> : (
        <textarea className={styles.textarea} value={props.textArea} onChange={handleChange}></textarea>
      )}
      <button className={styles.button}
        onClick={() => {
          submitForm();
          // handleDataSend();
        }} >Zapisz zmiany</button>
    </div>
  )
}

export default TextArea;