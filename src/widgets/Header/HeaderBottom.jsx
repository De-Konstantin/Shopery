import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';

function HeaderBottom() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className={styles.headerBottom}>
      <div className={`${styles.headerBottom__container} _container`}>
        <div className={styles.headerBottom__sidebarWrapper}>
          <button
            className={styles.headerBottom__menuToggle}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <div
              className={`${styles.headerBottom__menuToggleIcon} ${isSidebarOpen ? styles.open : ''}`}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            {isSidebarOpen && (
              <div className={styles.headerBottom__menuToggleText}>
                <span>All Categories</span>
                <span className="icon-arr-d"></span>
              </div>
            )}
          </button>

          {isSidebarOpen && (
            <SidebarMenu className={styles.headerBottom__sidebar} />
          )}
        </div>
        <nav className={styles.headerBottom__mainNav}>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/pages">Pages</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </nav>
        </nav>

        <div className={styles.headerBottom__phoneNumber}>
          <span className="icon-phone-call"></span>
          <span>
            <a href="tel:2195550114">(219) 555–0114</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default HeaderBottom;
