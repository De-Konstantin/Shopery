import React from 'react';
import styles from './NotFound.module.scss';
import notFoundImage from '../../assets/images/NotFound/Illustration.png'; // Adjust the path as necessary
import Button from '../../components/buttons/Button/Button';
import { Link } from 'react-router-dom';
function NotFound() {
  return (
    <div className={`${styles.NotFound} _container`}>
      <div className={styles.NotFound__images}>
        <img
          src={notFoundImage}
          alt="Not Found"
          className={styles.NotFound__img}
        />
      </div>
      <h1 className={styles.NotFound__title}>Oops! page not found</h1>
      <p className={styles.NotFound__text}>
        Ut consequat ac tortor eu vehicula. Aenean accumsan purus eros. Maecenas
        sagittis tortor at metus mollis
      </p>
      <Link to="/">
        <Button size="large" variant="fill">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}

export default NotFound;
