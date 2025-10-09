import React, { useMemo, useState } from 'react';
import styles from './Filter.module.scss';
import Button from '../../components/buttons/Button/Button';
import categoriesData from '../../components/TopCategory/categories';
import productsData from '../../utils/products.json';
import { Range } from 'react-range';
function Filter({ onFilterChange }) {
  const [values, setValues] = useState([]); // пустой массив на старте
  const step = 0.1; // шаг с точностью до десятых
  const [selectedTags, setSelectedTags] = useState([]);

  // --- 🧮 Получаем минимальную и максимальную цену с учётом скидок
  const [minPrice, maxPrice] = useMemo(() => {
    // Для каждого товара считаем актуальную цену после скидки
    const prices = productsData.map((p) => {
      const discount = p.discount || 0; // если скидки нет, берём 0
      const finalPrice = p.priceOrigin * (1 - discount / 100); // применяем скидку
      return finalPrice;
    });

    // Вычисляем минимальную и максимальную цену
    return [Math.min(...prices), Math.max(...prices)];
  }, []);

  const roundToStep = (num) => Math.round(num / step) * step;

  React.useEffect(() => {
    setValues([roundToStep(minPrice), roundToStep(maxPrice)]);
  }, [minPrice, maxPrice]);

  // // ✅ собираем все уникальные теги
  // const allTags = useMemo(() => {
  //   const tags = productsData.flatMap(
  //     (p) =>
  //       (p.tags || '')
  //         .split(',')
  //         .map((t) => t.trim().toLowerCase())
  //         .filter(Boolean), // ← фильтруем пустые и null
  //   );
  //   const unique = [...new Set(tags)];

  //   // сортировка по алфавиту
  //   unique.sort((a, b) => a.localeCompare(b));

  //   // делаем первую букву заглавной
  //   const formatted = unique.map(
  //     (tag) => tag.charAt(0).toUpperCase() + tag.slice(1),
  //   );
  //   return formatted;
  // }, []);

  //самые частые теги
  const topTags = useMemo(() => {
    // 1. Собираем все теги из товаров
    const allTags = productsData.flatMap((p) =>
      (p.tags || '')
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
    );

    // 2. Считаем частоту встречаемости каждого тега
    const frequencyMap = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

    // 3. Превращаем в массив объектов и сортируем по убыванию
    const sortedTags = Object.entries(frequencyMap)
      .sort(([, aCount], [, bCount]) => bCount - aCount)
      .slice(0, 20) // берём первые 20
      .map(([tag]) => tag); // храним в lower case для логики

    return sortedTags;
  }, [productsData]);

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
        {values.length > 0 && (
          <Range
            step={step}
            min={roundToStep(minPrice)}
            max={roundToStep(maxPrice)}
            values={values}
            onChange={setValues}
            renderTrack={({ props, children }) => {
              const { key, ...rest } = props;
              return (
                <div
                  key={key}
                  {...rest}
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
              );
            }}
            renderThumb={({ props, index }) => {
              const { key, ...rest } = props;
              return (
                <div
                  key={index}
                  {...rest}
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
              );
            }}
          />
        )}

        {values.length > 0 && (
          <p>
            {values[0].toFixed(1)} - {values[1].toFixed(1)}
          </p>
        )}
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
          {topTags.map((tag) => (
            <li key={tag}>
              <label>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />{' '}
                {tag.charAt(0).toUpperCase() + tag.slice(1)}{' '}
                {/* только для отображения */}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Filter;
