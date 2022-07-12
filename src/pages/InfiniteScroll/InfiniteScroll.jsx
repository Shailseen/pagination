import React, { useRef, useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { useProduct } from "../../context/product-context";
import { Loader } from "../../components/Loader/Loader";
import styles from "./InfiniteScroll.module.css";

export const InfiniteScroll = () => {
  const { productsData, getMoreProducts, isLoading } = useProduct();
  const [skip, setSkip] = useState(0);
  const containerRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  const callback = (entries) => {
    if (entries[0].isIntersecting && entries[0].intersectionRatio > 0) {
      setSkip((previousSkipProduct) => previousSkipProduct + 5);
    }
  };

  useEffect(() => {
    getMoreProducts(skip, setHasMore);
  }, [skip]);

  useEffect(() => {
    if (!containerRef.current.lastChild || !hasMore) return;

    const observer = new IntersectionObserver(callback);
    observer.observe(containerRef.current.lastChild);
    return () => {
      observer.unobserve(containerRef.current.lastChild);
    };
  }, [productsData]);

  return (
    <>
      <div className={styles.container} ref={containerRef}>
        {productsData.map((product) => {
          return <Card product={product} key={product.id} />;
        })}
      </div>
      {isLoading && <Loader />}
      {!hasMore && <p className={styles.message}>No more products</p>}
    </>
  );
};
