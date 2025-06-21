import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ExploreProduct.css";
import { formatPrice } from "../utils/productData";

function ExploreProduct({ image, title, price, product_id, rating }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product_id}`, {
      state: { background: location },
    });
  };

  // Function to generate stars based on rating
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half">☆</span>);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`}>☆</span>);
    }

    return stars;
  };

  return (
    <div className="explore-product" onClick={handleProductClick}>
      <img
        src={
          image ||
          "https://img.freepik.com/premium-vector/no-photos-icon-vector-image-can-be-used-spa_120816-264914.jpg"
        }
        alt={title}
        className="product-image"
      />
      <h3 className="product-title">{title || "Title not defined"}</h3>
      <div className="product-rating-container">
        <div className="rating-stars">{renderRatingStars(rating)}</div>
        <span className="rating-count">
          {rating && rating > 0 ? `(${rating.toFixed(1)})` : "(No ratings)"}
        </span>
      </div>
      <div className="product-price">
        <span className="price-currency">₹</span>
        <span className="price-value">{formatPrice(price)}</span>
      </div>
    </div>
  );
}

export default ExploreProduct;
