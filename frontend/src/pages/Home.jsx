import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <Navbar />
      <main className="hero-section">
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row justify-content-between align-items-center g-5">
            <div className="col-lg-6">
              <div className="hero-eyebrow">
                <span className="hero-badge-dot"></span>
                Plataforma Institucional UTP
              </div>
              <h1 className="hero-title">
                Plataforma para
                <br />
                una <span>mejor</span>
                <br />
                gestión universitaria
              </h1>
              <p className="hero-subtitle">
                Gestión transparente de incidencias de infraestructura,
                tecnología y seguridad para una comunidad académica más
                conectada.
              </p>
              <div className="hero-badges">
                <span className="hero-badge">
                  <span className="hero-badge-dot"></span> Registro Inmutable
                </span>
                <span className="hero-badge">
                  <span className="hero-badge-dot"></span> Respuesta Rápida
                </span>
                <span className="hero-badge">
                  <span className="hero-badge-dot"></span> 100% Seguro
                </span>
              </div>
            </div>

            <div className="col-lg-5 d-flex justify-content-center justify-content-lg-end">
              <div className="login-card">
                <div className="login-card-header">
                  <div className="login-card-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <h2 className="login-card-title">Acceso Institucional</h2>
                  <p className="login-card-subtitle">
                    Use sus credenciales para continuar
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label className="form-label-custom">
                      Correo Institucional
                    </label>
                    <input
                      type="email"
                      className="form-control-custom"
                      placeholder="usuario@utp.edu.pe"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label className="form-label-custom">Contraseña</label>
                    <input
                      type="password"
                      className="form-control-custom"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary-custom">
                    Iniciar Sesión
                  </button>
                </form>

                <p
                  style={{
                    textAlign: "center",
                    fontSize: "0.78rem",
                    color: "#8a96a8",
                    marginTop: "1.5rem",
                  }}
                >
                  Al acceder, acepta nuestras{" "}
                  <Link to="#" style={{ color: "#1B3566", fontWeight: "600" }}>
                    Políticas
                  </Link>{" "}
                  y{" "}
                  <Link to="#" style={{ color: "#1B3566", fontWeight: "600" }}>
                    Términos
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
