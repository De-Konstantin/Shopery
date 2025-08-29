import React from 'react';
import styles from './LatestNews.module.scss';
import NewsCard from '../NewsCard/newsCard';
function LatestNews() {
  return (
    <div className={styles.latestNews}>
      <div className={`${styles.latestNews__container} _container`}>
        <h2 className={styles.latestNews__title}>Latest News</h2>

        <ul>
          <li>
            <NewsCard />
          </li>
          <li>
            <NewsCard />
          </li>
          <li>
            <NewsCard />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LatestNews;
