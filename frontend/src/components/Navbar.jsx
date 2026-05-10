import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-navbar sticky-top p-2 px-5">
      <div className="container-fluid p-1">
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbar"
          aria-controls="navbar" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link className="navbar-brand logo" to={user ? "/perfil" : "/"}>UniReport</Link>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/reporte">Reportar</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/historial">Historial</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {user ? (
          <button className="btn register-button" onClick={logout}>Salir</button>
        ) : (
          <Link className="btn register-button" to="/">Entrar</Link>
        )}
      </div>
    </nav>
  );
}