import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileDown, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/orders/my-orders`);
      setOrders(res.data.data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-5xl font-bold mb-8 gradient-text">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-6" data-testid="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Order #{order._id.slice(-8)}</h3>
                    <p className="text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      order.paymentStatus === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {order.products.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-gray-700">
                        {item.title} x {item.quantity}
                      </span>
                      <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-6 border-t">
                  <div className="text-2xl font-bold">
                    Total: ₹{order.totalAmount.toLocaleString()}
                  </div>
                  {order.invoiceUrl && (
                    <Button
                      onClick={() => window.open(order.invoiceUrl, '_blank')}
                      variant="outline"
                      className="border-violet-600 text-violet-600"
                      data-testid={`download-invoice-btn-${order._id}`}
                    >
                      <FileDown className="mr-2 w-4 h-4" />
                      Download Invoice
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
