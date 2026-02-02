import React from 'react';

import SubcribeBanner from '../components/SubcribeBanner/SubcribeBanner';
import Hero from '../components/Hero/Hero';
import Logos from '../components/Logos/Logos';
import TopCategory from '../components/TopCategory/TopCategory';
import TopProducts from '../components/topProducts/TopProducts';

import Banner from '../components/Banner/Banner';
import styles from './home.module.scss';
import HotDeals from '../components/HotDeals/HotDeals';
import BannerLarge from '../components/BannerLarge/BannerLarge';
import LatestNews from '../components/LatestNews/LatestNews';
function Home() {
  return (
    <div>
      <Hero />
      <TopCategory />
      <TopProducts />
      <div className="_container">
        <div className={styles.banners}>
          <Banner
            src="../src/assets/images/banners/1.jpg"
            timerEndDate="2026-12-31T23:59:59"
            subtitle="Best Deals"
            title="Best Deals"
          />{' '}
          <Banner
            src="../src/assets/images/banners/2.jpg"
            subtitle="Best Deals"
            title="Low-Fat Meat"
            text="Get the best"
            textMark="Shop Now"
          />{' '}
          <Banner
            src="../src/assets/images/banners/3.jpg"
            subtitle="Best Deals"
            title="100% Fresh Fruit"
            text="Get the best"
            textMark="Shop Now"
            dark={true}
          />
        </div>
      </div>
      <HotDeals />
      <BannerLarge />
      <LatestNews />
      <SubcribeBanner />
      <Logos />
    </div>
  );
}

export default Home;
