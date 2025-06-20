import React from "react";
import "./ExploreProduct.css";
import { Link, useLocation } from "react-router-dom";

function ExploreProduct({ image, title, price, product_id }) {
  const location = useLocation();

  return (
    <Link
      to={`/product/${product_id}`}
      state={{ background: location }} // This is the key part for the modal
    >
      <div className="explore-product">
        <img
          src={
            image ||
            "https://img.freepik.com/premium-vector/no-photos-icon-vector-image-can-be-used-spa_120816-264914.jpg"
          }
          alt="Product"
          className="product-image"
        />
        <div className="product-title">
          {title || "Title not defined \n product category: Monitor"}
        </div>
        <div className="product-description">
          <div className="product-rating-container">
            <div className="rating-stars">
              <i className="fas fa-star">⭐</i>
              <i className="fas fa-star">⭐</i>
              <i className="fas fa-star">⭐</i>
              <i className="fas fa-star">⭐</i>
            </div>
            <div className="rating-count">(1,234 ratings)</div>
          </div>
          <div className="product-price">
            <span className="price-currency">$</span>
            <span className="price-value">{price || 0.0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ExploreProduct;
