import React from 'react';
import styles from './About.module.scss';
import Logos from '../../components/Logos/Logos';
import Button from '../../components/buttons/Button/Button';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

function About() {
  return (
    <>
      <Breadcrumbs />
      <div className={styles.about}>
        {' '}
        <div className={`${styles.about__container} _container`}>
          {' '}
          <div className={styles.about__items}>
            {' '}
            <div className={styles.about__item}>
              {' '}
              <div className={styles.about__itemContent}>
                {' '}
                <h2>100% Trusted Organic Food Store</h2>{' '}
                <p>
                  {' '}
                  Morbi porttitor ligula in nunc varius sagittis.
                  Proin dui nisi, laoreet ut tempor ac, cursus vitae
                  eros. Cras quis ultricies elit. Proin ac lectus
                  arcu. Maecenas aliquet vel tellus at accumsan. Donec
                  a eros non massa vulputate ornare. Vivamus ornare
                  commodo ante, at commodo felis congue vitae.{' '}
                </p>{' '}
              </div>{' '}
              <div className={styles.about__itemImage}>
                {' '}
                <img
                  src="../src/assets/images/about/1.jpg"
                  alt="About"
                />{' '}
              </div>{' '}
            </div>{' '}
            <div className={styles.about__item}>
              {' '}
              <div className={styles.about__itemImage}>
                {' '}
                <img
                  src="../src/assets/images/about/2.png"
                  alt="About"
                />{' '}
                <img
                  className={styles.about__itemBg}
                  src="../src/assets/images/about/bg.png"
                  alt="About"
                />{' '}
              </div>{' '}
              <div className={styles.about__itemContent}>
                {' '}
                <h2>100% Trusted Organic Food Store</h2>{' '}
                <p>
                  {' '}
                  Pellentesque a ante vulputate leo porttitor luctus
                  sed eget eros. Nulla et rhoncus neque. Duis non diam
                  eget est luctus tincidunt a a mi. Nulla eu eros
                  consequat tortor tincidunt feugiat.{' '}
                </p>{' '}
                <ul>
                  {' '}
                  <li>
                    {' '}
                    <div className={styles.about__itemIcon}>
                      {' '}
                      <span className="icon-leaf"></span>{' '}
                    </div>{' '}
                    <div className={styles.about__itemText}>
                      {' '}
                      <h4>100% Organic food</h4>{' '}
                      <p>100% healthy & Fresh food.</p>{' '}
                    </div>{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    <div className={styles.about__itemIcon}>
                      {' '}
                      <span className="icon-star2"></span>{' '}
                    </div>{' '}
                    <div className={styles.about__itemText}>
                      {' '}
                      <h4>Customer Feedback</h4>{' '}
                      <p>Our happy customer</p>{' '}
                    </div>{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    <div className={styles.about__itemIcon}>
                      {' '}
                      <span className="icon-delivery-truck"></span>{' '}
                    </div>{' '}
                    <div className={styles.about__itemText}>
                      {' '}
                      <h4>Free Shipping</h4>{' '}
                      <p>Free shipping with discount</p>{' '}
                    </div>{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    <div className={styles.about__itemIcon}>
                      {' '}
                      <span className="icon-support"></span>{' '}
                    </div>{' '}
                    <div className={styles.about__itemText}>
                      {' '}
                      <h4>Great Support 24/7</h4>{' '}
                      <p>Instant access to Contact</p>{' '}
                    </div>{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    <div className={styles.about__itemIcon}>
                      {' '}
                      <span className="icon-bag2"></span>{' '}
                    </div>{' '}
                    <div className={styles.about__itemText}>
                      {' '}
                      <h4>100% Sucure Payment</h4>{' '}
                      <p>We ensure your money is save</p>{' '}
                    </div>{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    <div className={styles.about__itemIcon}>
                      {' '}
                      <span className="icon-package"></span>{' '}
                    </div>{' '}
                    <div className={styles.about__itemText}>
                      {' '}
                      <h4>100% Organic Food</h4>{' '}
                      <p>100% healthy & Fresh food.</p>{' '}
                    </div>{' '}
                  </li>{' '}
                </ul>{' '}
              </div>{' '}
            </div>{' '}
            <div className={styles.about__item}>
              {' '}
              <div className={styles.about__itemContent}>
                {' '}
                <h2>We Delivered, You Enjoy Your Order.</h2>{' '}
                <p>
                  {' '}
                  Ut suscipit egestas suscipit. Sed posuere
                  pellentesque nunc, ultrices consectetur velit
                  dapibus eu. Mauris sollicitudin dignissim diam, ac
                  mattis eros accumsan rhoncus. Curabitur auctor
                  bibendum nunc eget elementum.{' '}
                </p>{' '}
                <ul>
                  {' '}
                  <li>
                    {' '}
                    <span className="icon-check"></span>{' '}
                    <p>Sed in metus pellentesque.</p>{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    <span className="icon-check"></span>{' '}
                    <p>
                      {' '}
                      Fusce et ex commodo, aliquam nulla efficitur,
                      tempus lorem.{' '}
                    </p>{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    <span className="icon-check"></span>{' '}
                    <p>
                      Maecenas ut nunc fringilla erat varius.
                    </p>{' '}
                  </li>{' '}
                </ul>{' '}
                <Button>
                  {' '}
                  Shop Now <span className="icon-arr-r"></span>{' '}
                </Button>{' '}
              </div>{' '}
              <div className={styles.about__itemImage}>
                {' '}
                <img
                  src="../src/assets/images/about/3.png"
                  alt="About"
                />{' '}
              </div>{' '}
            </div>{' '}
          </div>{' '}
          <Logos />{' '}
        </div>{' '}
      </div>
    </>
  );
}

export default About;
