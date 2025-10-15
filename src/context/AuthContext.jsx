import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { get } from '../api/api';

// 1. CREATE THE CONTEXT
// This creates the context object itself. We initialize it with `undefined`
// to later check if a component is properly wrapped by the provider.
const AuthContext = createContext(undefined);

// 2. CREATE THE AUTH PROVIDER COMPONENT
// This is the component that will wrap your entire application. It holds all the state
// and logic for authentication and passes it down to all its children.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  // The 'loading' state is crucial. It prevents the app from rendering a "logged out"
  // state for a split second while we check for an existing token.
  const [loading, setLoading] = useState(true);

  // This effect runs once when the app loads to check if a valid token exists.
  // This is how a user stays logged in between browser sessions.
  useEffect(() => {
    const validateTokenAndFetchUser = async () => {
      if (token) {
        try {
          // IMPORTANT: This requires a backend endpoint (e.g., /users/me or /auth/profile)
          // that takes the JWT from the Authorization header and returns the user's data.
          const currentUser = await get('/users/me'); 
          setUser(currentUser);
        } catch (error) {
          // This block runs if the token is expired or invalid.
          console.error("Token validation failed:", error);
          localStorage.removeItem('authToken');
          setToken(null);
          setUser(null);
        }
      }
      // We are done loading, whether we found a user or not.
      setLoading(false);
    };

    validateTokenAndFetchUser();
  }, [token]);

  // The login function is passed to the LoginModal and SignupForm.
  // It receives the full response from the backend.
  const login = useCallback((loginResponse) => {
    if (loginResponse && loginResponse.access_token && loginResponse.user) {
      const { access_token, user: userData } = loginResponse;
      localStorage.setItem('authToken', access_token);
      setToken(access_token);
      setUser(userData);
    } else {
      console.error("Login response is missing token or user data", loginResponse);
    }
  }, []);

  // The logout function is passed to the Header or any other component.
  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  }, []);

  // The 'value' object contains all the state and functions that we want
  // to make available to the rest of our application.
  const authContextValue = { user, token, loading, login, logout };

  return (
    <AuthContext.Provider value={authContextValue}>
      {/* We don't render the children until the initial token check is complete. */}
      {/* This prevents the UI from flickering between a logged-out and logged-in state. */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. CREATE A CUSTOM HOOK (THE PROFESSIONAL STANDARD)
// This is a helper hook that makes it incredibly easy for any component
// to access the authentication state without extra boilerplate.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This error is a safety net. It ensures that you never try to use this
    // hook from a component that isn't wrapped by the AuthProvider.
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

