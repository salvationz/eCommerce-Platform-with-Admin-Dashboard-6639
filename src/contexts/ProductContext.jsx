import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const initialProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    stock: 50,
    featured: true,
    rating: 4.8,
    reviews: 127
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    category: 'Electronics',
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    stock: 30,
    featured: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    category: 'Clothing',
    description: 'Comfortable and sustainable organic cotton t-shirt available in multiple colors.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    stock: 100,
    featured: false,
    rating: 4.4,
    reviews: 56
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    price: 899.99,
    category: 'Electronics',
    description: 'Professional-grade camera lens for stunning photography and videography.',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop',
    stock: 15,
    featured: true,
    rating: 4.9,
    reviews: 34
  },
  {
    id: '5',
    name: 'Minimalist Backpack',
    price: 89.99,
    category: 'Accessories',
    description: 'Sleek and functional backpack perfect for work, travel, and everyday use.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    stock: 75,
    featured: false,
    rating: 4.3,
    reviews: 92
  },
  {
    id: '6',
    name: 'Wireless Charging Pad',
    price: 49.99,
    category: 'Electronics',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop',
    stock: 60,
    featured: false,
    rating: 4.2,
    reviews: 78
  },
  {
    id: '7',
    name: 'Yoga Mat Premium',
    price: 79.99,
    category: 'Sports',
    description: 'Non-slip premium yoga mat made from eco-friendly materials.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
    stock: 40,
    featured: false,
    rating: 4.7,
    reviews: 65
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    price: 129.99,
    category: 'Electronics',
    description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    stock: 85,
    featured: true,
    rating: 4.5,
    reviews: 143
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (productData) => {
    const newProduct = {
      id: uuidv4(),
      ...productData,
      rating: 0,
      reviews: 0
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
    toast.success('Product added successfully!');
    return newProduct;
  };

  const updateProduct = (id, productData) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, ...productData } : product
      )
    );
    toast.success('Product updated successfully!');
  };

  const deleteProduct = (id) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    toast.success('Product deleted successfully!');
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  const searchProducts = (query) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getCategories = () => {
    const categories = [...new Set(products.map(product => product.category))];
    return categories;
  };

  const updateStock = (id, quantity) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id 
          ? { ...product, stock: Math.max(0, product.stock - quantity) }
          : product
      )
    );
  };

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getFeaturedProducts,
    getProductsByCategory,
    searchProducts,
    getCategories,
    updateStock
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};