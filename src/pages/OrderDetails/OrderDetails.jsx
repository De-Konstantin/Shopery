import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/buttons/Button/Button';
import styles from './OrderDetails.module.scss';

export default function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    loadOrderDetails();
  }, [isAuthenticated, orderId, navigate]);

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      const response = await fetch(
        `http://localhost:3000/orders/${orderId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOrder(data);
    } catch (err) {
      setError(err.message || 'Failed to load order details');
      console.error('Error loading order:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: '#FFA500',
      paid: '#4CAF50',
      shipped: '#2196F3',
      delivered: '#8BC34A',
      cancelled: '#F44336',
    };
    return statusColors[status] || '#666';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pending',
      paid: 'Paid',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.error}>
            <h2>Order not found</h2>
            <p>
              {error ||
                'This order does not exist or you do not have access to it.'}
            </p>
            <Button
              onClick={() => navigate('/orders')}
              variant="fill"
            >
              Back to Orders
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link to="/orders" className={styles.breadcrumbLink}>
            My Orders
          </Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Order #{order.id}</span>
        </div>

        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Order #{order.id}</h1>
            <p className={styles.date}>
              {formatDate(order.createdAt)}
            </p>
          </div>
          <span
            className={styles.status}
            style={{ backgroundColor: getStatusColor(order.status) }}
          >
            {getStatusLabel(order.status)}
          </span>
        </div>

        <div className={styles.content}>
          {/* Order Summary */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Order Summary</h2>
            <div className={styles.summaryCard}>
              <div className={styles.summaryRow}>
                <span className={styles.label}>Subtotal:</span>
                <span className={styles.value}>
                  ${order.total?.toFixed(2) || '0.00'}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.label}>Shipping:</span>
                <span className={styles.value}>Free</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span className={styles.label}>Total:</span>
                <span className={styles.value}>
                  ${order.total?.toFixed(2) || '0.00'}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Shipping Address
              </h2>
              <div className={styles.infoCard}>
                <p>{order.shippingAddress}</p>
              </div>
            </div>
          )}

          {/* Customer Info */}
          {(order.user || order.guestEmail) && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Customer Information
              </h2>
              <div className={styles.infoCard}>
                {order.user ? (
                  <>
                    <p>
                      <strong>Name:</strong> {order.user.firstName}{' '}
                      {order.user.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {order.user.email}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Guest Customer</strong>
                    </p>
                    {order.guestName && (
                      <p>
                        <strong>Name:</strong> {order.guestName}
                      </p>
                    )}
                    {order.guestEmail && (
                      <p>
                        <strong>Email:</strong> {order.guestEmail}
                      </p>
                    )}
                    {order.guestPhone && (
                      <p>
                        <strong>Phone:</strong> {order.guestPhone}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Order Items ({order.items?.length || 0})
            </h2>
            <div className={styles.itemsWrapper}>
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div key={index} className={styles.item}>
                    <div className={styles.itemImage}>
                      {item.product?.images?.[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.productName}
                        />
                      ) : (
                        <div className={styles.noImage}>No Image</div>
                      )}
                    </div>
                    <div className={styles.itemInfo}>
                      <h3 className={styles.itemName}>
                        {item.product?.productName || 'Product'}
                      </h3>
                      <p className={styles.itemMeta}>
                        Quantity: {item.quantity} × $
                        {item.price?.toFixed(2)}
                      </p>
                    </div>
                    <div className={styles.itemTotal}>
                      $
                      {(item.quantity * item.price)?.toFixed(2) ||
                        '0.00'}
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noItems}>
                  No items in this order
                </p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            onClick={() => navigate('/orders')}
            variant="border"
          >
            Back to Orders
          </Button>
          <Button onClick={() => navigate('/shop')} variant="fill">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
