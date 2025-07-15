import React from 'react';
import styles from './footer.module.scss';
import {
  ApplePay,
  Discover,
  Mastercard,
  Secure,
  Visa,
} from '../../assets/images/footer/footerImages.js';
function FooterBottom() {
  return (
    <div className={styles.FooterBottom}>
      <div className={`${styles.FooterBottom__container} _container`}>
        <p className={styles.FooterBottom__copyright}>
          Ecobazar eCommerce © 2021. All Rights Reserved
        </p>

        <ul className={styles.FooterBottom__list}>
          <li>
            <a href="#">
              <img src={ApplePay} alt="ApplePay"></img>
            </a>
          </li>
          <li>
            <a href="#">
              <img src={Visa} alt="Visa"></img>
            </a>
          </li>
          <li>
            <a href="#">
              <img src={Discover} alt="Discover"></img>
            </a>
          </li>
          <li>
            <a href="#">
              <img src={Secure} alt="Secure Payment"></img>
            </a>
          </li>
          <li>
            <a href="#">
              <img src={Mastercard} alt="Mastercard"></img>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FooterBottom;
