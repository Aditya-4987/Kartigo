import React from "react";
import "./ExploreProduct.css";

function ExploreProduct({ image, title, price }) {
  return (
    <div className="explore-product">
      <img
        src={
          image ||
          "https://img.freepik.com/premium-vector/no-photos-icon-vector-image-can-be-used-spa_120816-264914.jpg?ga=GA1.1.57386887.1750354638&semt=ais_hybrid&w=740"
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
  );
}

export default ExploreProduct;
