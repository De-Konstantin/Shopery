import React from 'react';
import styles from './ButtonRound.module.scss';

// size: 'small', 'medium', 'large';
// type: 'cart', 'bg', 'link', 'close', social
function ButtonRound({
  type = 'social',
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
