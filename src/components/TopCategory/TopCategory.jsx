import React, { useMemo } from 'react';
import styles from './TopCategory.module.scss';
import { Link } from 'react-router-dom';
import categories from './categories';

function TopCategory() {
  // 🔀 Перемешиваем и берём только первые 10 (или 12)
  const limitedCategories = useMemo(() => {
    const shuffled = [...categories].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 12); // или 12
  }, []);

  return (
    <div className={styles.topCategory}>
      <div className={`${styles.topCategory__container} _container`}>
        <div className={styles.topCategory__top}>
          <h2 className={styles.topCategory__title}>
            Popular Categories
          </h2>
          <Link className={styles.topCategory__view}>
            View All <span className="icon-arr-r"></span>
          </Link>
        </div>
        <div className={styles.topCategory__body}>
          <ul className={styles.topCategory__list}>
            {limitedCategories.map((category, index) => (
              <li key={index} className={styles.topCategory__item}>
                <Link
                  to={category.path}
                  className={styles.topCategory__link}
                >
                  <img src={category.img} alt={category.name} />
                  <h3 className={styles.topCategory__itemTitle}>
                    {category.name}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>{' '}
      </div>
    </div>
  );
}

export default TopCategory;
