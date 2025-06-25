import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import { OrderProvider } from './contexts/OrderContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="pt-16">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    <Route path="/checkout" element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/orders" element={
                      <ProtectedRoute>
                        <Orders />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/admin" element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    } />
                    
                    <Route path="/admin/products" element={
                      <AdminRoute>
                        <AdminProducts />
                      </AdminRoute>
                    } />
                    
                    <Route path="/admin/orders" element={
                      <AdminRoute>
                        <AdminOrders />
                      </AdminRoute>
                    } />
                    
                    <Route path="/admin/users" element={
                      <AdminRoute>
                        <AdminUsers />
                      </AdminRoute>
                    } />
                    
                    <Route path="/admin/analytics" element={
                      <AdminRoute>
                        <AdminAnalytics />
                      </AdminRoute>
                    } />
                  </Routes>
                </main>
                <Toaster position="top-right" />
              </div>
            </Router>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;