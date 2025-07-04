import React from 'react';
import styles from './Header.module.scss';
import Adress from '../../components/Adress/Adress';
import ChangeCurrency from '../../features/ChangeCurrency/ChangeCurrency';
import ChangeLanguage from '../../features/ChangeLang/ChangeLang';
function HeaderTop() {
  return (
    <div className={styles.headerTop}>
      <div className={`${styles.headerTop__container} _container`}>
        <Adress />

        <div className={styles.headerTop__controls}>
          <ChangeCurrency />
          <ChangeLanguage />
          <span>|</span>
          <a href="/login" className={styles.headerTop__link}>
            Sign In
          </a>
          <span>/</span>
          <a href="/register" className={styles.headerTop__link}>
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
