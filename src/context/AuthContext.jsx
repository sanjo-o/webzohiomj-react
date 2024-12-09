import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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

      // Validate input
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Use API instead of localStorage
      const response = await api.post('/auth/login', { email, password });
      const { token, user: loggedInUser } = response.data;
      
      // Save token and update state
      localStorage.setItem('token', token);
      setUser(loggedInUser);
      setIsSignedIn(true);

      return loggedInUser;
    } catch (err) {
      console.error('Login error:', err);
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
    <AuthContext.Provider value={{ user, loading, isSignedIn, login, register, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);