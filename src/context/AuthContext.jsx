import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import api from '../lib/api.js';
import { ENDPOINTS } from '../lib/endpoints.js';
import { TOKEN_KEY, REFRESH_KEY, USER_KEY, clearAuth } from '../lib/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async ({ username, password }) => {
    // api unwraps the ApiResponse envelope, so `data` is the LoginResponse.
    const data = await api.post(ENDPOINTS.login, { username, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    if (data.refreshToken) localStorage.setItem(REFRESH_KEY, data.refreshToken);
    const profile = { username: data.username, role: data.role };
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
    setUser(profile);
    return profile;
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'ROLE_ADMIN',
      isEditor: user?.role === 'ROLE_EDITOR',
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
