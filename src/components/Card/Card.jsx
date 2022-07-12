import React from "react";
import styles from "./Card.module.css";
export const Card = ({ product}) => {
  const { id, brand, thumbnail, title } = product;
  return (
    <div key={id} className={styles.container}>
      <img className={styles.product_thumbnail} src={thumbnail} alt={title} />
      <p className={styles.brand}>{brand}</p>
      <p className={styles.title}>{title}</p>
    </div>
  );
};
