import React from 'react';
import styles from './Hero.module.scss';
import CustomerCare from '../CustomerCare/CustomerCare';
import HeroSlider from '../../widgets/HeroSlider/HeroSlider';
function Hero() {
  return (
    <div>
      <HeroSlider />
      <CustomerCare />
    </div>
  );
}

export default Hero;
