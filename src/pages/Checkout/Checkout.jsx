import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/buttons/Button/Button';
import styles from './Checkout.module.scss';
import { createOrder } from '../../utils/api';

const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';

function Checkout() {
  const navigate = useNavigate();
  const { items, cartTotal, isEmpty, emptyCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const [form, setForm] = useState({
    fullName: user?.firstName
      ? `${user.firstName} ${user?.lastName || ''}`.trim()
      : '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const orderItems = useMemo(
    () =>
      items.map((item) => ({
        productId: Number(item.id),
        quantity: item.quantity,
        price: item.price,
      })),
    [items],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutofill = () => {
    setForm({
      fullName: 'Demo Buyer',
      email: 'demo@shopery.dev',
      phone: '+1 (555) 000-0000',
      address: 'Demo street 123, Shopery City',
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!orderItems.length) {
      setError('Корзина пуста.');
      return;
    }

    if (!form.address) {
      setError('Укажите адрес доставки.');
      return;
    }

    if (!isAuthenticated && (!form.fullName || !form.email)) {
      setError('Для гостевого заказа укажите имя и email.');
      return;
    }

    const payload = {
      items: orderItems,
      shippingAddress: form.address,
      guestName: isAuthenticated ? undefined : form.fullName,
      guestEmail: isAuthenticated ? undefined : form.email,
      guestPhone: isAuthenticated ? undefined : form.phone,
    };

    try {
      setIsSubmitting(true);
      const orderData = await createOrder(payload);
      emptyCart();
      navigate(`/order-success/${orderData.id}`, {
        state: { order: orderData },
      });
    } catch {
      setError('Не удалось оформить заказ. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEmpty) {
    return (
      <section className={`${styles.checkout} _container`}>
        <div className={styles.emptyState}>
          <h2>Корзина пуста</h2>
          <p>Добавьте товары, чтобы оформить заказ.</p>
          <Button onClick={() => navigate('/shop')}>
            Перейти в каталог
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.checkout} _container`}>
      <h2 className={styles.title}>Checkout</h2>
      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label>Full name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="John Smith"
              disabled={isSubmitting}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              disabled={isSubmitting}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              disabled={isSubmitting}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Shipping address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street, City, Country"
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          {demoMode && (
            <Button
              type="button"
              variant="border"
              onClick={handleAutofill}
            >
              Autofill demo data
            </Button>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <Button type="submit" width="long" disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Place order'}
          </Button>
        </form>

        <aside className={styles.summary}>
          <h3>Order summary</h3>
          <div className={styles.summaryList}>
            {items.map((item) => (
              <div className={styles.summaryRow} key={item.id}>
                <span>{item.name}</span>
                <span>
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
