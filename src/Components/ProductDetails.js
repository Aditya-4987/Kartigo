import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Counter from "../assets/ReactBits/Components-files/Counter/Counter";
import "./ProductDetails.css";
import { getProductById, formatPrice } from "../utils/productData";
import { useStateValue } from "../StateProvider";
import Lottie from "lottie-react";
import { useNotification } from "./NotificationSystem";

// Remove infinity animation, keep only addToCart animation
// import infinityAnim from "../assets/icons/infinity.json"; <- Remove this line
import addToCartAnim from "../assets/icons/addToCart.json";

function ProductDetails({ isModal }) {
  // Add the notification hook
  const { addNotification } = useNotification();

  // Existing state variables
  const { product_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [closing, setClosing] = useState(false);
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullScreenPreview, setFullScreenPreview] = useState(false);
  const videoRef = useRef(null);
  const fullScreenVideoRef = useRef(null);
  const thumbnailsRef = useRef(null);
  const [{ cart }, dispatch] = useStateValue();

  // Simplify animation state
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  // Remove infinityRef, keep only cartAnimRef
  // const infinityRef = useRef(null); <- Remove this line
  const cartAnimRef = useRef(null);

  useEffect(() => {
    const fetchedProduct = getProductById(product_id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    } else {
      // Handle product not found
      console.error(`Product with ID ${product_id} not found`);
    }
  }, [product_id]);

  useEffect(() => {
    // Reset video playback when changing images/videos
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    if (fullScreenVideoRef.current) {
      fullScreenVideoRef.current.pause();
      fullScreenVideoRef.current.currentTime = 0;
    }

    // Scroll the thumbnails to make the active one visible
    if (thumbnailsRef.current) {
      const activeThumb =
        thumbnailsRef.current.querySelector(".thumbnail.active");
      if (activeThumb) {
        const scrollPosition =
          activeThumb.offsetLeft -
          thumbnailsRef.current.offsetWidth / 2 +
          activeThumb.offsetWidth / 2;
        thumbnailsRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [currentImageIndex]);

  // Handle keyboard navigation for full-screen preview
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!fullScreenPreview) return;

      switch (e.key) {
        case "Escape":
          setFullScreenPreview(false);
          break;
        case "ArrowLeft":
          navigateImage("prev");
          break;
        case "ArrowRight":
          navigateImage("next");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullScreenPreview]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      // Go back to the previous page if this is a modal
      // Otherwise go to explore page
      if (isModal) {
        navigate(-1);
      } else {
        navigate("/explore");
      }
    }, 350);
  };

  const handleCounterChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const navigateImage = (direction) => {
    if (!product || !product.images || product.images.length === 0) return;

    const totalImages = product.images.length;
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  const openFullScreenPreview = () => {
    setFullScreenPreview(true);
  };

  const closeFullScreenPreview = () => {
    setFullScreenPreview(false);
  };

  // Function to check if the current image is a video
  const isVideoFile = (url) => {
    return (
      url &&
      (url.endsWith(".mp4") || url.endsWith(".mov") || url.includes("/video/"))
    );
  };

  // Function to generate stars based on rating
  const renderRatingStars = (rating) => {
    if (!rating || rating === 0) {
      return <span className="no-rating">No ratings yet</span>;
    }

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={i} className="fas fa-star">
          ⭐
        </i>
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fas fa-star-half">
          ⭐
        </i>
      );
    }

    return stars;
  };

  // Simplified addToCart function without animation delay
  const addToCart = () => {
    // Show button feedback
    setIsAddingToCart(true);

    // Dispatch the item to the data layer immediately
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: product.id,
        title: product.title,
        image: product.mainImage,
        price: product.Price,
        mrp: product.MRP,
        quantity: quantity,
      },
    });

    // Show notification using our new system
    addNotification("Added to cart", addToCartAnim, 3000);

    // Reset the button state after a short delay
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 300);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const currentMedia = product.images[currentImageIndex] || product.mainImage;
  const isVideo = isVideoFile(currentMedia);

  return (
    <>
      <div className={`product-modal-container${closing ? " closing" : ""}`}>
        <div className="product-modal-backdrop" onClick={handleClose}></div>
        <div className={`product-details${closing ? " fade-out" : ""}`}>
          <button className="product-details-close" onClick={handleClose}>
            ×
          </button>
          <h2>Product Details (ID: {product_id})</h2>
          <div className="product-details-page">
            <div className="product-details-content">
              <div className="product-details-left">
                <div className="product-details-image">
                  <button
                    className="image-nav-btn prev-btn"
                    onClick={() => navigateImage("prev")}
                    aria-label="Previous image"
                  >
                    &#10094;
                  </button>

                  {isVideo ? (
                    <video
                      ref={videoRef}
                      src={currentMedia}
                      controls
                      autoPlay={false}
                      muted
                      playsInline
                      loop={false}
                      alt={product.title}
                    />
                  ) : (
                    <img
                      src={currentMedia}
                      alt={product.title}
                      onClick={openFullScreenPreview}
                      className="clickable-image"
                    />
                  )}

                  <button
                    className="image-nav-btn next-btn"
                    onClick={() => navigateImage("next")}
                    aria-label="Next image"
                  >
                    &#10095;
                  </button>

                  <div className="image-counter">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>

                  {!isVideo && (
                    <div className="fullscreen-hint">
                      <span>Click for fullscreen</span>
                      <i className="fullscreen-icon">🔍</i>
                    </div>
                  )}

                  {/* Thumbnails inside the image container */}
                  <div className="image-thumbnails-container">
                    <div className="image-thumbnails" ref={thumbnailsRef}>
                      {product.images.map((image, index) => (
                        <div
                          key={index}
                          className={`thumbnail ${
                            index === currentImageIndex ? "active" : ""
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          {isVideoFile(image) ? (
                            <div className="video-thumbnail">
                              <span>▶</span>
                            </div>
                          ) : (
                            <img src={image} alt={`Thumbnail ${index + 1}`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-details-right">
                <h1 className="product-details-title">{product.title}</h1>
                <div className="product-details-rating">
                  <div className="rating-stars">
                    {renderRatingStars(product.rating)}
                  </div>
                  <span className="rating-count">
                    {product.rating && product.rating > 0
                      ? `(${product.rating.toFixed(1)} ratings)`
                      : "(No ratings yet)"}
                  </span>
                </div>
                <div className="product-details-price">
                  <span className="price-currency">₹</span>
                  <span className="price-value">
                    {formatPrice(product.Price)}
                  </span>
                  <span className="price-currency disclaimer">
                    (Incl. all Taxes)
                  </span>
                </div>

                <div className="product-details-description">
                  <h3>Key Features:</h3>
                  <ul>
                    {product["Key Features"] &&
                      product["Key Features"].map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="product-details-specifications">
              <h3>Specifications</h3>
              <ul>
                {product.specifications &&
                  product.specifications.map((spec, specIndex) => (
                    <li key={specIndex}>
                      <strong>{spec.section}:</strong>
                      <ul type="none">
                        {spec.items &&
                          spec.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={`product-details-actions${closing ? " fade-out" : ""}`}>
          <h3>Quantity:</h3>
          <div className="product-details-counter">
            <button
              className="plus-minus-btn"
              onClick={() => handleCounterChange(-1)}
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
            >
              –
            </button>
            <Counter
              value={quantity}
              fontSize={32}
              gap={2}
              borderRadius={8}
              textColor="#9cccc4"
              places={[10, 1]}
              gradientFrom="transparent"
            />
            <button
              className="plus-minus-btn"
              onClick={() => handleCounterChange(1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            className={`add-to-cart-btn ${isAddingToCart ? "active" : ""}`}
            onClick={addToCart}
            disabled={isAddingToCart}
          >
            Add to Cart
          </button>
          <button className="buy-now-btn">Buy Now</button>
        </div>
      </div>

      {/* Full Screen Image Preview */}
      {fullScreenPreview && (
        <div className="fullscreen-preview">
          <div
            className="fullscreen-backdrop"
            onClick={closeFullScreenPreview}
          ></div>
          <div className="fullscreen-content">
            <button
              className="fullscreen-close"
              onClick={closeFullScreenPreview}
            >
              ×
            </button>

            <div className="fullscreen-image-container">
              <button
                className="image-nav-btn fullscreen-prev-btn"
                onClick={() => navigateImage("prev")}
                aria-label="Previous image"
              >
                &#10094;
              </button>

              {isVideoFile(currentMedia) ? (
                <video
                  ref={fullScreenVideoRef}
                  src={currentMedia}
                  controls
                  autoPlay={false}
                  className="fullscreen-media"
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={currentMedia}
                  alt={product.title}
                  className="fullscreen-media"
                />
              )}

              <button
                className="image-nav-btn fullscreen-next-btn"
                onClick={() => navigateImage("next")}
                aria-label="Next image"
              >
                &#10095;
              </button>
            </div>

            <div className="fullscreen-caption">
              <p>
                {currentImageIndex + 1} / {product.images.length} -{" "}
                {product.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
