import React from 'react';
import styles from './Header.module.scss';
import SearchBar from '../../features/search/SearchBar';
import Logo from '../../components/logo/logo';
import WishlistButton from '../../features/WishlistButton/WishlistButton';
import CartButton from '../../features/CartButton/CartButton';

function HeaderMiddle() {
  return (
    <div className={styles.headerMiddle}>
      <div className={`${styles.headerMiddle__container} _container`}>
        <Logo />
        <SearchBar />

        <div className={styles.headerMiddle__controls}>
          <WishlistButton count={5} />
          <div className={styles.headerMiddle__line}></div>
          <CartButton count={8} totalAmount={153.2} />
        </div>
      </div>
    </div>
  );
}

export default HeaderMiddle;
