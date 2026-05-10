import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Perfil() {
  const [usuarioData] = useState(() => ({
    id: localStorage.getItem('idUsuario') || '',
    rol: localStorage.getItem('rol') || ''
  }));

  return (
    <>
      <Navbar />

      <main className="container-fluid main p-5">
        <div className="container py-5">
          <header className="mb-4">
            <h1 className="fw-bold">Perfil Institucional</h1>
          </header>

          <div className="card border-0 shadow-sm mb-4 p-3">
            <div className="d-flex align-items-center">
              <div className="position-relative">
                <svg width="120px" height="120px" viewBox="-204.8 -204.8 1433.60 1433.60" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                  <path fill="#000000" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0z"></path>
                </svg>
              </div>

              <div className="mx-4">
                <h3 className="fw-bold">
                  Usuario del Sistema <span className="badge bg-otro text-primary fs-6 ms-2">{usuarioData.rol}</span>
                </h3>
                <p className="text-muted mb-1">ID Institucional: {usuarioData.id}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100 p-3">
                <h5 className="fw-bold mb-4">Notificaciones</h5>
                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" defaultChecked id="check1" />
                  <label className="form-check-label" htmlFor="check1">Correo electrónico</label>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100 p-3">
                <h5 className="fw-bold mb-3">Seguridad</h5>
                <p className="small text-muted">Mantén tu cuenta segura actualizando tu contraseña periódicamente.</p>
                <button className="btn bg-danger text-white mt-auto">Cambiar contraseña</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}