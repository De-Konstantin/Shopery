import React from 'react';
import { Link } from 'react-router-dom';
import styles from './logo.module.scss';
import logoImg from '../../assets/images/logo.svg';

function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      {/* Если есть картинка: */}
      <img src={logoImg} alt="Logo-img" />
      {/* Если текстовый: */}
      <span>Ecobazar</span>
    </Link>
  );
}

export default Logo;
