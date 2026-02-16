import React from 'react';
import styles from './Button.module.scss';

function Button({
  variant = 'fill',
  size = 'medium',
  width = 'auto',
  children,
  ...props
}) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    styles[width],
  ].join(' ');

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}

export default Button;
