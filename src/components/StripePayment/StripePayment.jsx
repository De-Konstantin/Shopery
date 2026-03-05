import { useState, useEffect } from 'react';

import { loadStripe } from '@stripe/stripe-js';

import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import styles from './StripePayment.module.scss';
import { API_BASE_URL } from '../../utils/api';

// Initialize Stripe with publishable key
let stripePromise = null;

const getStripe = async () => {
  if (!stripePromise) {
    try {
      // Get publishable key from backend
      const response = await fetch(`${API_BASE_URL}/payment/config`);

      const { publishableKey } = await response.json();

      if (publishableKey) {
        stripePromise = loadStripe(publishableKey);
      }
    } catch (error) {
      console.error('Failed to load Stripe config:', error);
    }
  }

  return stripePromise;
};

export default function StripePayment({
  amount,
  onSuccess,
  onError,
  onCancel,
}) {
  const [stripe, setStripe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStripe().then((stripeInstance) => {
      setStripe(stripeInstance);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        {' '}
        <div className={styles.loading}>
          {' '}
          Loading payment system...{' '}
        </div>{' '}
      </div>
    );
  }

  if (!stripe) {
    return (
      <div className={styles.container}>
        {' '}
        <div className={styles.error}>
          {' '}
          Failed to load Stripe. Check your settings.{' '}
        </div>{' '}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {' '}
      <div className={styles.header}>
        {' '}
        <h2 className={styles.title}>Payment</h2>{' '}
        <p className={styles.subtitle}>
          {' '}
          Secure payment via Stripe{' '}
        </p>{' '}
      </div>{' '}
      <Elements stripe={stripe}>
        {' '}
        <CheckoutForm
          amount={amount}
          onSuccess={onSuccess}
          onError={onError}
        />{' '}
      </Elements>{' '}
      {onCancel && (
        <button onClick={onCancel} className={styles.cancelButton}>
          {' '}
          Cancel{' '}
        </button>
      )}
    </div>
  );
}
