import React, { useMemo, useState } from 'react';
import styles from './Filter.module.scss';
import Button from '../../components/buttons/Button/Button';

import productsData from '../../utils/products.json';
import { Range } from 'react-range';

function Filter({ onFilterChange, totalCount }) {
  const [values, setValues] = useState([]); // пустой массив на старте
  const step = 0.1; // шаг с точностью до десятых
  const roundToStep = (num) => Math.round(num / step) * step;

  const [selectedTags, setSelectedTags] = useState([]); //lower case
  const [selectedCategories, setSelectedCategories] = useState([]); // lower-case
  const [selectedRating, setSelectedRating] = useState(null); //{min, max}, null

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

  React.useEffect(() => {
    if (!isNaN(minPrice) && !isNaN(maxPrice) && minPrice < maxPrice) {
      setValues([roundToStep(minPrice), roundToStep(maxPrice)]);
    }
  }, [minPrice, maxPrice]);

  // категории (unique)

  const allCategories = useMemo(() => {
    const categories = productsData.flatMap(
      (p) =>
        (p.category || '')
          .split(',')
          .map((t) => t.trim().toLowerCase())
          .filter(Boolean), // ← фильтруем пустые и null
    );
    const unique = [...new Set(categories)];

    // сортировка по алфавиту
    unique.sort((a, b) => a.localeCompare(b));

    // создаём отображаемый вариант (чтобы была заглавная буква)
    const formatted = unique.map((tag) => ({
      value: tag, // внутреннее значение
      display: tag.charAt(0).toUpperCase() + tag.slice(1), // для показа
    }));
    return formatted;
  }, []);

  const ratingRanges = [
    { label: '5 ★', min: 5, max: 5 },
    { label: '4.0 – 4.9 ★', min: 4.0, max: 4.9 },
    { label: '3.0 – 3.9 ★', min: 3.0, max: 3.9 },
    { label: '2.0 – 2.9 ★', min: 2.0, max: 2.9 },
    { label: '1.0 – 1.9 ★', min: 1.0, max: 1.9 },
  ];

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

  const handleCategoryChange = (category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // убрать, если уже выбрана
          : [...prev, category], // добавить, если не выбрана
    );
  };

  const handleRatingSelect = (range) => {
    setSelectedRating((prev) =>
      prev?.label === range.label ? null : range,
    );
  };
  const handleResetFilters = () => {
    setSelectedTags([]);
    setSelectedRating(null);
    setSelectedCategories([]);
    setValues([roundToStep(minPrice), roundToStep(maxPrice)]);
  };

  // передаём наружу фильтры при каждом изменении
  React.useEffect(() => {
    onFilterChange({
      price: values,
      tags: selectedTags,
      rating: selectedRating,
      categories: selectedCategories,
    });
  }, [
    values,
    selectedTags,
    selectedRating,
    selectedCategories,
    onFilterChange,
  ]);

  return (
    <>
      <Button>Filter</Button>
      <button
        onClick={handleResetFilters}
        className={styles.resetBtn}
      >
        Reset
      </button>
      <div className={styles.filter__section}>
        <h4>Categories</h4>
        <ul className={styles.filter__categories}>
          {allCategories.map((cat) => {
            return (
              <li key={cat.value} className={styles.filter__category}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  id={cat.value}
                  checked={selectedCategories.includes(cat.value)}
                  onChange={() => handleCategoryChange(cat.value)}
                />
                <label
                  className={styles.checkbox__label}
                  htmlFor={cat.value}
                >
                  {cat.display}
                </label>
              </li>
            );
          })}
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
                      left: `${((values[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                      width: `${((values[1] - values[0]) / (maxPrice - minPrice)) * 100}%`,
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
          {ratingRanges.map((range) => (
            <li key={range.label}>
              <label>
                <input
                  type="radio"
                  className={styles.checkbox}
                  name="rating"
                  checked={selectedRating?.label === range.label}
                  onChange={() => handleRatingSelect(range)}
                />
                {range.label}
              </label>
            </li>
          ))}
        </ul>
        <p>Products: {totalCount}</p>
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
