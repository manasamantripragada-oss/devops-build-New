import React from "react";
import ProductCard from "../components/ProductCard";

const products = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Headphones", price: 120 },
  { id: 3, name: "Mobile Phone", price: 600 }
];

function Products() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
