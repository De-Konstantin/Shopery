import React from 'react';
import Logo from '../../components/logo/logo';
import styles from './header.module.scss';
import SearchBar from '../../features/search/SearchBar';
import Adress from '../../components/Adress/Adress';
import ChangeCurrency from '../../features/ChangeCurrency/ChangeCurrency';
import ChangeLanguage from '../../features/ChangeLang/ChangeLang';
function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.header__container} _container`}>
        <Logo />
        <SearchBar />
        <Adress />
        <ChangeCurrency />
        <ChangeLanguage />
        Header
      </div>
    </header>
  );
}

export default Header;
