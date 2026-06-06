import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const rol = localStorage.getItem('rol');
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-custom">
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1 }}>
        <Link className="navbar-brand-custom" to={user ? '/perfil' : '/'}>
          <div className="brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F2044" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          UniReport
        </Link>

        <div style={{ display: 'flex', gap: '4px' }}>
          <Link className={`nav-link-custom ${isActive('/nosotros') ? 'active' : ''}`} to="/nosotros">Nosotros</Link>
          {user && (
            <>
              <Link className={`nav-link-custom ${isActive('/reporte') ? 'active' : ''}`} to="/reporte">Reportar</Link>
              <Link className={`nav-link-custom ${isActive('/historial') ? 'active' : ''}`} to="/historial">Historial</Link>
              {(rol === 'ADMINISTRADOR' || rol === 'SISTEMA') && (
                <Link className={`nav-link-custom ${isActive('/dashboard') ? 'active' : ''}`} to="/dashboard">Dashboard</Link>
              )}
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {user ? (
          <>
            <Link to="/perfil" className="btn-nav-ghost">Mi Perfil</Link>
            <button className="btn-nav-primary" onClick={logout}>Salir</button>
          </>
        ) : (
          <Link className="btn-nav-primary" to="/">Entrar</Link>
        )}
      </div>
    </nav>
  );
}