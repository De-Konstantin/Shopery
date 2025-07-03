import React from 'react';
import styles from './SearchBar.module.scss';

function SearchBar() {
  return (
    <form className={styles.searchBar}>
      <div className={styles.inputWrapper}>
        <span className="icon-search"></span>
        <input type="text" placeholder="Search" className={styles.input} />
      </div>
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
