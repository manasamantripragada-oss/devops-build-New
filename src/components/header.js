import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{ padding: "15px", background: "#222", color: "#fff" }}>
      <h2>🛒 React E-Commerce</h2>
      <nav>
        <Link to="/" style={{ marginRight: "15px", color: "#fff" }}>Home</Link>
        <Link to="/products" style={{ color: "#fff" }}>Products</Link>
      </nav>
    </header>
  );
}

export default Header;
