import React, { useEffect } from 'react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';

function HeaderBottom() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Закрыть меню при нажатии Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSidebarOpen]);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.headerBottom}>
      {/* Overlay backdrop для закрытия меню при клике вне */}
      {isSidebarOpen && (
        <div
          className={styles.headerBottom__overlay}
          onClick={closeSidebar}
        />
      )}

      <div className={`${styles.headerBottom__container} _container`}>
        <div className={styles.headerBottom__sidebarWrapper}>
          <button
            className={styles.headerBottom__menuToggle}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isSidebarOpen}
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
            <SidebarMenu
              className={styles.headerBottom__sidebar}
              onClose={closeSidebar}
            />
          )}
        </div>
        <nav className={styles.headerBottom__mainNav}>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'headerMenuLink' : ''
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'headerMenuLink' : ''
                }
                to="/shop"
              >
                Shop
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'headerMenuLink' : ''
                }
                to="/404"
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'headerMenuLink' : ''
                }
                to="/about"
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'headerMenuLink' : ''
                }
                to="/contact"
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
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
