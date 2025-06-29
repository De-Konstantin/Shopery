import React from 'react';
import Logo from '../../components/logo/logo';
import styles from './header.module.scss';
function Header() {
  return (
    <header className={styles.header}>
      <div className="{styles.header__container}">
        <Logo />
        Header
      </div>
    </header>
  );
}

export default Header;
