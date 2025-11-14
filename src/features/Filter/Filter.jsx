import React, { useMemo, useState, useEffect } from 'react';
import styles from './Filter.module.scss';
import Button from '../../components/buttons/Button/Button';
import { getFilterMetadata } from '../../utils/api';
import { Range } from 'react-range';

function Filter({ onFilterChange, totalCount }) {
  const [values, setValues] = useState([]); // пустой массив на старте
  const step = 0.1; // шаг с точностью до десятых
  const roundToStep = (num) => Math.round(num / step) * step;

  const [selectedTags, setSelectedTags] = useState([]); //lower case
  const [selectedCategories, setSelectedCategories] = useState([]); // lower-case
  const [selectedRating, setSelectedRating] = useState(null); //{min, max}, null

  // Состояние для метаданных фильтров
  const [filterMetadata, setFilterMetadata] = useState({
    categories: [],
    tags: [],
    priceRange: { min: 0, max: 100 },
  });
  const [metaLoading, setMetaLoading] = useState(true);
  const [metaError, setMetaError] = useState(null);

  // Загрузка метаданных фильтров при монтировании компонента
  useEffect(() => {
    const loadMetadata = async () => {
      setMetaLoading(true);
      setMetaError(null);
      try {
        const metadata = await getFilterMetadata();
        setFilterMetadata(metadata);
        // Устанавливаем начальные значения ценового диапазона
        setValues([
          roundToStep(metadata.priceRange.min),
          roundToStep(metadata.priceRange.max),
        ]);
      } catch (error) {
        console.error('Error loading filter metadata:', error);
        setMetaError('Не удалось загрузить фильтры');
      }
      setMetaLoading(false);
    };

    loadMetadata();
  }, []);

  const { minPrice, maxPrice } = filterMetadata.priceRange;

  // категории (unique)
  const allCategories = useMemo(() => {
    return filterMetadata.categories.map((cat) => ({
      value: cat,
      display: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));
  }, [filterMetadata.categories]);

  const ratingRanges = [
    { label: '5 ★', min: 5, max: 5 },
    { label: '4.0 – 4.9 ★', min: 4.0, max: 4.9 },
    { label: '3.0 – 3.9 ★', min: 3.0, max: 3.9 },
    { label: '2.0 – 2.9 ★', min: 2.0, max: 2.9 },
    { label: '1.0 – 1.9 ★', min: 1.0, max: 1.9 },
  ];

  // Самые частые теги (берем первые 20 из метаданных)
  const topTags = useMemo(() => {
    return filterMetadata.tags.slice(0, 20);
  }, [filterMetadata.tags]);

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
      {metaLoading && (
        <div className={styles.filter__loading}>
          Загрузка фильтров…
        </div>
      )}
      {metaError && !metaLoading && (
        <div className={styles.filter__error}>{metaError}</div>
      )}
      {!metaLoading && !metaError && (
        <>
          <div className={styles.filter__section}>
            <h4>Categories</h4>
            <ul className={styles.filter__categories}>
              {allCategories.map((cat) => {
                return (
                  <li
                    key={cat.value}
                    className={styles.filter__category}
                  >
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
                  const { key, ...rest } = props; // eslint-disable-line no-unused-vars
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
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default Filter;
