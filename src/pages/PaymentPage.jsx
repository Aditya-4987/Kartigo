import React, { useEffect } from 'react';
import { loadFromLocalStorage } from '../utils/localStorage';

const loadRazorpayScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const PaymentPage = (props) => {
  // Load from props or localStorage
  const user = props.user || loadFromLocalStorage('user');
  const cart = props.cart || loadFromLocalStorage('cart', { items: [], total: 0 });
  const onPaymentSuccess = props.onPaymentSuccess;

  useEffect(() => {
    loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  const handlePayment = async () => {
    const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_R5FnH0GA8USu7V', // Replace with your Razorpay key
      amount: cart.total * 100, // Amount in paise
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
    <div>
      <h2>Payment</h2>
      <p>Total Amount: ₹{cart.total}</p>
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
};

export default PaymentPage;