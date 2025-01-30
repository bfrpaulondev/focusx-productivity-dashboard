// src/hooks/useAuth.js
import { useState } from 'react';

export default function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  const saveToken = (newToken, userNameFromApi) => {
    setToken(newToken);
    setUserName(userNameFromApi);
    localStorage.setItem('token', newToken);
    localStorage.setItem('userName', userNameFromApi);
  };

  const logout = () => {
    setToken(null);
    setUserName('');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  };

  return { token, userName, saveToken, logout };
}
