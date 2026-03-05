import { useState } from 'react';
import {
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import styles from './CheckoutForm.module.scss';
import { API_BASE_URL } from '../../utils/api';

const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true,
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

export default function CheckoutForm({ amount, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // CRITICAL: Validate amount to catch NaN, undefined, or invalid values
    console.log(`Amount received: ${amount}, Type: ${typeof amount}`);

    if (
      !amount ||
      typeof amount !== 'number' ||
      !Number.isFinite(amount)
    ) {
      toast.error(
        'Invalid cart total. Please ensure items are in your cart.',
      );
      return;
    }

    if (amount < 1) {
      toast.error('Amount must be at least $0.01 (1 cent).');
      return;
    }

    setIsProcessing(true);

    try {
      // Create Payment Intent on backend
      console.log(
        `Sending payment intent request with amount: ${amount} cents (type: ${typeof amount})`,
      );
      const response = await fetch(
        `${API_BASE_URL}/payment/create-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount }),
        },
      );

      console.log(
        `Payment intent response status: ${response.status}`,
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Payment intent error response:', errorData);
        throw new Error(
          errorData.message ||
            `Server error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      const { clientSecret } = data;

      if (!clientSecret) {
        throw new Error('Failed to get client secret from server');
      }

      console.log('Payment intent created successfully');

      // Confirm payment using new API
      const { error, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (error) {
        console.error('Stripe error:', error);
        toast.error(`Payment error: ${error.message}`);
        onError?.(error);
      } else if (
        paymentIntent &&
        paymentIntent.status === 'succeeded'
      ) {
        console.log(
          'Payment succeeded, payment intent:',
          paymentIntent,
        );
        toast.success('Payment successful!');
        onSuccess?.(paymentIntent);
      } else if (paymentIntent) {
        console.log(
          'Unexpected payment status:',
          paymentIntent.status,
        );
        toast.error(
          `Unexpected payment status: ${paymentIntent.status}`,
        );
        onError?.(paymentIntent);
      }
    } catch (err) {
      console.error('Payment error details:', err);
      toast.error(err.message || 'Failed to process payment');
      onError?.(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.cardElement}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={styles.submitButton}
      >
        {isProcessing
          ? 'Processing...'
          : `Pay $${(amount / 100).toFixed(2)}`}
      </button>

      <div className={styles.testCards}>
        <p className={styles.testCardsTitle}>Test cards:</p>
        <ul>
          <li>
            Successful payment: <code>4242 4242 4242 4242</code>
          </li>
          <li>
            Error: <code>4000 0000 0000 0002</code>
          </li>
          <li>CVV: any 3 digits, date: any future</li>
        </ul>
      </div>
    </form>
  );
}
