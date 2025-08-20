import React from 'react';
import styles from './Banner.module.scss';
import Countdown from '../../features/Countdown/Countdown';
import Button from '../buttons/Button/Button';
function Banner({ subtitle, title, timerEndDate, dark }) {
  return (
    <div
      className={`${styles.banner} ${dark ? styles.bannerDark : ''}`}
    >
      <div className={styles.banner__content}>
        {' '}
        <img
          src="../../assets/images/banners/1.jpg"
          alt="Banner"
          className={styles.banner__image}
        />
        <p className={styles.banner__subtitle}>{subtitle}</p>
        <h3 className={styles.banner__title}>{title}</h3>
        {timerEndDate ? (
          <Countdown targetDate={timerEndDate} />
        ) : null}
        <Button></Button>
      </div>
    </div>
  );
}

export default Banner;
