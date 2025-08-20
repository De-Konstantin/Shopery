import React from 'react';

import SubcribeBanner from '../components/SubcribeBanner/SubcribeBanner';
import Hero from '../components/Hero/Hero';
import Logos from '../components/Logos/Logos';
import TopCategory from '../components/TopCategory/TopCategory';
import ProductCard from '../components/ProductCard/ProductCard';
import TopProducts from '../components/topProducts/TopProducts';
import Countdown from '../features/Countdown/Countdown';

function Home() {
  console.log(ProductCard);

  return (
    <div>
      <Hero />
      <TopCategory />
      <TopProducts />
      <Countdown targetDate="2026-12-31T23:59:59" />
      <SubcribeBanner />
      <Logos />
    </div>
  );
}

export default Home;
