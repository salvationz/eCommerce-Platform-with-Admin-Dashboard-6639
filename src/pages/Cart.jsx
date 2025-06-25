import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const { FiShoppingCart, FiPlus, FiMinus, FiTrash2, FiArrowRight } = FiIcons;

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SafeIcon icon={FiShoppingCart} className="w-24 h-24 text-gray-300 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-lg text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            <span>Start Shopping</span>
            <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                    <div className="text-xl font-bold text-primary-600">
                      ${item.price}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <SafeIcon icon={FiMinus} className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <SafeIcon icon={FiPlus} className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiTrash2} className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="text-2xl font-bold text-gray-900">
                Total: ${getTotalPrice().toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">
                {items.reduce((total, item) => total + item.quantity, 0)} items
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/products"
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold text-center hover:bg-gray-300 transition-colors"
              >
                Continue Shopping
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;