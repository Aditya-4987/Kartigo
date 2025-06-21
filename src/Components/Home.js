import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { getAllProducts, getProductCategories } from "../utils/productData";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const heroRef = useRef(null);
  const navigate = useNavigate();

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollValue = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollValue * 0.3}px)`;
        heroRef.current.style.opacity = 1 - scrollValue * 0.002;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Get random featured products
    const allProducts = getAllProducts();
    const randomProducts = [...allProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    setFeaturedProducts(randomProducts);

    // Get all categories
    setCategories(getProductCategories());
  }, []);

  const navigateToCategory = (category) => {
    navigate("/explore", { state: { selectedCategory: category } });
  };

  return (
    <div className="home">
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content" ref={heroRef}>
            <div className="hero-text">
              <h1 className="animated-text">Discover Endless Possibilities</h1>
              <p>
                Find exactly what you're looking for with our intuitive shopping
                experience
              </p>
              <Link to="/explore" className="cta-button pulse">
                Start Exploring
              </Link>
            </div>
          </div>
          <div className="hero-overlay"></div>
        </section>

        {/* Featured Categories */}
        <section className="category-section">
          <div className="section-title">
            <h2>Browse Categories</h2>
            <div className="title-underline"></div>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`category-card category-${index}`}
                onClick={() => navigateToCategory(category)}
              >
                <div className="category-hover-effect"></div>
                <h3>{category}</h3>
                <span className="explore-text">Explore &rarr;</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="featured-products">
          <div className="section-title">
            <h2>Featured Products</h2>
            <div className="title-underline"></div>
          </div>
          <div className="product-carousel">
            {featuredProducts.map((product) => (
              <div key={product.id} className="carousel-item">
                <div
                  className="product-card"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="product-image-container">
                    <img src={product.mainImage} alt={product.title} />
                    <div className="quick-view">Quick View</div>
                  </div>
                  <h3>
                    {product.title.length > 40
                      ? product.title.substring(0, 40) + "..."
                      : product.title}
                  </h3>
                  <div className="product-price">
                    <span className="current-price">
                      ₹{product.Price.toLocaleString("en-IN")}
                    </span>
                    <span className="original-price">
                      ₹{product.MRP.toLocaleString("en-IN")}
                    </span>
                    <span className="discount-tag">
                      {Math.round((1 - product.Price / product.MRP) * 100)}% OFF
                    </span>
                  </div>
                  <div className="rating-stars">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                    <span className="rating-count">
                      ({product.rating.toFixed(1)})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/explore" className="view-all-btn">
            View All Products
          </Link>
        </section>

        {/* Promotional Banner */}
        <section className="promo-banner">
          <div className="promo-content">
            <h2>Special Offer</h2>
            <h3>Get 10% off your first order</h3>
            <p>
              Use code: <strong>WELCOME10</strong> at checkout
            </p>
            <button className="cta-button secondary">Shop Now</button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials">
          <div className="section-title">
            <h2>What Our Customers Say</h2>
            <div className="title-underline"></div>
          </div>
          <div className="testimonial-container">
            <div className="testimonial-card">
              <div className="quote">"</div>
              <p>
                Amazing products and lightning-fast shipping. Kartigo has become
                my go-to for all tech purchases!
              </p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Priya Sharma</h4>
                  <div className="author-rating">★★★★★</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote">"</div>
              <p>
                The customer service is exceptional. They went above and beyond
                to help me find exactly what I needed.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Rajesh Kumar</h4>
                  <div className="author-rating">★★★★★</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote">"</div>
              <p>
                Quality products at competitive prices. The website is also
                incredibly easy to navigate. Highly recommend!
              </p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>Aarav Patel</h4>
                  <div className="author-rating">
                    ★★★★<span>☆</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <h2>Join Our Newsletter</h2>
            <p>
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
          <div className="newsletter-decoration"></div>
        </section>

        {/* Features */}
        <section className="features-section">
          <div className="feature">
            <div className="feature-icon shipping"></div>
            <h3>Free Shipping</h3>
            <p>On all orders above ₹500</p>
          </div>
          <div className="feature">
            <div className="feature-icon returns"></div>
            <h3>Easy Returns</h3>
            <p>30-day return policy</p>
          </div>
          <div className="feature">
            <div className="feature-icon secure"></div>
            <h3>Secure Checkout</h3>
            <p>100% Protected Payments</p>
          </div>
          <div className="feature">
            <div className="feature-icon support"></div>
            <h3>24/7 Support</h3>
            <p>Dedicated customer service</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
