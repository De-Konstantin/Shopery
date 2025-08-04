import React from 'react';

import SubcribeBanner from '../components/SubcribeBanner/SubcribeBanner';
import Hero from '../components/Hero/Hero';
import Logos from '../components/Logos/Logos';
import TopCategory from '../components/TopCategory/TopCategory';

function Home() {
  return (
    <div>
      <span className="icon-apple">
        <Hero />
        <TopCategory />

        <SubcribeBanner />
        <Logos />
      </span>
    </div>
  );
}

export default Home;
