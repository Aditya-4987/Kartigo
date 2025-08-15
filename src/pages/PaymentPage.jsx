import React, { useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadFromLocalStorage } from '../utils/localStorage';
import { getCartTotal, getShippingCost } from '../reducer';

const loadRazorpayScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const PaymentPage = (props) => {
  const navigate = useNavigate();
  // Load from props or localStorage
  const user = props.user || loadFromLocalStorage('user');
  const cartRaw = props.cart ?? loadFromLocalStorage('cart', { items: [], total: 0 });
  const onPaymentSuccess = props.onPaymentSuccess;

  // Normalize cart into a consistent shape { items: [...], subtotal, shipping, total }
  const cart = useMemo(() => {
    const items = Array.isArray(cartRaw) ? cartRaw : (cartRaw?.items ?? []);
    const subtotal = getCartTotal(items);
    // Prefer explicit total if provided and valid; otherwise compute with shipping
    const shipping = getShippingCost(subtotal);
    const computedTotal = subtotal + shipping;
    const providedTotal = Number(typeof cartRaw === 'object' ? cartRaw?.total : NaN);
    const total = Number.isFinite(providedTotal) && providedTotal > 0 ? providedTotal : computedTotal;
    return { items, subtotal, shipping, total };
  }, [cartRaw]);

  useEffect(() => {
    loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  const handlePayment = async () => {
    const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    if (!cart.items?.length) {
      alert('Your cart is empty. Please add items before paying.');
      navigate('/cart');
      return;
    }

    const amountPaise = Math.max(0, Math.round((Number(cart.total) || 0) * 100));
    if (!amountPaise) {
      alert('Payment amount is invalid. Returning to cart to recalculate.');
      navigate('/cart');
      return;
    }

    const options = {
      key: 'rzp_test_R5FnH0GA8USu7V', // Replace with your Razorpay key
      amount: amountPaise, // Amount in paise
      currency: 'INR',
      name: 'Kartigo',
      description: 'Order Payment',
      handler: function (response) {
        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push({
          orderId: response.razorpay_payment_id,
          cart,
          user,
          date: new Date().toISOString(),
        });
        localStorage.setItem('orders', JSON.stringify(orders));
        if (onPaymentSuccess) onPaymentSuccess(response);
      },
      prefill: {
        name: user?.name || '',
        email: user?.email || '',
      },
      theme: { color: '#3399cc' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: '16px' }}>
      <h2>Payment</h2>
      {!cart.items?.length ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/cart">Go to Cart</Link>
        </div>
      ) : (
        <div>
          <p>Subtotal: ₹{cart.subtotal}</p>
          <p>Shipping: ₹{cart.shipping}</p>
          <p><strong>Total Amount: ₹{cart.total}</strong></p>
          <button onClick={handlePayment}>Pay with Razorpay</button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;