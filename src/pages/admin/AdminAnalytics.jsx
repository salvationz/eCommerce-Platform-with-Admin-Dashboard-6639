import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useProducts } from '../../contexts/ProductContext';
import { useOrders } from '../../contexts/OrderContext';

const { FiTrendingUp, FiDollarSign, FiShoppingCart, FiUsers, FiPackage, FiBarChart3 } = FiIcons;

const AdminAnalytics = () => {
  const { products, getCategories } = useProducts();
  const { orders, getTotalRevenue } = useOrders();

  const categories = getCategories();
  const totalRevenue = getTotalRevenue();
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Revenue Chart
  const revenueChartOption = {
    title: {
      text: 'Monthly Revenue Trend',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: ${c}'
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '${value}'
      }
    },
    series: [{
      data: [1200, 1900, 3000, 5000, 7000, 8000, 9500, 11000, 12000, 13500, 15000, 16800],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#3b82f6'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(59, 130, 246, 0.3)'
          }, {
            offset: 1, color: 'rgba(59, 130, 246, 0.05)'
          }]
        }
      }
    }]
  };

  // Category Distribution Chart
  const categoryChartOption = {
    title: {
      text: 'Products by Category',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [{
      name: 'Products',
      type: 'pie',
      radius: ['40%', '70%'],
      data: categories.map(category => ({
        value: products.filter(p => p.category === category).length,
        name: category
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  // Sales by Category Chart
  const salesByCategoryOption = {
    title: {
      text: 'Sales Performance by Category',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '${value}'
      }
    },
    series: [{
      data: categories.map(() => Math.floor(Math.random() * 5000) + 1000),
      type: 'bar',
      itemStyle: {
        color: '#10b981'
      }
    }]
  };

  // Order Status Trend Chart
  const orderTrendOption = {
    title: {
      text: 'Order Status Trends',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Pending', 'Processing', 'Shipped', 'Delivered'],
      top: 30
    },
    xAxis: {
      type: 'category',
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Pending',
        type: 'line',
        data: [5, 8, 12, 15],
        itemStyle: { color: '#f59e0b' }
      },
      {
        name: 'Processing',
        type: 'line',
        data: [10, 15, 20, 25],
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Shipped',
        type: 'line',
        data: [8, 12, 18, 22],
        itemStyle: { color: '#8b5cf6' }
      },
      {
        name: 'Delivered',
        type: 'line',
        data: [15, 22, 28, 35],
        itemStyle: { color: '#10b981' }
      }
    ]
  };

  const analyticsCards = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: FiDollarSign,
      color: 'bg-green-500',
      change: '+15.3%',
      trend: 'up'
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: FiShoppingCart,
      color: 'bg-blue-500',
      change: '+8.7%',
      trend: 'up'
    },
    {
      title: 'Average Order Value',
      value: `$${averageOrderValue.toFixed(2)}`,
      icon: FiTrendingUp,
      color: 'bg-purple-500',
      change: '+12.1%',
      trend: 'up'
    },
    {
      title: 'Total Products',
      value: products.length,
      icon: FiPackage,
      color: 'bg-orange-500',
      change: '+3.2%',
      trend: 'up'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights into your store performance</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analyticsCards.map((card, index) => (
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
                  <div className="flex items-center mt-2">
                    <SafeIcon 
                      icon={card.trend === 'up' ? FiTrendingUp : FiTrendingUp} 
                      className={`w-4 h-4 mr-1 ${card.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} 
                    />
                    <span className={`text-sm font-medium ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {card.change}
                    </span>
                  </div>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <SafeIcon icon={card.icon} className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <ReactECharts option={revenueChartOption} style={{ height: '350px' }} />
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <ReactECharts option={categoryChartOption} style={{ height: '350px' }} />
          </motion.div>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <ReactECharts option={salesByCategoryOption} style={{ height: '350px' }} />
          </motion.div>

          {/* Order Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <ReactECharts option={orderTrendOption} style={{ height: '350px' }} />
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <SafeIcon icon={FiBarChart3} className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {((orders.filter(o => o.status === 'delivered').length / totalOrders) * 100 || 0).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Order Completion Rate</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600 mb-1">
                ${(totalRevenue / 30).toFixed(0)}
              </div>
              <div className="text-sm text-gray-600">Daily Average Revenue</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <SafeIcon icon={FiPackage} className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {products.filter(p => p.stock <= 5).length}
              </div>
              <div className="text-sm text-gray-600">Low Stock Products</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;