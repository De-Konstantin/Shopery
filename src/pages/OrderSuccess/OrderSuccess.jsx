import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import styles from './OrderSuccess.module.scss';
import Button from '../../components/buttons/Button/Button';

function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!orderId) {
      return;
    }

    try {
      await navigator.clipboard.writeText(String(orderId));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard errors silently to avoid breaking UX.
    }
  };

  // Если данных заказа нет (пользователь зашёл напрямую по URL)
  if (!order) {
    return (
      <div className={styles.page}>
        <div className={`${styles.container} _container`}>
          <div className={styles.icon}>
            <span
              className={`${styles.iconGlyph} icon-check`}
              aria-hidden="true"
            />
          </div>
          <h1 className={styles.title}>Order Confirmed!</h1>
          <p className={styles.subtitle}>Order Details</p>
          <div className={styles.orderNumberRow}>
            <span className={styles.orderId}>#{orderId}</span>
            <button
              type="button"
              className={styles.copyButton}
              onClick={handleCopy}
            >
              Copy
            </button>
            {copied && <span className={styles.copied}>Copied</span>}
          </div>
          <p className={styles.message}>
            Your order has been successfully placed. We&apos;ve sent a
            confirmation email to your inbox.
          </p>
          <div className={styles.actionsButtons}>
            <Link to="/shop" className={styles.buttonLink}>
              <Button>Continue Shopping</Button>
            </Link>
            <Link to="/" className={styles.buttonLink}>
              <Button variant="border">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Отображение полных данных заказа
  const {
    items,
    total,
    shippingAddress,
    guestName,
    guestEmail,
    user,
    isGuest,
  } = order;
  const customerName = isGuest
    ? guestName
    : `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
  const customerEmail = isGuest ? guestEmail : user?.email;

  return (
    <div className={styles.page}>
      <div className={`${styles.container} _container`}>
        <div className={styles.icon}>
          <span
            className={`${styles.iconGlyph} icon-check`}
            aria-hidden="true"
          />
        </div>
        <h1 className={styles.title}>Order Confirmed!</h1>
        <p className={styles.subtitle}>Thank you for your purchase</p>

        <div className={styles.orderInfo}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Order Number:</span>
            <div className={styles.orderNumberRow}>
              <span className={styles.orderId}>#{orderId}</span>
              <button
                type="button"
                className={styles.copyButton}
                onClick={handleCopy}
              >
                Copy
              </button>
              {copied && (
                <span className={styles.copied}>Copied</span>
              )}
            </div>
          </div>

          {customerName && (
            <div className={styles.infoRow}>
              <span className={styles.label}>Customer:</span>
              <span className={styles.value}>{customerName}</span>
            </div>
          )}

          {customerEmail && (
            <div className={styles.infoRow}>
              <span className={styles.label}>
                <span
                  className={`${styles.labelIcon} icon-email`}
                  aria-hidden="true"
                />
                Email:
              </span>
              <span className={styles.value}>{customerEmail}</span>
            </div>
          )}

          {shippingAddress && (
            <div className={styles.infoRow}>
              <span className={styles.label}>
                <span
                  className={`${styles.labelIcon} icon-map-pin`}
                  aria-hidden="true"
                />
                Shipping Address:
              </span>
              <span className={styles.value}>{shippingAddress}</span>
            </div>
          )}
        </div>

        <div className={styles.itemsSection}>
          <h3 className={styles.sectionTitle}>Order Items</h3>
          <div className={styles.itemsList}>
            {items.map((item, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>
                    {item.product?.productName ||
                      item.product?.name ||
                      'Product'}
                  </span>
                  <span className={styles.itemQuantity}>
                    Qty: {item.quantity}
                  </span>
                </div>
                <span className={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Total:</span>
              <span className={styles.summaryValue}>
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          {customerEmail && (
            <p className={styles.message}>
              We&apos;ve sent a confirmation email to{' '}
              <strong>{customerEmail}</strong>
            </p>
          )}
          <div className={styles.actionsButtons}>
            <Link to="/shop" className={styles.buttonLink}>
              <Button>Continue Shopping</Button>
            </Link>
            <Link to="/" className={styles.buttonLink}>
              <Button variant="border">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
