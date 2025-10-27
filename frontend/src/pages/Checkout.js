import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { CreditCard } from 'lucide-react';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_BACKEND_URL;
  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);
  useEffect(() => {
    fetchCart();
    loadRazorpayScript();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/cart/items`);
      setCart(res.data.data);
    } catch (error) {
      toast.error('Failed to load cart');
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Create Razorpay order
      const orderRes = await axios.post(`${API_URL}/api/payment/create-order`, {
        amount: total
      });

      const { id: order_id, amount, currency } = orderRes.data.data;

      const options = {
        key: 'rzp_test_xxxxxxxxxxxxxxxx', // Test key - Replace in production
        amount: amount,
        currency: currency,
        name: 'Telogica Ltd',
        description: 'Product Purchase',
        order_id: order_id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyRes = await axios.post(`${API_URL}/api/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartItems: cart,
              totalAmount: total
            });

            toast.success('Payment successful!');
            navigate('/my-orders');
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#8B5CF6'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error('Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-violet-50 to-white">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold mb-8 gradient-text">Checkout</h1>

        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <div key={item.product?._id} className="flex justify-between items-center py-4 border-b">
                <div>
                  <h3 className="font-semibold">{item.product?.title}</h3>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <span className="font-bold">
                  ₹{((item.product?.price || 0) * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mb-8">
            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span className="gradient-text" data-testid="checkout-total">₹{total.toLocaleString()}</span>
            </div>
          </div>

          <Button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-orange-500 text-white h-14 text-lg"
            data-testid="pay-now-btn"
          >
            <CreditCard className="mr-2 w-5 h-5" />
            {loading ? 'Processing...' : 'Pay Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
