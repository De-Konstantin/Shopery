import React, { useMemo, useState } from 'react';
import styles from './Filter.module.scss';
import Button from '../../components/buttons/Button/Button';
import categoriesData from '../../components/TopCategory/categories';
import productsData from '../../utils/products.json';
import { Range } from 'react-range';
function Filter({ onFilterChange }) {
  const [values, setValues] = useState([50, 1500]);
  const [selectedTags, setSelectedTags] = useState([]);

  // ✅ собираем все уникальные теги
  const allTags = useMemo(() => {
    const tags = productsData.flatMap(
      (p) =>
        (p.tags || '')
          .split(',')
          .map((t) => t.trim().toLowerCase())
          .filter(Boolean), // ← фильтруем пустые и null
    );
    const unique = [...new Set(tags)];

    // сортировка по алфавиту
    unique.sort((a, b) => a.localeCompare(b));

    // делаем первую букву заглавной
    const formatted = unique.map(
      (tag) => tag.charAt(0).toUpperCase() + tag.slice(1),
    );
    return formatted;
  }, []);

  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag],
    );
  };

  // передаём наружу фильтры при каждом изменении
  React.useEffect(() => {
    onFilterChange({
      price: values,
      tags: selectedTags,
    });
  }, [values, selectedTags]);

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
      <div className={styles.filter__section}>
        <h4>Popular Tags</h4>
        <ul className={styles.filter__tags}>
          {allTags.map((tag) => (
            <li key={tag}>
              <label>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />{' '}
                {tag}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Filter;
