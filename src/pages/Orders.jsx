import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useOrders } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';

const { FiPackage, FiTruck, FiCheckCircle, FiClock, FiX } = FiIcons;

const Orders = () => {
  const { getUserOrders } = useOrders();
  const { user } = useAuth();
  
  const userOrders = getUserOrders(user?.id || '');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return FiClock;
      case 'processing':
        return FiPackage;
      case 'shipped':
        return FiTruck;
      case 'delivered':
        return FiCheckCircle;
      case 'cancelled':
        return FiX;
      default:
        return FiClock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'shipped':
        return 'text-purple-600 bg-purple-50';
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (userOrders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SafeIcon icon={FiPackage} className="w-24 h-24 text-gray-300 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No orders yet</h2>
          <p className="text-lg text-gray-600 mb-8">
            You haven't placed any orders yet. Start shopping to see your orders here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        <div className="space-y-6">
          {userOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.id.slice(-8)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Placed on {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      <SafeIcon icon={getStatusIcon(order.status)} className="w-4 h-4" />
                      <span className="capitalize">{order.status}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        ${order.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} × ${item.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                  <div className="text-sm text-gray-600">
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="font-medium">
                          {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax:</span>
                        <span className="font-medium">${order.tax.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;