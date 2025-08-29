import React from 'react';
import styles from './BannerLarge.module.scss';
import Button from '../buttons/Button/Button';
function BannerLarge() {
  return (
    <div className={styles.bannerLarge}>
      <div className={`${styles.bannerLarge__container} _container`}>
        <img
          className={styles.bannerLarge__image}
          src="../src/assets/images/banners/bannerLarge.jpg"
          alt="Banner Large"
        />
        <div className={styles.bannerLarge__content}>
          <h3>Summer Sale</h3>
          <h2>
            <span>37%</span> Off
          </h2>
          <p>
            Free on all your order, Free Shipping and 30 days
            money-back guarantee
          </p>
          <Button>
            Shop Now <span className="icon-arr-r"></span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BannerLarge;
