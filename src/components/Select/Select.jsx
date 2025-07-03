import React from 'react';
import styles from './Select.module.scss';
/* eslint-disable react/prop-types */
function Select({ value, options, onChange, label }) {
  return (
    <label className={styles.label}>
      {label && <span className={styles.labelText}>{label}</span>}
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="icon-arr-d"></span>
    </label>
  );
}
export default Select;
