import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.scss';

function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const urlSearchValue = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search')?.trim() || '';
  }, [location.search]);

  const [searchValue, setSearchValue] = useState(urlSearchValue);
  const isShopPage = location.pathname === '/shop';

  useEffect(() => {
    if (location.pathname === '/shop') {
      setSearchValue(urlSearchValue);
    }
  }, [location.pathname, urlSearchValue]);

  // Очищаем поле поиска при уходе со страницы /shop
  useEffect(() => {
    if (!isShopPage) {
      setSearchValue('');
    }
  }, [location.pathname, isShopPage]);

  const applySearch = (value) => {
    const trimmedValue = value.trim();
    const params = new URLSearchParams(
      location.pathname === '/shop' ? location.search : '',
    );

    if (trimmedValue) {
      params.set('search', trimmedValue);
    } else {
      params.delete('search');
    }

    const nextSearch = params.toString();

    navigate(nextSearch ? `/shop?${nextSearch}` : '/shop');
  };

  useEffect(() => {
    if (!isShopPage) {
      return;
    }

    const timerId = window.setTimeout(() => {
      if (searchValue.trim() === urlSearchValue) {
        return;
      }

      applySearch(searchValue);
    }, 500);

    return () => window.clearTimeout(timerId);
  }, [searchValue, urlSearchValue, isShopPage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    applySearch(searchValue);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <span className="icon-search"></span>
        <input
          type="text"
          placeholder="Search"
          className={styles.input}
          value={searchValue}
          aria-label="Search products"
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
