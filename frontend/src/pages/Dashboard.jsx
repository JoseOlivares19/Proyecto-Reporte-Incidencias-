import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, porEstado: {} });

  useEffect(() => {
    api
      .get("/incidencias/dashboard")
      .then((r) => setStats(r.data))
      .catch(console.error);
  }, []);

  const handleExportar = async () => {
    try {
      const response = await api.get("/incidencias/exportar", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "incidencias.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("Error al exportar");
    }
  };

  const estadoCards = Object.entries(stats.porEstado || {});

  return (
    <>
      <Navbar />
      <main className="page-main">
        <div className="container">
          <div className="page-header">
            <div>
              <h1 className="page-title">Visión General</h1>
              <p className="page-subtitle">
                Métricas en tiempo real de la plataforma
              </p>
            </div>
            <button onClick={handleExportar} className="btn-gold-custom">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Exportar CSV
            </button>
          </div>

          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="card-stat" style={{ height: "100%" }}>
                <p className="card-stat-label">Total Incidentes</p>
                <div className="card-stat-number">{stats.total}</div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.78rem",
                    marginTop: "0.75rem",
                  }}
                >
                  Todos los registros
                </p>
              </div>
            </div>

            {estadoCards.map(([estado, cantidad], i) => (
              <div className="col-md-3 col-sm-6" key={estado}>
                <div
                  className={`card-stat ${i === 0 ? "card-stat-accent" : ""}`}
                  style={{
                    height: "100%",
                    background: i !== 0 ? "white" : undefined,
                    border: i !== 0 ? "1px solid var(--gris-borde)" : undefined,
                  }}
                >
                  <p
                    className="card-stat-label"
                    style={{
                      color: i !== 0 ? "var(--texto-suave)" : undefined,
                    }}
                  >
                    {estado.replace(/_/g, " ")}
                  </p>
                  <div
                    className="card-stat-number"
                    style={{ color: i !== 0 ? "var(--azul)" : undefined }}
                  >
                    {cantidad}
                  </div>
                  <p
                    style={{
                      color:
                        i !== 0 ? "var(--texto-suave)" : "rgba(15,32,68,0.5)",
                      fontSize: "0.78rem",
                      marginTop: "0.75rem",
                    }}
                  >
                    incidencias
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
