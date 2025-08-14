import React from 'react';

import SubcribeBanner from '../components/SubcribeBanner/SubcribeBanner';
import Hero from '../components/Hero/Hero';
import Logos from '../components/Logos/Logos';
import TopCategory from '../components/TopCategory/TopCategory';
import ProductCard from '../components/ProductCard/ProductCard';

function Home() {
  console.log(ProductCard);

  return (
    <div>
      <span className="icon-apple">
        <Hero />
        <TopCategory />
        <ProductCard />
        <SubcribeBanner />
        <Logos />
      </span>
    </div>
  );
}

export default Home;
