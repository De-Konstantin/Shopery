import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const categories = [
  'Fresh Fruit',
  'Vegetables',
  'River Fish',
  'Chicken & Meat',
  'Drink & Water',
  'Yogurt & Ice Cream',
  'Cake & Bread',
  'Butter & Cream',
  'Cooking',
];

export default function CategoryList({ onClose }) {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // Навигация на /shop с фильтром по категории
    navigate(`/shop?category=${encodeURIComponent(category)}`);

    // Закрыть меню
    if (onClose) {
      onClose();
    }
  };

  const handleViewAll = () => {
    // Навигация на весь каталог без фильтра
    navigate('/shop');

    // Закрыть меню
    if (onClose) {
      onClose();
    }
  };

  return (
    <ul className={styles.categoryList}>
      {categories.map((cat) => (
        <li key={cat}>
          <button
            className={styles.categoryLink}
            onClick={() => handleCategoryClick(cat)}
            type="button"
          >
            {cat}
          </button>
        </li>
      ))}
      <li className={styles.viewAll}>
        <button
          className={styles.viewAllButton}
          onClick={handleViewAll}
          type="button"
        >
          View all Category
        </button>
      </li>
    </ul>
  );
}
