import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return localStorage.getItem('token') ? true : false;
  });
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('idUsuario', response.data.idUsuario);
      localStorage.setItem('rol', response.data.rol);
      setUser(true);
      navigate('/perfil');
    } catch (error) {
      console.error(error);
      alert('Error de credenciales');
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);