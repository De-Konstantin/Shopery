import { useState, useEffect } from 'react';
import styles from './countdown.module.scss';

function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={styles.countdown}>
      <div>
        <span>{String(timeLeft.days).padStart(2, '0')}</span>
        <span className={styles.text}>days</span>
      </div>
      :
      <div>
        <span>{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className={styles.text}>Hours</span>
      </div>
      :
      <div>
        <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className={styles.text}>mins</span>
      </div>
      :
      <div>
        <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className={styles.text}>secs</span>
      </div>
    </div>
  );
}

export default Countdown;
