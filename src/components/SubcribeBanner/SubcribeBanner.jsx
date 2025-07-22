import React, { useEffect, useState } from 'react';
import styles from './SubcribeBanner.module.scss';
import bannerImage from '../../assets/images/SubcribeBunner/bg.png'; // Импортируйте изображение
import SubscribeForm from '../../features/SubscribeForm/SubscribeForm';
function SubcribeBanner() {
  const [showBanner, setShowBanner] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Проверим localStorage при загрузке
  useEffect(() => {
    const hideBanner = localStorage.getItem('hideSubscribeBanner');
    if (hideBanner === 'true') {
      setShowBanner(false);
    }
  }, []);

  // Обработчик закрытия
  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideSubscribeBanner', 'true');
    }
    setShowBanner(false);
  };

  if (!showBanner) {
    return null; // Баннер не рендерится
  }
  return (
    <div className={styles.subscribeBanner}>
      <div className={styles.image}>
        <img src={bannerImage} alt="Subscribe Banner"></img>
      </div>
      <div className={styles.content}>
        <h2>Subcribe to Our Newsletter</h2>
        <p>
          Subscribe to our newlletter and Save your{' '}
          <span>20% money</span> with discount code today.
        </p>
        <SubscribeForm />

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={() => setDontShowAgain(!dontShowAgain)}
            //   checked={rememberMe}

            //   onChange={() => setRememberMe(!rememberMe)}
          />{' '}
          Do not show this window again
        </label>

        <div onClick={handleClose} className={styles.closeButton}>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default SubcribeBanner;
