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
    <a href="#" className={classNames} {...props}>
      {children}
    </a>
  );
}

export default ButtonRound;
