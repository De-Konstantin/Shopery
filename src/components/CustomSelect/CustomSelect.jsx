import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.scss';
/* eslint-disable react/prop-types */
export default function CustomSelect({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Закрываем меню при клике вне компонента
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <label className={styles.label} ref={containerRef} tabIndex={0}>
      {label && <span className={styles.labelText}>{label}</span>}

      {/* Кнопка, которая показывает выбранный вариант и открывает меню */}
      <button
        type="button"
        className={styles.selectToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption ? selectedOption.label : 'Выберите...'}
        <span className={styles.iconArrow} />
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <ul className={styles.selectDropdown} role="listbox" tabIndex={-1}>
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`${styles.option} ${opt.value === value ? styles.selected : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onChange(opt.value);
                  setIsOpen(false);
                }
              }}
              tabIndex={0}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </label>
  );
}
