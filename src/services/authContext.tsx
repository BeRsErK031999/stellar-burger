import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (redirectPath: string) => void;
  logout: () => void;
  redirectPath: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/');

  const login = (path: string) => {
    setIsAuthenticated(true);
    setRedirectPath(path);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRedirectPath('/');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, redirectPath }}
    >
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
