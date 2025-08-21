import React from 'react';
import styles from './Banner.module.scss';
import Countdown from '../../features/Countdown/Countdown';
import Button from '../buttons/Button/Button';
function Banner({
  subtitle,
  title,
  timerEndDate,
  dark,
  text,
  textMark,
  src,
}) {
  return (
    <div
      className={`${styles.banner} ${dark ? styles.bannerDark : ''}`}
    >
      <img src={src} alt="Banner" className={styles.banner__image} />

      <div className={styles.banner__content}>
        {' '}
        <p className={styles.banner__subtitle}>{subtitle}</p>
        <h3 className={styles.banner__title}>{title}</h3>
        {text ? (
          <p className={styles.banner__text}>
            {text}{' '}
            <span className={styles.banner__textMark}>
              {textMark}
            </span>
          </p>
        ) : null}
        {timerEndDate ? (
          <Countdown targetDate={timerEndDate} />
        ) : null}
        <Button variant="border">
          Shop Now <span className="icon-arr-r"></span>
        </Button>
      </div>
    </div>
  );
}

export default Banner;
