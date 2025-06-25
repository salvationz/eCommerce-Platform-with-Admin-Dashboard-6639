import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (orderData) => {
    const newOrder = {
      id: uuidv4(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    toast.success('Order placed successfully!');
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      )
    );
    toast.success(`Order status updated to ${status}!`);
  };

  const getOrderById = (id) => {
    return orders.find(order => order.id === id);
  };

  const getUserOrders = (userId) => {
    return orders.filter(order => order.userId === userId);
  };

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  const getTotalRevenue = () => {
    return orders
      .filter(order => order.status === 'delivered')
      .reduce((total, order) => total + order.total, 0);
  };

  const getOrderStats = () => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const processingOrders = orders.filter(order => order.status === 'processing').length;
    const shippedOrders = orders.filter(order => order.status === 'shipped').length;
    const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
    const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;

    return {
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue: getTotalRevenue()
    };
  };

  const value = {
    orders,
    loading,
    createOrder,
    updateOrderStatus,
    getOrderById,
    getUserOrders,
    getOrdersByStatus,
    getTotalRevenue,
    getOrderStats
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};