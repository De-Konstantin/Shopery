import React from 'react';
import Button from '../components/buttons/Button/Button';
import ButtonRound from '../components/buttons/ButtonRound/ButtonRound';
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
        <Button variant="ghost" size="small">
          hchfchgchg
        </Button>
        <ButtonRound>
          <span className="icon-heart"></span>
        </ButtonRound>
        <SubcribeBanner />
        <Logos />
      </span>
    </div>
  );
}

export default Home;
