import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      
                 
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (username, password,role) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
        role
      });
      
      const { token, user } = response.data;
    
      setToken(token);
      setUser(user);
  
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {

    setUser(null);
    setToken(null);
  
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    

    delete axios.defaults.headers.common['Authorization'];

    navigate('/signin');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};