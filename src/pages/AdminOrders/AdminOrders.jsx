import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, updateOrderStatus } from '../../utils/api';
import Button from '../../components/buttons/Button/Button';
import styles from './AdminOrders.module.scss';

export default function AdminOrders() {
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    if (!isAdmin || !isAuthenticated) {
      navigate('/');
      return;
    }
    loadOrders();
  }, [isAdmin, isAuthenticated, navigate]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdating(orderId);
      await updateOrderStatus(orderId, newStatus);
      await loadOrders();
    } catch (err) {
      alert(err.message || 'Failed to update order status');
      console.error('Error updating status:', err);
    } finally {
      setUpdating(null);
    }
  };

  const getFilteredOrders = () => {
    if (filter === 'all') return orders;
    return orders.filter((order) => order.status === filter);
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

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FFA500',
      paid: '#4CAF50',
      shipped: '#2196F3',
      delivered: '#8BC34A',
      cancelled: '#F44336',
    };
    return colors[status] || '#999';
  };

  const statuses = [
    'pending',
    'paid',
    'shipped',
    'delivered',
    'cancelled',
  ];
  const filteredOrders = getFilteredOrders();

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error}</p>
        <Button onClick={loadOrders} variant="fill">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Orders Management</h1>
        <p className={styles.count}>Total: {orders.length}</p>
      </div>

      <div className={styles.filterBar}>
        {['all', ...statuses].map((status) => (
          <button
            key={status}
            className={`${styles.filterBtn} ${filter === status ? styles.active : ''}`}
            onClick={() => setFilter(status)}
          >
            {status === 'all'
              ? 'All'
              : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className={styles.empty}>
          <p>No orders found</p>
        </div>
      ) : (
        <div className={styles.ordersTable}>
          <div className={styles.tableHeader}>
            <div className={styles.colId}>Order ID</div>
            <div className={styles.colCustomer}>Customer</div>
            <div className={styles.colDate}>Date</div>
            <div className={styles.colTotal}>Total</div>
            <div className={styles.colStatus}>Status</div>
            <div className={styles.colActions}>Actions</div>
          </div>

          {filteredOrders.map((order) => (
            <div key={order.id} className={styles.tableRow}>
              <div className={styles.colId}>#{order.id}</div>
              <div className={styles.colCustomer}>
                {order.isGuest
                  ? `${order.email} (Guest)`
                  : `${order.user?.firstName} ${order.user?.lastName}`}
              </div>
              <div className={styles.colDate}>
                {formatDate(order.createdAt)}
              </div>
              <div className={styles.colTotal}>
                ${order.total.toFixed(2)}
              </div>
              <div className={styles.colStatus}>
                <span
                  className={styles.statusBadge}
                  style={{
                    backgroundColor: getStatusColor(order.status),
                  }}
                >
                  {order.status}
                </span>
              </div>
              <div className={styles.colActions}>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value)
                  }
                  disabled={updating === order.id}
                  className={styles.statusSelect}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
