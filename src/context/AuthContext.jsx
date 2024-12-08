import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get('/auth/me');
      if (response.data) {
        setUser(response.data);
        setIsSignedIn(true);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      setError('');

      // Validate input
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Create session user (without password)
      const sessionUser = {
        id: user.id || Date.now().toString(),
        email: user.email,
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        avatar: user.avatar || null
      };

      // Update state
      setUser(sessionUser);
      setIsSignedIn(true);

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(sessionUser));
      localStorage.setItem('isSignedIn', 'true');
      
      console.log('Login successful:', { sessionUser, isSignedIn: true });
      return sessionUser;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    const { token, user: newUser } = response.data;
    localStorage.setItem('token', token);
    setUser(newUser);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsSignedIn(false);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);