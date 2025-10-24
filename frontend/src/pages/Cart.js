import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/cart/items`);
      setCart(res.data.data);
    } catch (error) {
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await axios.put(`${API_URL}/api/products/cart/update`, { productId, quantity });
      setCart(res.data.data);
      toast.success('Cart updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update cart');
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await axios.delete(`${API_URL}/api/products/cart/remove/${productId}`);
      setCart(res.data.data);
      toast.success('Item removed');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-violet-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-5xl font-bold mb-8 gradient-text">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
            <Button onClick={() => navigate('/products')} className="bg-violet-600 hover:bg-violet-700">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4" data-testid="cart-items">
              {cart.map((item) => (
                <div key={item.product?._id} className="bg-white p-6 rounded-2xl shadow-lg flex gap-6">
                  <img
                    src={item.product?.images?.[0]?.url || ''}
                    alt={item.product?.title}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.product?.title}</h3>
                    <p className="text-2xl font-bold text-violet-600">
                      ₹{(item.product?.price || 0).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product?._id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 p-0 rounded-full"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-bold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product?._id, item.quantity + 1)}
                        className="w-8 h-8 p-0 rounded-full"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.product?._id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl h-fit sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">₹{total.toLocaleString()}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="gradient-text" data-testid="cart-total">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => navigate('/checkout')}
                className="w-full bg-gradient-to-r from-violet-600 to-orange-500 text-white"
                data-testid="proceed-checkout-btn"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
