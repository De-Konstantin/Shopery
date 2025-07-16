import React from 'react';
import styles from './Header.module.scss';
import Adress from '../../components/Adress/Adress';
import ChangeCurrency from '../../features/ChangeCurrency/ChangeCurrency';
import ChangeLanguage from '../../features/ChangeLang/ChangeLang';
import { Link } from 'react-router-dom';
function HeaderTop() {
  return (
    <div className={styles.headerTop}>
      <div className={`${styles.headerTop__container} _container`}>
        <Adress />

        <div className={styles.headerTop__controls}>
          <ChangeCurrency />
          <ChangeLanguage />
          <span>|</span>
          <Link to="/login" className={styles.headerTop__link}>
            Sign In
          </Link>
          <span>/</span>
          <Link
            to="/CreateAccount"
            className={styles.headerTop__link}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
