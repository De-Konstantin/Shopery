import React from 'react';
import styles from './ButtonRound.module.scss';

// size: 'small', 'medium', 'large';
// type: 'cart', 'bg', 'link', 'close'
function ButtonRound({
  type = 'bg',
  size = 'medium',
  children,
  ...props
}) {
  const classNames = [
    styles.buttonRound,
    styles[type],
    styles[size],
  ].join(' ');

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}

export default ButtonRound;
