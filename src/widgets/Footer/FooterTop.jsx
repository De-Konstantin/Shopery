import React from 'react';
import styles from './footer.module.scss';

import ButtonRound from '../../components/buttons/ButtonRound/ButtonRound';
import SubscribeForm from '../../features/SubscribeForm/SubscribeForm';
function FooterTop() {
  return (
    <div className={styles.FooterTop}>
      <div className={`${styles.FooterTop__container} _container`}>
        <div className={styles.FooterTop__left}>
          <span className="icon-Envelope"></span>
          <div className={styles.FooterTop__text}>
            <h3>Subcribe our Newsletter</h3>
            <p>
              Pellentesque eu nibh eget mauris congue mattis matti.
            </p>
          </div>
        </div>
        <div className={styles.FooterTop__right}>
          <SubscribeForm />
          <div className={styles.FooterTop__socials}>
            <ButtonRound color="dark">
              <span className="icon-fb"></span>
            </ButtonRound>
            <ButtonRound color="dark">
              <span className="icon-tw"></span>
            </ButtonRound>
            <ButtonRound color="dark">
              <span className="icon-pi"></span>
            </ButtonRound>
            <ButtonRound color="dark">
              <span className="icon-inst"></span>
            </ButtonRound>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterTop;
