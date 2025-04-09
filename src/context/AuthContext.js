import React, {createContext, useState, useEffect} from 'react';
import {
  getUserSession,
  login as loginService,
  logout as logoutService,
} from '../api/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initially true to check session

  useEffect(() => {
    const loadUser = async () => {
      try {
        const session = await getUserSession();

        if (session) {
          setUser(session.user);
        }
      } catch (error) {
        console.error('Error loading session:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ✅ Wrap login function to update state immediately
  const login = async credentials => {
    try {
      const {token, user} = await loginService(credentials);
      setUser(user); // ✅ Update state instantly
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // ✅ Wrap logout function to clear state instantly
  const logout = async () => {
    await logoutService();
    setUser(null); // ✅ Clear user state
  };

  return (
    <AuthContext.Provider value={{user, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
