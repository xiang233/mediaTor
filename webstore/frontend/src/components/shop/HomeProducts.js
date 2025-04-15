import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import styles from "../general/flexCards.module.css";
import axios, { isCancel, AxiosError } from "axios";

function HomeProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get("/api/products/");
      setProducts(data);
      console.log(data);
    }
    fetchProducts();
    console.log(products);
  }, []);
  return (
    <div className={styles.flex_posts}>
      {products &&
        products.map((product, i) => (
          <ProductCard
            header={product.brand}
            subheader={product.category}
            title={product.name}
            secondary={product.description}
            picture={null}
            additional={{ _id: product._id }}
            key={i}
          ></ProductCard>
        ))}
    </div>
  );
}

export default HomeProducts;
