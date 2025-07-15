import React from 'react';
import styles from './footer.module.scss';
import Logo from '../../components/logo/logo';
import { Link } from 'react-router-dom';
function FooterMiddle() {
  return (
    <div className={styles.FooterMiddle}>
      <div className={`${styles.FooterMiddle__container} _container`}>
        <div className={styles.FooterMiddle__items}>
          <div className={styles.FooterMiddle__item}>
            <Logo />
            <p className={styles.FooterMiddle__text}>
              Morbi cursus porttitor enim lobortis molestie. Duis
              gravida turpis dui, eget bibendum magna congue nec.
            </p>
            <div className={styles.FooterMiddle__contacts}>
              <a href="tel:2195550114">(219) 555–0114</a> or{' '}
              <a href="mailto:Proxy@gmail.com">Proxy@gmail.com</a>
            </div>
          </div>
          <div className={styles.FooterMiddle__item}>
            <h4 className={styles.FooterMiddle__title}>My Account</h4>
            <ul className={styles.FooterMiddle__list}>
              <li>
                <Link to="/account">My Account</Link>
              </li>
              <li>
                <Link to="/">Order History</Link>
              </li>
              <li>
                <Link to="/">Shoping Cart</Link>
              </li>
              <li>
                <Link to="/">Wishlist</Link>
              </li>
            </ul>
          </div>
          <div className={styles.FooterMiddle__item}>
            <h4 className={styles.FooterMiddle__title}>Helps</h4>
            <ul className={styles.FooterMiddle__list}>
              <li>
                <Link to="/">Contact</Link>
              </li>
              <li>
                <Link to="/">Faqs</Link>
              </li>
              <li>
                <Link to="/">Terms & Condition</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className={styles.FooterMiddle__item}>
            {' '}
            <h4 className={styles.FooterMiddle__title}>Proxy</h4>
            <ul className={styles.FooterMiddle__list}>
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/">Shop</Link>
              </li>
              <li>
                <Link to="/">Product</Link>
              </li>
              <li>
                <Link to="/">Track Order</Link>
              </li>
            </ul>
          </div>
          <div className={styles.FooterMiddle__item}>
            <h4 className={styles.FooterMiddle__title}>
              Download Mobile App
            </h4>
            <div className={styles.FooterMiddle__appLinks}>
              <a href="#">
                <div className={styles.FooterMiddle__appWrapp}>
                  <span className="icon-google-play"></span>
                  <div className={styles.FooterMiddle__appText}>
                    <p>Download on the</p>
                    <h5>Google Play</h5>
                  </div>
                </div>
              </a>
              <a href="#">
                <div className={styles.FooterMiddle__appWrapp}>
                  <span className="icon-apple-app"></span>
                  <div className={styles.FooterMiddle__appText}>
                    <p>Download on the</p>
                    <h5>Google Play</h5>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterMiddle;
