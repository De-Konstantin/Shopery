import React, { useState } from 'react';
import styles from './Filter.module.scss';
import Button from '../../components/buttons/Button/Button';
import categoriesData from '../../components/TopCategory/categories';
import productData from '../../utils/products.json';
import { Range } from 'react-range';
function Filter() {
  const [values, setValues] = useState([50, 1500]);

  return (
    <>
      <Button>Filter</Button>
      <div className={styles.filter__section}>
        <h4>Categories</h4>
        <ul className={styles.filter__categories}>
          {categoriesData.map((category) => (
            <li
              key={category.name}
              className={styles.filter__category}
            >
              <input
                type="checkbox"
                className={styles.checkbox}
                id={category.name}
              />
              <label
                className={styles.checkbox__label}
                htmlFor={category.name}
              >
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.filter__section}>
        <h4>Price</h4>
        <Range
          step={10}
          min={0}
          max={1500}
          values={values}
          onChange={(vals) => setValues(vals)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                background: '#ddd',
                position: 'relative',
                borderRadius: '3px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  height: '6px',
                  background: '#00B207',
                  borderRadius: '3px',
                  left: `${(values[0] / 1500) * 100}%`,
                  width: `${((values[1] - values[0]) / 1500) * 100}%`,
                }}
              />
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '2px solid #00B207',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}
        />
        <p>
          Price: {values[0]} - {values[1]}
        </p>
      </div>

      <div className={styles.filter__section}>
        <h4>Rating</h4>
        <ul className={styles.ratingList}>
          <li>
            {' '}
            <label>
              <input className={styles.checkbox} type="checkbox" />{' '}
              ⭐⭐⭐⭐⭐ 5.0
            </label>
          </li>
          <li>
            {' '}
            <label>
              <input className={styles.checkbox} type="checkbox" />{' '}
              ⭐⭐⭐⭐ & up
            </label>
          </li>
          <li>
            {' '}
            <label>
              <input className={styles.checkbox} type="checkbox" />{' '}
              ⭐⭐⭐ & up
            </label>
          </li>
          <li>
            <label>
              <input className={styles.checkbox} type="checkbox" />{' '}
              ⭐⭐ & up
            </label>
          </li>
          <li>
            <label>
              <input className={styles.checkbox} type="checkbox" /> ⭐
              & up
            </label>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Filter;
