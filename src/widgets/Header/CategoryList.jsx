import React from 'react';
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

export default function CategoryList() {
  return (
    <ul className={styles.categoryList}>
      {categories.map((cat) => (
        <li key={cat}>
          <a href="#" className={styles.categoryLink}>
            {cat}
          </a>
        </li>
      ))}
      <li className={styles.viewAll}>View all Category</li>
    </ul>
  );
}
