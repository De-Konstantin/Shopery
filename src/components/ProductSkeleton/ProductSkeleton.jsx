import styles from "./ProductSkeleton.module.scss";

/**
 * ProductSkeleton - компонент загрузки для карточки товара
 */
function ProductSkeleton({ className }) {
  return (
    <div className={`${styles.skeleton} ${className || ""}`}>
      <div className={styles.skeleton__image}></div>
      <div className={styles.skeleton__content}>
        <div className={styles.skeleton__line} style={{ marginBottom: "12px" }}></div>
        <div className={styles.skeleton__line} style={{ width: "70%", marginBottom: "16px" }}></div>
        <div className={styles.skeleton__rating}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={styles.skeleton__star}></div>
          ))}
        </div>
        <div className={styles.skeleton__price}>
          <div className={styles.skeleton__line} style={{ width: "40%" }}></div>
          <div className={styles.skeleton__line} style={{ width: "30%", marginLeft: "8px" }}></div>
        </div>
        <div className={styles.skeleton__line} style={{ height: "40px", marginTop: "12px" }}></div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
