import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { get } from '../api/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const validateTokenAndFetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Use a timeout wrapper to avoid hanging forever
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000); // 7s timeout

        const currentUser = await get('/users/me', {
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (isMounted && currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.warn("⚠️ Token validation failed or request timed out:", error.message);
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    validateTokenAndFetchUser();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const login = useCallback((loginResponse) => {
    if (loginResponse?.access_token && loginResponse?.user) {
      const { access_token, user: userData } = loginResponse;
      localStorage.setItem('authToken', access_token);
      setToken(access_token);
      setUser(userData);
    } else {
      console.error("Login response is missing token or user data", loginResponse);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  }, []);

  const authContextValue = { user, token, loading, login, logout };

  return (
    <AuthContext.Provider value={authContextValue}>
      {/* Prevent flicker but don’t block rendering forever */}
      {loading ? (
        <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
          Connecting securely...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
