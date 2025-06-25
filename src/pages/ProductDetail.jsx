import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';

const { FiShoppingCart, FiStar, FiMinus, FiPlus, FiArrowLeft, FiTruck, FiShield, FiRefreshCw } = FiIcons;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="p-8">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Product Info */}
            <div className="p-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                  {product.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <SafeIcon
                        key={i}
                        icon={FiStar}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-gray-600 ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="text-4xl font-bold text-primary-600 mb-6">
                  ${product.price}
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Stock Status */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-700">Stock:</span>
                    <span className={`text-sm font-medium ${
                      product.stock > 10 ? 'text-green-600' :
                      product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {product.stock > 10 ? 'In Stock' :
                       product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        product.stock > 10 ? 'bg-green-500' :
                        product.stock > 0 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quantity Selector */}
                {product.stock > 0 && (
                  <div className="flex items-center space-x-4 mb-8">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <SafeIcon icon={FiMinus} className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stock}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <SafeIcon icon={FiPlus} className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full flex items-center justify-center space-x-2 py-4 rounded-lg font-semibold text-lg transition-colors ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  <SafeIcon icon={FiShoppingCart} className="w-6 h-6" />
                  <span>
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </span>
                </motion.button>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiTruck} className="w-6 h-6 text-primary-600" />
                    <div>
                      <div className="font-medium text-gray-900">Free Shipping</div>
                      <div className="text-sm text-gray-500">On orders over $50</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiShield} className="w-6 h-6 text-primary-600" />
                    <div>
                      <div className="font-medium text-gray-900">Secure Payment</div>
                      <div className="text-sm text-gray-500">100% protected</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiRefreshCw} className="w-6 h-6 text-primary-600" />
                    <div>
                      <div className="font-medium text-gray-900">Easy Returns</div>
                      <div className="text-sm text-gray-500">30-day return policy</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;