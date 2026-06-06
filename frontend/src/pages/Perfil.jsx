import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Perfil() {
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSys, setNotifSys] = useState(true);

  const [usuarioData] = useState(() => ({
    id: localStorage.getItem("idUsuario") || "",
    rol: localStorage.getItem("rol") || "",
  }));

  return (
    <>
      <Navbar />
      <main className="page-main">
        <div className="container" style={{ maxWidth: "860px" }}>
          <div className="page-header">
            <div>
              <h1 className="page-title">Mi Perfil</h1>
              <p className="page-subtitle">
                Configuración y preferencias de cuenta
              </p>
            </div>
          </div>

          {/* Profile card */}
          <div
            className="card-custom"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div className="profile-avatar">
              <span>{usuarioData.rol.charAt(0) || "U"}</span>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "6px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    color: "var(--azul)",
                    margin: 0,
                  }}
                >
                  Usuario del Sistema
                </h3>
                <span className="role-badge">{usuarioData.rol}</span>
              </div>
              <p
                style={{
                  color: "var(--texto-suave)",
                  fontSize: "0.875rem",
                  margin: 0,
                }}
              >
                ID Institucional:{" "}
                <span style={{ fontWeight: "600", color: "var(--azul)" }}>
                  {usuarioData.id}
                </span>
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card-custom" style={{ height: "100%" }}>
                <h6
                  style={{
                    fontWeight: "700",
                    color: "var(--azul)",
                    marginBottom: "1.2rem",
                    fontSize: "0.95rem",
                  }}
                >
                  Notificaciones
                </h6>
                <div className="switch-row">
                  <span className="switch-label">
                    Alertas por correo electrónico
                  </span>
                  <div className="form-check form-switch mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={notifEmail}
                      onChange={(e) => setNotifEmail(e.target.checked)}
                    />
                  </div>
                </div>
                <div className="switch-row">
                  <span className="switch-label">Alertas del sistema</span>
                  <div className="form-check form-switch mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={notifSys}
                      onChange={(e) => setNotifSys(e.target.checked)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card-custom" style={{ height: "100%" }}>
                <h6
                  style={{
                    fontWeight: "700",
                    color: "var(--azul)",
                    marginBottom: "0.5rem",
                    fontSize: "0.95rem",
                  }}
                >
                  Seguridad
                </h6>
                <p
                  style={{
                    color: "var(--texto-suave)",
                    fontSize: "0.875rem",
                    lineHeight: "1.6",
                    marginBottom: "1.5rem",
                  }}
                >
                  Actualice sus credenciales periódicamente para mantener su
                  cuenta segura.
                </p>
                <button
                  className="btn-secondary-custom"
                  style={{ color: "#DC2626", borderColor: "#FCA5A5" }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
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
                  Cambiar contraseña
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
