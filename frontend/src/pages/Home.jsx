import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <Navbar />
      
      <main className="container-fluid main p-5">
        <div className="row align-items-center p-5 mb-5">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bolder mb-4 text-dark">Tu voz construye una mejor universidad</h1>
            <p className="fs-5 text-secondary mb-5">Gestion transparente de integridad y reportes para una comunidad académica conectada.</p>
            
            <div className="d-flex gap-4 fw-semibold text-brand-dark">
              <p>Registro Inmutable</p>
              <p>Respuesta Rápida</p>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-lg rounded-4 p-5 mx-auto">
              <div className="card-body p-0">
                <h3 className="fw-bold">Acceso Institucional</h3>
                <p className="text-secondary mb-4">Use sus credenciales para continuar.</p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label input-label">Correo Institucional</label>
                    <input 
                      id="email" 
                      className="form-control form-control-lg fs-6" 
                      type="email"
                      placeholder="usuario@universidad.edu.pe" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label htmlFor="password" className="form-label input-label mb-0">Contraseña</label>
                    </div>
                    <input 
                      type="password" 
                      className="form-control form-control-lg fs-6" 
                      id="password"
                      placeholder="********" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn bg-primary text-white w-100 py-2">Iniciar Sesión</button>
                </form>

                <div className="text-center mt-5">
                  <p className="text-secondary mb-0">
                    Al acceder, acepta nuestras <Link to="#" className="text-decoration-underline text-secondary">Políticas</Link> y <Link to="#" className="text-decoration-underline text-secondary">Términos</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <hr />

        <div className="row align-items-center justify-content-center p-5">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2 className="fw-bold">¿Qué es UniReport?</h2>
            <p className="lead">Un sistema diseñado para garantizar trasparencia y agilidad en cada reporte de la comunidad académica.</p>
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
            <img src="/img/campus-los-olivos-utp.webp" alt="UniReport Logo" className="img-fluid rounded" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}