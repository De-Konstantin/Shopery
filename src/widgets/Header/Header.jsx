import React from 'react';
import styles from './Header.module.scss';
import HeaderTop from './HeaderTop';
import HeaderMiddle from './HeaderMiddle';
import HeaderBottom from './HeaderBottom';

function Header() {
  return (
    <header className={styles.header}>
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom />
    </header>
  );
}

export default Header;
