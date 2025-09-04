import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

const breadcrumbNameMap = {
  blog: 'Blog',
  shop: 'Shop',
  about: 'About Us',
  contact: 'Contacts',
  login: 'Sign In',
  CreateAccount: 'Create Account',
};

export default function Breadcrumbs({ category, productName }) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Если страница товара
  const isProductPage = category && productName;

  return (
    <div className="_container">
      <nav className={styles.breadcrumbs} aria-label="breadcrumb">
        <ol>
          <li>
            <Link to="/">Главная</Link>
          </li>
          {isProductPage ? (
            <>
              <li>
                <Link to={`/category/${category.slug}`}>
                  {category.name}
                </Link>
              </li>
              <li className={styles.active}>
                <span>{productName}</span>
              </li>
            </>
          ) : (
            pathnames.map((value, index) => {
              const to =
                '/' + pathnames.slice(0, index + 1).join('/');
              const isLast = index === pathnames.length - 1;
              const label = breadcrumbNameMap[value] || value;

              return (
                <li key={to} className={isLast ? styles.active : ''}>
                  {isLast ? (
                    <span>{label}</span>
                  ) : (
                    <Link to={to}>{label}</Link>
                  )}
                </li>
              );
            })
          )}
        </ol>
      </nav>
    </div>
  );
}
