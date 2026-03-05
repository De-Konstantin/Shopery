import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getProducts,
  createProduct,
  updateProduct,
  uploadProductImage,
  getCategories,
} from '../../utils/api';
import {
  isDemoSession,
  isDemoProduct,
  addDemoProduct,
  updateDemoProduct,
  getAllDemoProducts,
} from '../../utils/demoMode';
import Button from '../../components/buttons/Button/Button';
import styles from './ProductForm.module.scss';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingImageIndex, setUploadingImageIndex] =
    useState(null);
  const [categories, setCategories] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    discount: '',
    quantity: '',
    category: '',
    description: '',
    images: [],
    tags: '',
    weight: '',
  });

  useEffect(() => {
    // Загрузить категории при монтировании
    loadCategories();

    if (isEditing) {
      loadProduct();
    }
  }, [id, isEditing]);

  const loadCategories = async () => {
    try {
      const cats = await getCategories();
      setCategories(cats || []);
    } catch (err) {
      console.error('Error loading categories:', err);
      // Ошибка загрузки категорий не критична
    }
  };

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if it's a demo product first
      if (isDemoProduct(Number(id))) {
        const demoProducts = getAllDemoProducts();
        const product = demoProducts.find((p) => p.id === Number(id));

        if (product) {
          setFormData({
            name: product.productName || '',
            slug: product.slug || '',
            price: product.priceOrigin || '',
            discount: product.discount || '',
            quantity: product.quantity || '',
            category: product.category || '',
            description: product.description || '',
            images: Array.isArray(product.images)
              ? product.images
              : [],
            tags: Array.isArray(product.tags)
              ? product.tags.join(', ')
              : product.tags
                ? product.tags.split(',').join(', ')
                : '',
            weight: product.weight || '',
          });
          setLoading(false);
          return;
        }
      }

      // Load from API for real products
      const productsResponse = await getProducts({
        page: 1,
        limit: 100,
      });
      const products = Array.isArray(productsResponse)
        ? productsResponse
        : productsResponse?.items || [];
      const product = products.find((p) => p.id === Number(id));

      if (product) {
        if (
          product.category &&
          !categories.includes(product.category)
        ) {
          setCategories((prev) => [...prev, product.category]);
        }

        setFormData({
          name: product.productName || '',
          slug: product.slug || '',
          price: product.priceOrigin || '',
          discount: product.discount || '',
          quantity: product.quantity || '',
          category: product.category || '',
          description: product.description || '',
          images: Array.isArray(product.images) ? product.images : [],
          tags: Array.isArray(product.tags)
            ? product.tags.join(', ')
            : product.tags
              ? product.tags.split(',').join(', ')
              : '',
          weight: product.weight || '',
        });
      } else {
        setError('Product not found');
      }
    } catch (err) {
      setError(err.message || 'Failed to load product');
      console.error('Error loading product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (isDemoSession()) {
      setError(
        'Demo mode: file upload is disabled. Use "Add Image URL" to attach images.',
      );
      e.target.value = '';
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError(`File ${file.name} is not a valid image`);
        continue;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError(`Image ${file.name} exceeds 5MB limit`);
        continue;
      }

      try {
        setUploadingImage(true);
        setUploadingImageIndex(i);
        setError(null);

        // Upload file
        const response = await uploadProductImage(file);
        if (response.success && response.imageUrl) {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, response.imageUrl],
          }));
          setSuccess(`Image ${file.name} uploaded successfully!`);
        }
      } catch (err) {
        setError(err.message || `Failed to upload ${file.name}`);
        console.error('Error uploading image:', err);
      } finally {
        setUploadingImage(false);
        setUploadingImageIndex(null);
      }
    }
    // Reset input
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddImageUrl = (url) => {
    if (!url.trim()) {
      setError('Please enter a valid image URL');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, url.trim()],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const finalCategory = isAddingCategory
      ? newCategory.trim()
      : formData.category.trim();

    // Validation
    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }

    if (!formData.price) {
      setError('Price is required');
      return;
    }

    if (!finalCategory) {
      setError('Category is required');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        name: formData.name.trim(),
        slug:
          formData.slug.trim() ||
          formData.name.toLowerCase().replace(/\s+/g, '-'),
        price: parseFloat(formData.price),
        discount: formData.discount
          ? parseFloat(formData.discount)
          : 0,
        quantity: parseInt(formData.quantity, 10) || 0,
        category: finalCategory,
        description: formData.description.trim(),
        images: formData.images.filter((img) => img && img.trim()),
        tags: formData.tags
          ? formData.tags
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        weight: formData.weight ? formData.weight.trim() : null,
      };

      if (isEditing) {
        // Check if editing a demo product
        if (isDemoProduct(id)) {
          updateDemoProduct(parseInt(id, 10), {
            productName: payload.name,
            slug: payload.slug,
            priceOrigin: payload.price,
            discount: payload.discount,
            quantity: payload.quantity,
            category: payload.category,
            description: payload.description,
            images: payload.images,
            tags: payload.tags,
            weight: payload.weight,
          });
          setSuccess('Demo product updated successfully!');
        } else {
          // 🔒 Блокируем редактирование реальных товаров для демо-админа
          if (isDemoSession()) {
            setError(
              'Demo admin cannot edit real products from the database. You can only edit your own demo products (temporary test items).',
            );
            setSubmitting(false);
            return;
          }
          await updateProduct(id, payload);
          setSuccess('Product updated successfully!');
        }
      } else {
        // Check if in demo session for new product
        if (isDemoSession()) {
          const newProduct = addDemoProduct({
            productName: payload.name,
            slug: payload.slug,
            priceOrigin: payload.price,
            discount: payload.discount,
            quantity: payload.quantity,
            category: payload.category,
            description: payload.description,
            images: payload.images,
            tags: payload.tags,
            weight: payload.weight,
          });
          setSuccess('Demo product created successfully!');
          toast.success('Demo product created!');
        } else {
          await createProduct(payload);
          setSuccess('Product created successfully!');
          toast.success('Product created successfully!');
        }
      }

      if (!isEditing || !isDemoSession()) {
        toast.success(
          isEditing ? 'Product updated!' : 'Product created!',
        );
      }

      if (finalCategory && !categories.includes(finalCategory)) {
        setCategories((prev) => [...prev, finalCategory]);
      }

      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
    } catch (err) {
      const errorMsg = err.message || 'Failed to save product';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Error saving product:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading product...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>

        {error && (
          <div className={styles.alert + ' ' + styles.error}>
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className={styles.alert + ' ' + styles.success}>
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            {/* Left Column */}
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Product Name{' '}
                  <span className={styles.required}>*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="slug" className={styles.label}>
                  Slug
                </label>
                <input
                  id="slug"
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="product-slug (auto-generated if empty)"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.label}>
                  Category
                  <span className={styles.required}>*</span>
                </label>

                <div className={styles.categoryControls}>
                  {isAddingCategory ? (
                    <input
                      id="newCategory"
                      type="text"
                      value={newCategory}
                      onChange={(event) =>
                        setNewCategory(event.target.value)
                      }
                      placeholder="Enter new category"
                      className={styles.input}
                    />
                  ) : (
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={styles.input}
                    >
                      <option value="">-- Select Category --</option>
                      {categories.map((cat, index) => (
                        <option key={`${cat}-${index}`} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  )}

                  <button
                    type="button"
                    className={styles.categoryToggleBtn}
                    onClick={() => {
                      const nextIsAdding = !isAddingCategory;
                      setIsAddingCategory(nextIsAdding);

                      if (nextIsAdding) {
                        setNewCategory(formData.category || '');
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          category:
                            newCategory.trim() || prev.category,
                        }));
                      }
                    }}
                  >
                    {isAddingCategory
                      ? 'Use Existing'
                      : '+ New Category'}
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="price" className={styles.label}>
                  Price <span className={styles.required}>*</span>
                </label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="discount" className={styles.label}>
                  Discount (%)
                </label>
                <input
                  id="discount"
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="0"
                  step="0.01"
                  className={styles.input}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label htmlFor="quantity" className={styles.label}>
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="0"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="weight" className={styles.label}>
                  Weight (with unit)
                </label>
                <input
                  id="weight"
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g., 750g, 1.5L, 2kg, 10pcs"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Product Images</label>
                <div className={styles.imageUploadSection}>
                  <div>
                    <label
                      htmlFor="imageFile"
                      className={styles.label}
                    >
                      Upload Images (multiple)
                    </label>
                    <input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className={styles.input}
                    />
                    {uploadingImage && (
                      <p className={styles.uploading}>
                        Uploading image{' '}
                        {(uploadingImageIndex || 0) + 1}...
                      </p>
                    )}
                  </div>

                  <div className={styles.imageUrlInput}>
                    <label
                      htmlFor="imageUrlAdd"
                      className={styles.label}
                    >
                      Or Add Image URL
                    </label>
                    <div className={styles.inputGroup}>
                      <input
                        id="imageUrlAdd"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className={styles.input}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddImageUrl(e.target.value);
                            e.target.value = '';
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input =
                            document.getElementById('imageUrlAdd');
                          handleAddImageUrl(input.value);
                          input.value = '';
                        }}
                        className={styles.addImageBtn}
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {formData.images.length > 0 && (
                <div className={styles.imageGallery}>
                  <h3 className={styles.galleryTitle}>
                    Images ({formData.images.length})
                  </h3>
                  <div className={styles.imageGrid}>
                    {formData.images.map((image, index) => (
                      <div key={index} className={styles.imageItem}>
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className={styles.removeImageBtn}
                          title="Remove image"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="tags" className={styles.label}>
                  Tags (comma-separated)
                </label>
                <input
                  id="tags"
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="tag1, tag2, tag3"
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          <div className={styles.formGroup + ' ' + styles.fullWidth}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className={styles.textarea}
              rows="5"
            />
          </div>

          <div className={styles.actions}>
            <Button
              type="submit"
              variant="fill"
              size="medium"
              disabled={submitting}
            >
              {submitting
                ? 'Saving...'
                : isEditing
                  ? 'Update Product'
                  : 'Create Product'}
            </Button>
            <Button
              type="button"
              variant="border"
              size="medium"
              onClick={handleCancel}
              disabled={submitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
