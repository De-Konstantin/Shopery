import React from 'react';
import Button from '../components/buttons/Button/Button';
import ButtonRound from '../components/buttons/ButtonRound/ButtonRound';
import SubcribeBanner from '../components/SubcribeBanner/SubcribeBanner';
import Hero from '../components/Hero/Hero';

function Home() {
  return (
    <div>
      <span className="icon-apple">
        <Hero />
        gjhgj
        <Button variant="ghost" size="small">
          hchfchgchg
        </Button>
        <ButtonRound>
          <span className="icon-heart"></span>
        </ButtonRound>
        <SubcribeBanner />
      </span>
    </div>
  );
}

export default Home;
