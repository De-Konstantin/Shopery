import React from 'react';
import styles from './newsCard.module.scss';
import { Link } from 'react-router-dom';
function NewsCard() {
  return (
    <div className={styles.newsCard}>
      <div className={styles.newsCard__image}>
        <img src="../src/assets/images/news/1.jpg" alt="News" />
        <div className={styles.newsCard__date}>
          <span className={styles.newsCard__dateDay}>25</span>
          <span className={styles.newsCard__dateMonth}>dec</span>
        </div>
      </div>
      <div className={styles.newsCard__content}>
        <ul className={styles.newsCard__meta}>
          <li>
            <span className="icon-tag"></span>
            <span>Food</span>
          </li>
          <li>
            <span className="icon-user"></span>
            <span>By Admin</span>
          </li>
          <li>
            <span className="icon-chat"></span>{' '}
            <span>65 Comments</span>
          </li>
        </ul>
        <h3 className={styles.newsCard__title}>
          Eget lobortis lorem lacinia. Vivamus pharetra semper,
        </h3>
        <Link className={styles.newsCard__link} to="/news">
          Read More <span className="icon-arr-r"></span>
        </Link>
      </div>
    </div>
  );
}

export default NewsCard;
