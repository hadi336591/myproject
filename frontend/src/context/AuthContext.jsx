import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on component mount
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setAuth(parsedAuth);
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
        localStorage.removeItem('auth');
      }
    }
    setLoading(false);
  }, []);

  const login = (authData) => {
    setAuth(authData);
    localStorage.setItem('auth', JSON.stringify(authData));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add prop-types validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
