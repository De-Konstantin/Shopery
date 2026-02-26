import React from 'react';
import styles from './Header.module.scss';
import Adress from '../../components/Adress/Adress';
import ChangeCurrency from '../../features/ChangeCurrency/ChangeCurrency';
import ChangeLanguage from '../../features/ChangeLang/ChangeLang';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function HeaderTop() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className={styles.headerTop}>
      <div className={`${styles.headerTop__container} _container`}>
        <Adress />

        <div className={styles.headerTop__controls}>
          <ChangeCurrency />
          <ChangeLanguage />
          <span>|</span>
          {isAuthenticated ? (
            <>
              <span className={styles.headerTop__user}>
                Hello, {user?.firstName || 'User'}
              </span>
              <span>|</span>
              <button
                onClick={logout}
                className={styles.headerTop__logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className={styles.headerTop__link}>
                Sign In
              </Link>
              <span>/</span>
              <Link to="/register" className={styles.headerTop__link}>
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
