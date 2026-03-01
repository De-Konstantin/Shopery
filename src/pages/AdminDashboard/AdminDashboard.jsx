import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  getProducts,
  deleteProduct,
  getCategories,
} from '../../utils/api';
import Button from '../../components/buttons/Button/Button';
import styles from './AdminDashboard.module.scss';

export default function AdminDashboard() {
  const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortField, setSortField] = useState('productName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, searchTerm, selectedCategory, sortField, sortOrder]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCategory,
    sortField,
    sortOrder,
    itemsPerPage,
  ]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const limit = 100;

      const [firstPageData, categoriesData] = await Promise.all([
        getProducts({
          page: 1,
          limit,
        }),
        getCategories().catch(() => []),
      ]);

      let productsList = Array.isArray(firstPageData)
        ? firstPageData
        : firstPageData?.items || [];

      const totalPages = firstPageData?.meta?.totalPages || 1;

      if (totalPages > 1) {
        for (let page = 2; page <= totalPages; page += 1) {
          const pageData = await getProducts({
            page,
            limit,
          });
          const pageItems = Array.isArray(pageData)
            ? pageData
            : pageData?.items || [];

          productsList = [...productsList, ...pageItems];
        }
      }

      setProducts(productsList);
      setCategories(categoriesData || []);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let result = [...products];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.productName?.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term),
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    result.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      if (valueA == null) valueA = '';
      if (valueB == null) valueB = '';

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      }

      const comparison = String(valueA).localeCompare(String(valueB));

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredProducts(result);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      return;
    }

    setSortField(field);
    setSortOrder('asc');
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm('Are you sure you want to delete this product?')
    ) {
      return;
    }

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete product');
      console.error('Error deleting product:', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/products/$ {
                id
            }

            /edit`);
  };

  const handleAddNew = () => {
    navigate('/admin/products/new');
  };

  const stats = {
    total: products.length,
    categories: new Set(
      products.map((product) => product.category).filter(Boolean),
    ).size,
    inStock: products.filter((product) => product.quantity > 0)
      .length,
    avgPrice:
      products.length > 0
        ? (
            products.reduce(
              (sum, product) => sum + (product.priceOrigin || 0),
              0,
            ) / products.length
          ).toFixed(2)
        : '0.00',
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '⇅';
    return sortOrder === 'asc' ? '▲' : '▼';
  };

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStartIndex = (safeCurrentPage - 1) * itemsPerPage;
  const pageEndIndex = pageStartIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    pageStartIndex,
    pageEndIndex,
  );

  const getVisiblePageNumbers = () => {
    const pages = [];
    const start = Math.max(1, safeCurrentPage - 2);
    const end = Math.min(totalPages, safeCurrentPage + 2);

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    return pages;
  };

  return (
    <div className={styles.page}>
      {' '}
      <div className={styles.container}>
        {' '}
        <div className={styles.header}>
          {' '}
          <div>
            {' '}
            <h1 className={styles.title}>Products Management</h1>{' '}
            <p className={styles.subtitle}>
              {' '}
              Manage all products in one place{' '}
            </p>{' '}
          </div>{' '}
          <Button onClick={handleAddNew} variant="fill" size="medium">
            {' '}
            + Add Product{' '}
          </Button>{' '}
        </div>{' '}
        {!loading && products.length > 0 && (
          <div className={styles.stats}>
            {' '}
            <div className={styles.statCard}>
              {' '}
              <span className={styles.statIcon}>📦</span>{' '}
              <div>
                {' '}
                <p className={styles.statValue}>
                  {' '}
                  {stats.total}
                </p>{' '}
                <p className={styles.statLabel}>
                  {' '}
                  Total Products{' '}
                </p>{' '}
              </div>{' '}
            </div>{' '}
            <div className={styles.statCard}>
              {' '}
              <span className={styles.statIcon}>🏷️</span>{' '}
              <div>
                {' '}
                <p className={styles.statValue}>
                  {' '}
                  {stats.categories}
                </p>{' '}
                <p className={styles.statLabel}>Categories</p>{' '}
              </div>{' '}
            </div>{' '}
            <div className={styles.statCard}>
              {' '}
              <span className={styles.statIcon}>✅</span>{' '}
              <div>
                {' '}
                <p className={styles.statValue}>
                  {' '}
                  {stats.inStock}
                </p>{' '}
                <p className={styles.statLabel}>In Stock</p>{' '}
              </div>{' '}
            </div>{' '}
            <div className={styles.statCard}>
              {' '}
              <span className={styles.statIcon}>💰</span>{' '}
              <div>
                {' '}
                <p className={styles.statValue}>
                  {' '}
                  $ {stats.avgPrice}
                </p>{' '}
                <p className={styles.statLabel}>Avg Price</p>{' '}
              </div>{' '}
            </div>{' '}
          </div>
        )}
        {!loading && products.length > 0 && (
          <div className={styles.filters}>
            {' '}
            <div className={styles.filterGroup}>
              {' '}
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                className={styles.searchInput}
              />{' '}
              {searchTerm && (
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={() => setSearchTerm('')}
                >
                  {' '}
                  ✕{' '}
                </button>
              )}
            </div>{' '}
            <select
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(event.target.value)
              }
              className={styles.filterSelect}
            >
              {' '}
              <option value="">All Categories</option>{' '}
              {categories.map((category) => (
                <option key={category} value={category}>
                  {' '}
                  {category}
                </option>
              ))}
            </select>{' '}
            <div className={styles.pageSizeControl}>
              {' '}
              <label
                htmlFor="items-per-page"
                className={styles.pageSizeLabel}
              >
                {' '}
                Per page:{' '}
              </label>{' '}
              <select
                id="items-per-page"
                className={styles.pageSizeSelect}
                value={itemsPerPage}
                onChange={(event) =>
                  setItemsPerPage(Number(event.target.value))
                }
              >
                {' '}
                {PAGE_SIZE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {' '}
                    {option}
                  </option>
                ))}
              </select>{' '}
            </div>{' '}
            {(searchTerm || selectedCategory) && (
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
              >
                {' '}
                Reset Filters{' '}
              </button>
            )}
          </div>
        )}
        {error && (
          <div className={styles.error}>
            {' '}
            <p> {error}</p>{' '}
            <button onClick={loadData} className={styles.retryBtn}>
              {' '}
              Retry{' '}
            </button>{' '}
          </div>
        )}
        {loading ? (
          <div className={styles.loading}>Loading products...</div>
        ) : filteredProducts.length > 0 ? (
          <>
            {' '}
            <p className={styles.resultInfo}>
              {' '}
              Showing {pageStartIndex + 1}-{' '}
              {Math.min(pageEndIndex, filteredProducts.length)}
              of {filteredProducts.length}
              filtered ( {products.length}
              total){' '}
            </p>{' '}
            <div className={styles.tableWrapper}>
              {' '}
              <table className={styles.table}>
                {' '}
                <thead>
                  {' '}
                  <tr>
                    {' '}
                    <th
                      className={styles.sortable}
                      onClick={() => handleSort('productName')}
                    >
                      {' '}
                      Name {getSortIcon('productName')}
                    </th>{' '}
                    <th
                      className={styles.sortable}
                      onClick={() => handleSort('category')}
                    >
                      {' '}
                      Category {getSortIcon('category')}
                    </th>{' '}
                    <th
                      className={styles.sortable}
                      onClick={() => handleSort('priceOrigin')}
                    >
                      {' '}
                      Price {getSortIcon('priceOrigin')}
                    </th>{' '}
                    <th
                      className={styles.sortable}
                      onClick={() => handleSort('quantity')}
                    >
                      {' '}
                      Quantity {getSortIcon('quantity')}
                    </th>{' '}
                    <th>Discount</th> <th>Actions</th>{' '}
                  </tr>{' '}
                </thead>{' '}
                <tbody>
                  {' '}
                  {paginatedProducts.map((product) => (
                    <tr key={product.id}>
                      {' '}
                      <td>
                        {' '}
                        <div className={styles.productName}>
                          {' '}
                          {product.images && product.images[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.productName}
                              className={styles.productImage}
                            />
                          )}
                          <span> {product.productName}</span>{' '}
                        </div>{' '}
                      </td>{' '}
                      <td>
                        {' '}
                        <span className={styles.badge}>
                          {' '}
                          {product.category || 'N/A'}
                        </span>{' '}
                      </td>{' '}
                      <td className={styles.price}>
                        {' '}
                        $ {product.priceOrigin?.toFixed(2) || '0.00'}
                      </td>{' '}
                      <td>
                        {' '}
                        <span
                          className={
                            product.quantity > 0
                              ? styles.inStock
                              : styles.outStock
                          }
                        >
                          {' '}
                          {product.quantity || 0}
                        </span>{' '}
                      </td>{' '}
                      <td> {product.discount || 0}%</td>{' '}
                      <td>
                        {' '}
                        <div className={styles.actions}>
                          {' '}
                          <button
                            onClick={() => handleEdit(product.id)}
                            className={styles.editBtn}
                            title="Edit product"
                          >
                            {' '}
                            ✎ Edit{' '}
                          </button>{' '}
                          <button
                            onClick={() => handleDelete(product.id)}
                            className={styles.deleteBtn}
                            title="Delete product"
                          >
                            {' '}
                            🗑 Delete{' '}
                          </button>{' '}
                        </div>{' '}
                      </td>{' '}
                    </tr>
                  ))}
                </tbody>{' '}
              </table>{' '}
            </div>{' '}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                {' '}
                <button
                  type="button"
                  className={`$ {
                                styles.pageBtn
                            }

                            $ {
                                styles.pageBtnNav
                            }

                            `}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={safeCurrentPage === 1}
                >
                  {' '}
                  Prev{' '}
                </button>{' '}
                {getVisiblePageNumbers().map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`$ {
                                            styles.pageBtn
                                        }

                                        $ {
                                            page===safeCurrentPage ? styles.pageBtnActive : ''
                                        }

                                        `}
                    onClick={() => setCurrentPage(page)}
                  >
                    {' '}
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className={`$ {
                                styles.pageBtn
                            }

                            $ {
                                styles.pageBtnNav
                            }

                            `}
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages),
                    )
                  }
                  disabled={safeCurrentPage === totalPages}
                >
                  {' '}
                  Next{' '}
                </button>{' '}
              </div>
            )}
          </>
        ) : (searchTerm || selectedCategory) &&
          products.length > 0 ? (
          <div className={styles.empty}>
            {' '}
            <p>No products match current filters</p>{' '}
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              variant="border"
              size="medium"
            >
              {' '}
              Reset Filters{' '}
            </Button>{' '}
          </div>
        ) : (
          <div className={styles.empty}>
            {' '}
            <p>No products found</p>{' '}
            <Button
              onClick={handleAddNew}
              variant="fill"
              size="medium"
            >
              {' '}
              Create First Product{' '}
            </Button>{' '}
          </div>
        )}
      </div>{' '}
    </div>
  );
}
