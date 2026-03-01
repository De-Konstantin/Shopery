import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../buttons/Button/Button';
import styles from './ProductReviews.module.scss';

export default function ProductReviews({ productId }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:3000/products/${productId}/reviews`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to load reviews');
      }

      const data = await response.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load reviews');
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    if (!formData.comment.trim()) {
      alert('Please write a comment');
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');

      const response = await fetch(
        `http://localhost:3000/products/${productId}/reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: parseFloat(formData.rating),
            comment: formData.comment.trim(),
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Failed to submit review',
        );
      }

      // Очистить форму и перезагрузить отзывы
      setFormData({ rating: 5, comment: '' });
      setShowForm(false);
      await loadReviews();
    } catch (err) {
      alert(err.message || 'Failed to submit review');
      console.error('Error submitting review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (review) => {
    setEditingId(review.id);
    setEditForm({ rating: review.rating, comment: review.comment });
  };

  const handleEditSubmit = async (reviewId) => {
    if (!editForm.comment.trim()) {
      alert('Please write a comment');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/products/${productId}/reviews/${reviewId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: parseFloat(editForm.rating),
            comment: editForm.comment.trim(),
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Failed to update review',
        );
      }

      setEditingId(null);
      await loadReviews();
    } catch (err) {
      alert(err.message || 'Failed to update review');
      console.error('Error updating review:', err);
    }
  };

  const handleDeleteClick = async (reviewId) => {
    if (
      !window.confirm('Are you sure you want to delete this review?')
    ) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/products/${productId}/reviews/${reviewId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Failed to delete review',
        );
      }

      await loadReviews();
    } catch (err) {
      alert(err.message || 'Failed to delete review');
      console.error('Error deleting review:', err);
    }
  };

  const canEditDelete = (review) => {
    return (
      user && (user.id === review.user?.id || user.role === 'admin')
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={
            i <= rating ? styles.starFilled : styles.starEmpty
          }
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Customer Reviews ({reviews.length})
        </h2>
        {isAuthenticated ? (
          <Button
            onClick={() => setShowForm(!showForm)}
            variant="fill"
            size="small"
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </Button>
        ) : (
          <Button
            onClick={() => navigate('/signin')}
            variant="fill"
            size="small"
          >
            Sign In to Review
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Rating *</label>
            <div className={styles.ratingSelector}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, rating: star })
                  }
                  className={
                    star <= formData.rating
                      ? styles.starButtonActive
                      : styles.starButton
                  }
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="comment" className={styles.label}>
              Your Review *
            </label>
            <textarea
              id="comment"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              placeholder="Share your experience with this product..."
              className={styles.textarea}
              rows="5"
              required
            />
          </div>

          <div className={styles.formActions}>
            <Button
              type="submit"
              variant="fill"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </form>
      )}

      {loading ? (
        <div className={styles.loading}>Loading reviews...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : reviews.length > 0 ? (
        <div className={styles.reviewsList}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.review}>
              {editingId === review.id ? (
                <div className={styles.editForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Rating *</label>
                    <div className={styles.ratingSelector}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setEditForm({ ...editForm, rating: star })
                          }
                          className={
                            star <= editForm.rating
                              ? styles.starButtonActive
                              : styles.starButton
                          }
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label
                      htmlFor="editComment"
                      className={styles.label}
                    >
                      Your Review *
                    </label>
                    <textarea
                      id="editComment"
                      value={editForm.comment}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          comment: e.target.value,
                        })
                      }
                      placeholder="Share your experience with this product..."
                      className={styles.textarea}
                      rows="5"
                      required
                    />
                  </div>

                  <div className={styles.formActions}>
                    <Button
                      onClick={() => handleEditSubmit(review.id)}
                      variant="fill"
                      size="small"
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => setEditingId(null)}
                      variant="outline"
                      size="small"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.reviewHeader}>
                    <div>
                      <div className={styles.reviewAuthor}>
                        {review.user?.firstName}{' '}
                        {review.user?.lastName}
                      </div>
                      <div className={styles.reviewDate}>
                        {formatDate(review.createdAt)}
                      </div>
                    </div>
                    <div className={styles.reviewRating}>
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className={styles.reviewComment}>
                    {review.comment}
                  </div>

                  {canEditDelete(review) && (
                    <div className={styles.reviewActions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEditClick(review)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteClick(review.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No reviews yet. Be the first to review this product!</p>
        </div>
      )}
    </div>
  );
}
