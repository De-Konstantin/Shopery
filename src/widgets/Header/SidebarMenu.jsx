import React from 'react';
import CategoryList from './CategoryList';

export default function SidebarMenu({ className, onClose }) {
  return (
    <aside className={className}>
      <CategoryList onClose={onClose} />
    </aside>
  );
}
