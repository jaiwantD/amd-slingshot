import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('neon_hw_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('neon_hw_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('neon_hw_user');
    }
  }, [user]);

  const register = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('neon_hw_users') || '[]');
        if (users.find(u => u.email === email)) {
            reject(new Error("Email already registered on this node."));
            return;
        }
        
        const newUser = { id: Math.random().toString(36).substr(2, 9), email, username: email.split('@')[0] };
        users.push({ ...newUser, password }); // Store dummy pass locally for mock validation
        localStorage.setItem('neon_hw_users', JSON.stringify(users));
        setUser(newUser);
        resolve(newUser);
      }, 1000); // simulate network
    });
  };

  const login = (email, password) => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('neon_hw_users') || '[]');
            const found = users.find(u => u.email === email && u.password === password);
            if (found) {
                const loggedInUser = { id: found.id, email: found.email, username: found.username };
                setUser(loggedInUser);
                resolve(loggedInUser);
            } else {
                reject(new Error("Unauthorized: Invalid credentials hash."));
            }
        }, 1000);
     });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isAuthModalOpen, setIsAuthModalOpen }}>
      {children}
    </AuthContext.Provider>
  );
};
