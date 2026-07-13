import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Reporte from './pages/Reporte';
import Historial from './pages/Historial';
import Nosotros from './pages/Nosotros';
import Dashboard from './pages/Dashboard';

const RutaPrivada = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <BrowserRouter basename="/universidad">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/perfil" element={<RutaPrivada><Perfil /></RutaPrivada>} />
          <Route path="/reporte" element={<RutaPrivada><Reporte /></RutaPrivada>} />
          <Route path="/historial" element={<RutaPrivada><Historial /></RutaPrivada>} />
          <Route path="/dashboard" element={<RutaPrivada><Dashboard /></RutaPrivada>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}