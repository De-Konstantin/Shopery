import React from 'react';
import styles from './CustomerCare.module.scss';
function CustomerCare() {
  return (
    <div className={`${styles.CustomerCare} _container`}>
      <ul className={styles.CustomerCare__list}>
        <li className={styles.CustomerCare__item}>
          <span className="icon-delivery-truck"></span>
          <div className={styles.CustomerCare__content}>
            <h3 className={styles.CustomerCare__title}>
              Free Shipping
            </h3>
            <p className={styles.CustomerCare__text}>
              Free shipping on all your order
            </p>
          </div>
        </li>
        <li className={styles.CustomerCare__item}>
          <span className="icon-support"></span>
          <div className={styles.CustomerCare__content}>
            <h3 className={styles.CustomerCare__title}>
              Customer Support 24/7
            </h3>
            <p className={styles.CustomerCare__text}>
              Instant access to Support
            </p>
          </div>
        </li>{' '}
        <li className={styles.CustomerCare__item}>
          <span className="icon-bag2"></span>
          <div className={styles.CustomerCare__content}>
            <h3 className={styles.CustomerCare__title}>
              100% Secure Payment
            </h3>
            <p className={styles.CustomerCare__text}>
              We ensure your money is save
            </p>
          </div>
        </li>{' '}
        <li className={styles.CustomerCare__item}>
          <span className="icon-package"></span>
          <div className={styles.CustomerCare__content}>
            <h3 className={styles.CustomerCare__title}>
              Money-Back Guarantee
            </h3>
            <p className={styles.CustomerCare__text}>
              30 Days Money-Back Guarantee
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default CustomerCare;
