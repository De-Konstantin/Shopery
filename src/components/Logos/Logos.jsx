import {
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
} from '../../assets/images/logos/logos';
import styles from './Logos.module.scss';

function Logos() {
  return (
    <div className={styles.logos}>
      <div className={`${styles.logos__container} _container`}>
        <div className={styles.logos__item}>
          <img
            className={styles.logos__img}
            src={logo1}
            alt="Logo 1"
          />
        </div>
        <span className={styles.logos__divider}></span>
        <div className={styles.logos__item}>
          <img
            className={styles.logos__img}
            src={logo2}
            alt="Logo 2"
          />
        </div>
        <span className={styles.logos__divider}></span>
        <div className={styles.logos__item}>
          <img
            className={styles.logos__img}
            src={logo3}
            alt="Logo 3"
          />
        </div>
        <span className={styles.logos__divider}></span>
        <div className={styles.logos__item}>
          <img
            className={styles.logos__img}
            src={logo4}
            alt="Logo 4"
          />
        </div>
        <span className={styles.logos__divider}></span>
        <div className={styles.logos__item}>
          <img
            className={styles.logos__img}
            src={logo5}
            alt="Logo 5"
          />
        </div>
        <span className={styles.logos__divider}></span>
        <div className={styles.logos__item}>
          <img
            className={styles.logos__img}
            src={logo6}
            alt="Logo 6"
          />
        </div>
      </div>
    </div>
  );
}

export default Logos;
