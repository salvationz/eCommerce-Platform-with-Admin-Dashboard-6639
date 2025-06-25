import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCart } from '../contexts/CartContext';

const { FiShoppingCart, FiStar } = FiIcons;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Low Stock
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.category}
            </span>
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews})</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-600">
              ${product.price}
            </span>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              <SafeIcon icon={FiShoppingCart} className="w-4 h-4" />
              <span className="text-sm">
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </span>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;