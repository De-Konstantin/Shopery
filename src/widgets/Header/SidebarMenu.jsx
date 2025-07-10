import React from 'react';
import CategoryList from './CategoryList';
// import styles from './Header.module.scss';

export default function SidebarMenu({ className }) {
  return (
    <aside className={className}>
      <CategoryList />
    </aside>
  );
}
