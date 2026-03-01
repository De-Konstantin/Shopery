import { useState } from "react";
import styles from "./QuickView.module.scss";

function QuickView({ isOpen, product, onClose }) {
  if (!isOpen || !product) return null;

  const images = Array.isArray(product.images)
    ? product.images
    : Array.isArray(product.image)
      ? product.image
      : product.image ? [product.image] : [];
  const primaryImage = images[0] || "/images/placeholder.svg";

  const priceOrigin = Number(product.priceOrigin) || 0;
  const discount = Number(product.discount) || 0;
  const discountedPrice = discount > 0 ? +(priceOrigin * (1 - discount / 100)).toFixed(2) : priceOrigin;

  return (
    <div className={`${styles.overlay}`} onClick={onClose}>
      <div className={`${styles.modal}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <div className={styles.content}>
          <div className={styles.imageSection}>
            <img src={primaryImage} alt={product.productName} onError={(e) => { e.currentTarget.src = "/images/placeholder.svg"; }} />
            {discount > 0 && <span className={styles.badge}>Sale {discount}%</span>}
          </div>
          <div className={styles.infoSection}>
            <h3 className={styles.name}>{product.productName}</h3>
            <div className={styles.rating}>
              <span>{"★".repeat(Math.floor(product.rating || 0))}{"☆".repeat(5 - Math.floor(product.rating || 0))}</span>
              <span className={styles.ratingNumber}>{(product.rating || 0).toFixed(1)}</span>
            </div>
            <div className={styles.price}>
              {discount > 0 ? (<><span className={styles.current}>${discountedPrice.toFixed(2)}</span><span className={styles.original}>${priceOrigin.toFixed(2)}</span></>) : (<span className={styles.current}>${priceOrigin.toFixed(2)}</span>)}
            </div>
            <p className={styles.description}>{product.description || "No description available"}</p>
            <div className={styles.actions}>
              <button className={styles.addToCart}>Add to Cart</button>
              <button className={styles.favorite}>♡</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickView;
