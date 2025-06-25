import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useProducts } from '../../contexts/ProductContext';
import { useOrders } from '../../contexts/OrderContext';

const { FiPackage, FiShoppingCart, FiUsers, FiDollarSign, FiTrendingUp, FiArrowRight } = FiIcons;

const AdminDashboard = () => {
  const { products } = useProducts();
  const { orders, getOrderStats } = useOrders();
  
  const stats = getOrderStats();
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock <= 5).length;

  // Chart data
  const salesChartOption = {
    title: {
      text: 'Sales Overview',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#3b82f6'
      }
    }]
  };

  const orderStatusChartOption = {
    title: {
      text: 'Order Status Distribution',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [{
      type: 'pie',
      radius: '50%',
      data: [
        { value: stats.pendingOrders, name: 'Pending' },
        { value: stats.processingOrders, name: 'Processing' },
        { value: stats.shippedOrders, name: 'Shipped' },
        { value: stats.deliveredOrders, name: 'Delivered' },
        { value: stats.cancelledOrders, name: 'Cancelled' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  const dashboardCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: FiDollarSign,
      color: 'bg-green-500',
      change: '+12.5%'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: FiShoppingCart,
      color: 'bg-blue-500',
      change: '+8.2%'
    },
    {
      title: 'Total Products',
      value: totalProducts,
      icon: FiPackage,
      color: 'bg-purple-500',
      change: '+2.1%'
    },
    {
      title: 'Low Stock Alert',
      value: lowStockProducts,
      icon: FiTrendingUp,
      color: 'bg-red-500',
      change: '-5.4%'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Products',
      description: 'Add, edit, or remove products from your inventory',
      link: '/admin/products',
      icon: FiPackage,
      color: 'bg-blue-500'
    },
    {
      title: 'View Orders',
      description: 'Monitor and manage customer orders',
      link: '/admin/orders',
      icon: FiShoppingCart,
      color: 'bg-green-500'
    },
    {
      title: 'User Management',
      description: 'Manage customer accounts and permissions',
      link: '/admin/users',
      icon: FiUsers,
      color: 'bg-purple-500'
    },
    {
      title: 'Analytics',
      description: 'View detailed reports and analytics',
      link: '/admin/analytics',
      icon: FiTrendingUp,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className={`text-sm font-medium ${
                    card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.change} from last month
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <SafeIcon icon={card.icon} className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <ReactECharts option={salesChartOption} style={{ height: '300px' }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <ReactECharts option={orderStatusChartOption} style={{ height: '300px' }} />
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <Link to={action.link} className="block">
                  <div className={`${action.color} p-3 rounded-lg w-fit mb-4`}>
                    <SafeIcon icon={action.icon} className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                  <div className="flex items-center text-primary-600 font-medium">
                    <span>Go to {action.title}</span>
                    <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <Link
                to="/admin/orders"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="p-6">
            {orders.slice(0, 5).length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Order #{order.id.slice(-8)}</p>
                      <p className="text-sm text-gray-600">{order.items.length} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <SafeIcon icon={FiShoppingCart} className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No orders yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;