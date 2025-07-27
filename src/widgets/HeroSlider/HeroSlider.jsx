import React from 'react';
import styles from './HeroSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import img1 from './../../assets/images/sliders/Image1.png';
import img2 from './../../assets/images/sliders/Image2.png';
import img3 from './../../assets/images/sliders/Image3.png';
import Button from '../../components/buttons/Button/Button';

function HeroSlider() {
  return (
    <div className={styles.HeroSlider}>
      <div className={`${styles.HeroSlider__container} _container`}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          loop={true}
          autoplay={{
            delay: 300000000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <div className={styles.HeroSlider__slide}>
              <div className={styles.HeroSlider__content}>
                <h4 className={styles.HeroSlider__subtitle}>
                  Welcome to shopery
                </h4>
                <h2 className={styles.HeroSlider__title}>
                  Fresh & Healthy Organic Food
                </h2>
                <h3 className={styles.HeroSlider__sale}>
                  Sale up to <span>30% OFF</span>
                </h3>
                <p className={styles.HeroSlider__text}>
                  Free shipping on all your order. we deliver, you
                  enjoy
                </p>
                <Button variant="fill" size="large">
                  Shop now <span className="icon-arr-r"></span>
                </Button>
              </div>
              <img src={img1} alt="Slide 1" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.HeroSlider__slide}>
              {' '}
              <div className={styles.HeroSlider__content}>
                <h4 className={styles.HeroSlider__subtitle}>
                  Welcome to shopery
                </h4>
                <h2 className={styles.HeroSlider__title}>
                  Fresh & Healthy Organic Food
                </h2>
                <h3 className={styles.HeroSlider__sale}>
                  Sale up to <span>30% OFF</span>
                </h3>
                <p className={styles.HeroSlider__text}>
                  Free shipping on all your order. we deliver, you
                  enjoy
                </p>
                <Button variant="fill" size="large">
                  Shop now <span className="icon-arr-r"></span>
                </Button>
              </div>
              <img src={img2} alt="Slide 2" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.HeroSlider__slide}>
              <div className={styles.HeroSlider__content}>
                <h4 className={styles.HeroSlider__subtitle}>
                  Welcome to shopery
                </h4>
                <h2 className={styles.HeroSlider__title}>
                  Fresh & Healthy Organic Food
                </h2>
                <h3 className={styles.HeroSlider__sale}>
                  Sale up to <span>30% OFF</span>
                </h3>
                <p className={styles.HeroSlider__text}>
                  Free shipping on all your order. we deliver, you
                  enjoy
                </p>
                <Button variant="fill" size="large">
                  Shop now <span className="icon-arr-r"></span>
                </Button>
              </div>
              <img src={img3} alt="Slide 3" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HeroSlider;
