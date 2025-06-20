import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Counter from "../assets/ReactBits/Components-files/Counter/Counter"; // Import the Counter
import "./ProductDetails.css";

function ProductDetails() {
  const { product_id } = useParams();
  const navigate = useNavigate();

  // Add state for quantity
  const [quantity, setQuantity] = useState(1);
  const [closing, setClosing] = useState(false);

  // Close modal and navigate back to /explore with fade-out
  const handleClose = () => {
    setClosing(true);
    // Use a longer timeout to ensure animations complete
    setTimeout(() => {
      navigate("/explore");
    }, 350); // Slightly longer than animation to ensure completion
  };

  // Handler for increment/decrement
  const handleCounterChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className={`product-modal-container${closing ? " closing" : ""}`}>
      <div className="product-modal-backdrop" onClick={handleClose}></div>
      <div className={`product-details${closing ? " fade-out" : ""}`}>
        <button className="product-details-close" onClick={handleClose}>
          ×
        </button>
        <h2>Product Details (ID: {product_id})</h2>
        <div className="product-details-page">
          {/* Product details content */}
          <div className="product-details-content">
            <div className="product-details-left">
              <div className="product-details-image">
                <img
                  src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1747748950/Croma%20Assets/Computers%20Peripherals/Tablets%20and%20iPads/Images/314071_0_tn5yfm.png"
                  alt="Product"
                />
              </div>
            </div>
            <div className="product-details-right">
              <h1 className="product-details-title">
                Apple iPad 11-inch: A16 chip, 11-inch Model, Liquid Retina
                Display
              </h1>
              <div className="product-details-rating">
                <div className="rating-stars">
                  ⭐⭐⭐⭐<span className="half-star">⭐</span>
                </div>
                <span className="rating-count">(1,234 ratings)</span>
              </div>
              <div className="product-details-price">
                <span className="price-currency">$</span>
                <span className="price-value">299.00</span>
                <span className="price-currency disclaimer">
                  (Incl. all Taxes)
                </span>
              </div>

              <div className="product-details-description">
                <h3>Key Features:</h3>
                <ul>
                  <li>
                    11 inches (27.59 cm) Liquid Retina Display, 60 Hz Refresh
                    Rate
                  </li>
                  <li>128GB ROM</li>
                  <li>Apple A16 Chip, Penta Core</li>
                  <li>iPadOS 18</li>
                  <li>Upto 10 Hours Battery Life</li>
                  <li>12 MP Primary Camera, 12 MP Front Camera</li>
                  <li>Landscape Stereo Speakers, Touch ID, Video Mirroring</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="product-details-specifications">
            <h3>Specifications</h3>
            <ul>
              <li>
                <strong>Display:</strong>
                <ul type="none">
                  <li>Liquid Retina display</li>
                  <li>LED backlit Multi-Touch display with IPS technology</li>
                  <li>2360-by-1640-pixel resolution at 264 ppi</li>
                  <li>True Tone</li>
                  <li>500 nits brightness</li>
                  <li>Fingerprint-resistant oleophobic coating</li>
                  <li>Supports Apple Pencil (USB-C)</li>
                  <li>Supports Apple Pencil (1st generation)</li>
                </ul>
              </li>
              <li>
                <strong>Processor:</strong>
                <ul type="none">
                  <li>Apple A16 chip with 6-core CPU</li>
                  <li>5-core GPU</li>
                  <li>16-core Neural Engine</li>
                </ul>
              </li>
              <li>
                <strong>Camera:</strong>
                <ul type="none">
                  <li>12 MP Wide camera with f/1.8 aperture</li>
                  <li>12 MP Ultra Wide front camera with f/2.4 aperture</li>
                  <li>Center Stage</li>
                  <li>Smart HDR 4</li>
                  <li>4K video recording at 24 fps, 30 fps, or 60 fps</li>
                  <li>1080p HD video recording at 30 fps or 60 fps</li>
                </ul>
              </li>
              <li>
                <strong>Battery:</strong>
                <ul type="none">
                  <li>
                    Up to 10 hours of surfing the web on Wi-Fi or watching
                    videos
                  </li>
                  <li>
                    Up to 9 hours of surfing the web using a cellular data
                    network
                  </li>
                  <li>
                    Built-in 28.6-watt-hour rechargeable lithium-polymer battery
                  </li>
                  <li>USB-C connector for charging and accessories</li>
                </ul>
              </li>
              <li>
                <strong>Connectivity:</strong>
                <ul type="none">
                  <li>Wi-Fi 6 (802.11ax) with MIMO</li>
                  <li>Optional 5G cellular connectivity</li>
                  <li>Bluetooth 5.3</li>
                  <li>
                    USB-C connector with support for USB 3.1 Gen 2 (up to 10
                    Gbps)
                  </li>
                </ul>
              </li>
              <li>
                <strong>Operating System:</strong>
                <ul type="none">
                  <li>
                    iPadOS 18 with features like Stage Manager, Freeform, and
                    improved multitasking capabilities
                  </li>
                </ul>
              </li>
              <li>
                <strong>Dimensions and Weight:</strong>
                <ul type="none">
                  <li>Height: 247.6 mm (9.74 inches)</li>
                  <li>Width: 178.5 mm (7.02 inches)</li>
                  <li>Depth: 6.1 mm (0.24 inches)</li>
                  <li>Weight: 481 grams (1.06 pounds) for Wi-Fi model</li>
                  <li>
                    Weight: 482 grams (1.06 pounds) for Wi-Fi + Cellular model
                  </li>
                </ul>
              </li>
              <li>
                <strong>Other Features:</strong>
                <ul type="none">
                  <li>FaceTime HD camera</li>
                  <li>Touch ID for secure authentication</li>
                  <li>Landscape stereo speakers</li>
                  <li>Video mirroring and video out support</li>
                  <li>Apple Pencil (1st generation) support</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`product-details-actions${closing ? " fade-out" : ""}`}>
        {/* Counter and buttons */}
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
        <button className="add-to-cart-btn">Add to Cart</button>
        <button className="buy-now-btn">Buy Now</button>
      </div>
    </div>
  );
}

export default ProductDetails;
