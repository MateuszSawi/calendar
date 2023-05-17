import {useState} from 'react';
import styles from './Header.module.scss';
import { FaUser } from 'react-icons/fa';

function Header(props) {

  console.log(props)
  
return (
  <header className={styles.header}>
    <div className={styles.headerInner}>
      <div className={styles.imgDiv}>
        <img alt="zielen" src={process.env.PUBLIC_URL + 'logo_zielen_oryginalne.png'} />
      </div>

      <div className={styles.userDiv}>
        <div className={styles.user}>
          <FaUser size="1.4em" />
        </div>
        <div className={styles.user}>
          {props.userName}
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header;