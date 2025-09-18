import React from 'react';
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';
// import './CartPage.css'; // подключи стили
import styles from './CartPage.module.scss';
import Button from '../../components/buttons/Button/Button';
function CartPage() {
  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart,
  } = useCart();

  if (isEmpty)
    return (
      <div className={`${styles.emptyContainer} _container`}>
        <h2 className={styles.emptyTitle}>Your cart is empty</h2>
      </div>
    );

  return (
    <div className={`${styles.container} _container`}>
      <h2 className={styles.title}>My Shopping Cart</h2>
      <div className={styles.content}>
        {/* Таблица товаров */}
        <div className={styles.items}>
          <div className={styles.cart__header}>
            <span>PRODUCT</span>
            <span>PRICE</span>
            <span>QUANTITY</span>
            <span>SUBTOTAL</span>
          </div>

          {items.map((item) => {
            const subtotal = (item.price * item.quantity).toFixed(2);
            return (
              <div className={styles.row} key={item.id}>
                <div className={styles.product}>
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                </div>
                <div>${item.price.toFixed(2)}</div>
                <div className={styles.quantity__control}>
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <div className={styles.subtotal}>
                  ${subtotal}
                  <button
                    className={styles.remove}
                    onClick={() => removeItem(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}

          <div className={styles.actions}>
            <Link to="/">
              <Button variant="border" size="medium">
                Return to shop
              </Button>
            </Link>
            <Button
              variant="border"
              size="medium"
              onClick={() => emptyCart()}
              // className="btn update"
            >
              Delate All
            </Button>
          </div>

          <div className={styles.coupon}>
            <input type="text" placeholder="Enter code" />
            <Button>Apply Coupon</Button>
          </div>
        </div>

        {/* Итог */}
        <div className={styles.total}>
          <h3>Cart Total</h3>
          <div className={styles.total__line}>
            <span>Subtotal:</span>{' '}
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className={styles.total__line}>
            <span>Shipping:</span> <span>Free</span>
          </div>
          <div
            className={`${styles.total__line} ${styles.total__amount}`}
          >
            <span>Total:</span> <span>${cartTotal.toFixed(2)}</span>
          </div>
          <Button>Proceed to checkout</Button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
