import React, { useState } from "react";
import "./Cart.css";
import { useStateValue } from "../StateProvider";
import { getCartTotal, getShippingCost } from "../reducer";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/productData";

function Cart() {
  const [{ cart }, dispatch] = useStateValue();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();

  const subtotal = getCartTotal(cart);
  const shipping = getShippingCost(subtotal);
  const total = subtotal + shipping;
  const savedAmount = cart.reduce(
    (amount, item) => (item.mrp - item.price) * item.quantity + amount,
    0
  );

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    dispatch({
      type: "UPDATE_QUANTITY",
      id,
      quantity: newQuantity,
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  // Proceed to checkout
  const handleCheckout = () => {
    navigate("/payment");
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Shopping Cart</h1>

      {cart?.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/explore" className="cart-shop-now-btn">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-header">
              <span className="cart-header-product">Product</span>
              <span className="cart-header-price">Price</span>
              <span className="cart-header-quantity">Quantity</span>
              <span className="cart-header-total">Total</span>
              <span className="cart-header-action"></span>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-product">
                  <img src={item.image} alt={item.title} />
                  <div className="cart-item-details">
                    <Link to={`/product/${item.id}`}>
                      <h3>{item.title}</h3>
                    </Link>
                    <p className="cart-item-id">ID: {item.id}</p>
                  </div>
                </div>

                <div className="cart-item-price">
                  <div className="cart-price-current">
                    ₹{formatPrice(item.price)}
                  </div>
                  {item.mrp > item.price && (
                    <div className="cart-price-original">
                      ₹{formatPrice(item.mrp)}
                    </div>
                  )}
                </div>

                <div className="cart-item-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  ₹{formatPrice(item.price * item.quantity)}
                </div>

                <div className="cart-item-action">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="cart-summary-row">
              <span>Items ({cart.length}):</span>
              <span>₹{formatPrice(subtotal)}</span>
            </div>
            <div className="cart-summary-row savings">
              <span>You Save:</span>
              <span>₹{formatPrice(savedAmount)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping:</span>
              <span>
                {shipping === 0 ? "FREE" : `₹${formatPrice(shipping)}`}
              </span>
            </div>
            {shipping > 0 && (
              <div className="free-shipping-note">
                Add ₹{formatPrice(1500 - subtotal)} more to get FREE shipping
              </div>
            )}
            <div className="cart-summary-divider"></div>
            <div className="cart-summary-row total">
              <span>Order Total:</span>
              <span>₹{formatPrice(total)}</span>
            </div>
            <button
              className={`checkout-button ${checkoutLoading ? "loading" : ""}`}
              onClick={handleCheckout}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
            </button>
            <Link to="/explore" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
