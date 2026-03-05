import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import Button from '../../components/buttons/Button/Button';
import StripePayment from '../../components/StripePayment/StripePayment';
import styles from './Checkout.module.scss';
import { createOrder } from '../../utils/api';
import { getDemoProductsInCart } from '../../utils/demoMode';

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
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'card'
  const [showStripePayment, setShowStripePayment] = useState(false);
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
      setError('Cart is empty.');
      return;
    }

    // Check for demo products in cart
    const demoProducts = getDemoProductsInCart(items);
    if (demoProducts.length > 0) {
      const demoTitles = demoProducts.map((p) => p.title).join(', ');
      setError(
        `Demo products cannot be purchased: ${demoTitles}. Please remove them from your cart.`,
      );
      return;
    }

    if (!form.address) {
      setError('Please provide shipping address.');
      return;
    }

    if (!isAuthenticated && (!form.fullName || !form.email)) {
      setError('For guest checkout, please provide name and email.');
      return;
    }

    // If card payment selected - show Stripe form
    if (paymentMethod === 'card') {
      setShowStripePayment(true);
      return;
    }

    // Process order with cash payment
    await processOrder();
  };

  const processOrder = async (paymentIntentId = null) => {
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
      setError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = (paymentIntent) => {
    console.log('Payment successful:', paymentIntent.id);
    // Pass form data and orderItems to processOrder
    const payload = {
      items: orderItems,
      shippingAddress: form.address,
      guestName: isAuthenticated ? undefined : form.fullName,
      guestEmail: isAuthenticated ? undefined : form.email,
      guestPhone: isAuthenticated ? undefined : form.phone,
    };
    processOrderWithPayment(payload, paymentIntent.id);
  };

  const processOrderWithPayment = async (
    payload,
    paymentIntentId,
  ) => {
    try {
      setIsSubmitting(true);
      console.log('Creating order with payload:', payload);
      const orderData = await createOrder(payload);
      console.log('Order created successfully:', orderData);
      emptyCart();
      navigate(`/order-success/${orderData.id}`, {
        state: { order: orderData },
      });
    } catch (err) {
      console.error('Order creation error:', err);
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        'Failed to create order';
      setError(errorMsg);
      setShowStripePayment(false);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    setShowStripePayment(false);
  };

  // Show Stripe payment form
  if (showStripePayment) {
    return (
      <section className={`${styles.checkout} _container`}>
        <h2 className={styles.title}>Payment</h2>
        <StripePayment
          amount={Math.round(cartTotal * 100)} // convert to cents
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          onCancel={() => setShowStripePayment(false)}
        />
      </section>
    );
  }

  if (isEmpty) {
    return (
      <section className={`${styles.checkout} _container`}>
        <div className={styles.emptyState}>
          <h2>Your cart is empty</h2>
          <p>Add products to continue checkout.</p>
          <Button onClick={() => navigate('/shop')}>
            Go to Shop
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

          <div className={styles.paymentMethod}>
            <h3>Payment method</h3>
            <div className={styles.paymentOptions}>
              <label className={styles.paymentOption}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className={styles.paymentOptionContent}>
                  <span className={styles.paymentOptionTitle}>
                    Cash on delivery
                  </span>
                  <span className={styles.paymentOptionDescription}>
                    Pay with cash when you receive your order
                  </span>
                </div>
              </label>

              <label className={styles.paymentOption}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className={styles.paymentOptionContent}>
                  <span className={styles.paymentOptionTitle}>
                    Card payment (Stripe)
                  </span>
                  <span className={styles.paymentOptionDescription}>
                    Secure online card payment
                  </span>
                </div>
              </label>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <Button type="submit" width="long" disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing order...'
              : paymentMethod === 'card'
                ? 'Proceed to payment'
                : 'Place order'}
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
