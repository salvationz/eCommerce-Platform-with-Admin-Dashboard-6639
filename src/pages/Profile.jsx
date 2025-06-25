import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const { FiUser, FiMail, FiSave, FiEdit3 } = FiIcons;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || ''
    }
  });

  const onSubmit = async (data) => {
    const result = await updateProfile(data);
    if (result.success) {
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8">
            <div className="flex items-center space-x-4">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-20 h-20 rounded-full border-4 border-white"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                <p className="text-primary-100">{user?.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user?.role === 'admin' 
                      ? 'bg-yellow-400 text-yellow-900' 
                      : 'bg-green-400 text-green-900'
                  }`}>
                    {user?.role === 'admin' ? 'Administrator' : 'Customer'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                <span>{isEditing ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('name', {
                        required: 'Name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters'
                        }
                      })}
                      type="text"
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiSave} className="w-5 h-5" />
                  <span>Save Changes</span>
                </motion.button>
              )}
            </form>
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">0</div>
              <div className="text-gray-600">Total Orders</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$0.00</div>
              <div className="text-gray-600">Total Spent</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
              <div className="text-gray-600">Wishlist Items</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;