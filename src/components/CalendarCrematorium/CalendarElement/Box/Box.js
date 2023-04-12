import styles from './Box.module.scss';

function Box(props) {

  const closeWindow = () => {
    if (props.windowVisibility === true) {
      props.setWindowVisibility(false);
      console.log(props.windowVisibility);
    }
  };

return (
  <div className={props.windowVisibility ? 'your_className': null}>
  <button className={styles.closeWindowButton} onClick={closeWindow} >X</button>
    
  </div>
  )
}

export default Box;