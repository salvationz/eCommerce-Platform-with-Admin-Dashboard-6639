import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../contexts/OrderContext';
import { useProducts } from '../contexts/ProductContext';

const { FiCreditCard, FiLock, FiCheckCircle } = FiIcons;

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const { updateStock } = useProducts();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const onSubmit = async (data) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order
    const orderData = {
      userId: user.id,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress: {
        name: data.fullName,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country
      },
      paymentMethod,
      paymentDetails: {
        cardNumber: data.cardNumber ? `****${data.cardNumber.slice(-4)}` : null
      }
    };

    const order = createOrder(orderData);

    // Update stock
    items.forEach(item => {
      updateStock(item.id, item.quantity);
    });

    // Clear cart
    clearCart();

    setIsProcessing(false);
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Shipping Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      {...register('fullName', { required: 'Full name is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      defaultValue={user?.email}
                      disabled
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    {...register('address', { required: 'Address is required' })}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your address"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      {...register('city', { required: 'City is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      {...register('state', { required: 'State is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="State"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      {...register('zipCode', { required: 'ZIP code is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="ZIP"
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    {...register('country', { required: 'Country is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Payment Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="card"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary-600"
                    />
                    <label htmlFor="card" className="flex items-center space-x-2">
                      <SafeIcon icon={FiCreditCard} className="w-5 h-5" />
                      <span>Credit/Debit Card</span>
                    </label>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 ml-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          {...register('cardNumber', { required: 'Card number is required' })}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            {...register('expiryDate', { required: 'Expiry date is required' })}
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="MM/YY"
                          />
                          {errors.expiryDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            {...register('cvv', { required: 'CVV is required' })}
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="123"
                          />
                          {errors.cvv && (
                            <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Place Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiLock} className="w-5 h-5" />
                    <span>Place Order - ${total.toFixed(2)}</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {shipping === 0 && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800 font-medium">
                    You qualify for free shipping!
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;