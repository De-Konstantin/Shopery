import React from 'react';
import styles from './Header.module.scss';

function HeaderBottom() {
  return (
    <div className={styles.headerBottom}>
      <div className={`${styles.headerBottom__container} _container`}>
        Header Bottom
      </div>
    </div>
  );
}

export default HeaderBottom;
