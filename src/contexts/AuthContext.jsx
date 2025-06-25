import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Mock authentication - in real app, this would be an API call
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email === 'admin@example.com' ? 'admin' : 'user',
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=3b82f6&color=fff`
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      
      // Mock registration - in real app, this would be an API call
      const mockUser = {
        id: Date.now().toString(),
        email,
        name,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${name}&background=3b82f6&color=fff`
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully!');
  };

  const updateProfile = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to update profile.');
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};