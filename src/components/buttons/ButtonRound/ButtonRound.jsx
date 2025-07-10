import React from 'react';
import styles from './ButtonRound.module.scss';

// size: 'small', 'medium', 'large';
// type: 'cart', 'bg', 'link', 'close', social
function ButtonRound({
  type = 'social',
  size = 'medium',
  color = 'light',
  children,
  ...props
}) {
  const classNames = [
    styles.buttonRound,
    styles[type],
    styles[size],
    styles[color],
  ].join(' ');

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}

export default ButtonRound;
