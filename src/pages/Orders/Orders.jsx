import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/buttons/Button/Button';
import styles from './Orders.module.scss';

export default function Orders() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Перенаправить на signin если не авторизован
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    loadOrders();
  }, [isAuthenticated, navigate]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3000/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
      console.error('Error loading orders:', err);
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleViewOrder = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Orders</h1>
          <p className={styles.subtitle}>
            {user?.firstName}, here are your order history
          </p>
        </div>

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
            <button onClick={loadOrders} className={styles.retryBtn}>
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading your orders...</p>
          </div>
        ) : orders && orders.length > 0 ? (
          <div className={styles.ordersWrapper}>
            <div className={styles.ordersGrid}>
              {orders.map((order) => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.orderId}>
                        Order #{order.id}
                      </h3>
                      <p className={styles.date}>
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <span
                      className={styles.status}
                      style={{
                        backgroundColor: getStatusColor(order.status),
                      }}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.item}>
                      <span className={styles.label}>Items:</span>
                      <span className={styles.value}>
                        {order.items?.length || 0}
                      </span>
                    </div>
                    <div className={styles.item}>
                      <span className={styles.label}>Total:</span>
                      <span className={styles.value}>
                        ${order.total?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                    {order.shippingAddress && (
                      <div className={styles.item}>
                        <span className={styles.label}>Address:</span>
                        <span className={styles.value}>
                          {order.shippingAddress}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className={styles.cardFooter}>
                    <Button
                      onClick={() => handleViewOrder(order.id)}
                      variant="fill"
                      size="small"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📦</div>
            <h2>No orders yet</h2>
            <p>
              You haven&apos;t placed any orders yet. Start shopping!
            </p>
            <Button
              onClick={() => navigate('/shop')}
              variant="fill"
              size="medium"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
