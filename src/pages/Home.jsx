import React from 'react';
import Button from '../components/buttons/Button/Button';
import ButtonRound from '../components/buttons/ButtonRound/ButtonRound';

function Home() {
  return (
    <div>
      <span className="icon-apple">
        Home page
        <Button variant="ghost" size="small">
          hchfchgchg
        </Button>
        <ButtonRound>
          <span className="icon-heart"></span>
        </ButtonRound>
      </span>
    </div>
  );
}

export default Home;
