import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

const getEstadoClass = (estado) => {
  switch (estado) {
    case "REGISTRADO":
      return "badge-estado badge-registrado";
    case "EN_PROCESO":
      return "badge-estado badge-en-proceso";
    case "RESUELTO":
      return "badge-estado badge-resuelto";
    case "REABIERTO":
      return "badge-estado badge-reabierto";
    default:
      return "badge-estado badge-registrado";
  }
};

const getPrioridadClass = (p) => {
  switch (p) {
    case "CRITICA":
      return "badge-estado badge-critica";
    case "ALTA":
      return "badge-estado badge-alta";
    case "MEDIA":
      return "badge-estado badge-media";
    default:
      return "badge-estado badge-baja";
  }
};

const renderTimeline = (estadoActual) => {
  const steps = ["REGISTRADO", "EN_PROCESO", "RESUELTO"];
  let currentIndex = steps.indexOf(estadoActual);

  if (estadoActual === "REABIERTO") currentIndex = 1;
  if (estadoActual === "CERRADO") currentIndex = 2;

  return (
    <div style={{ display: "flex", justifyContent: "space-between", margin: "25px 0 10px 0", position: "relative" }}>
      <div style={{ position: "absolute", top: "15px", left: "15%", right: "15%", height: "4px", backgroundColor: "#e9ecef", zIndex: 1 }}></div>
      <div style={{
        position: "absolute", top: "15px", left: "15%",
        width: currentIndex === 0 ? "0%" : currentIndex === 1 ? "50%" : "100%",
        height: "4px", backgroundColor: "#2ecc71", zIndex: 2, transition: "width 0.5s ease"
      }}></div>

      {steps.map((step, index) => (
        <div key={step} style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 3, width: "33%" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "50%",
            backgroundColor: index <= currentIndex ? "#2ecc71" : "#e9ecef",
            color: index <= currentIndex ? "white" : "#6c757d",
            display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold",
            border: "4px solid white", boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            {index < currentIndex ? "✓" : index + 1}
          </div>
          <span style={{
            fontSize: "0.8rem", marginTop: "8px",
            fontWeight: index <= currentIndex ? "bold" : "normal",
            color: index <= currentIndex ? "#333" : "#999"
          }}>
            {step.replace(/_/g, " ")}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function Historial() {
  const [incidencias, setIncidencias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [refresh, setRefresh] = useState(0);
  const rol = localStorage.getItem("rol");
  const idUsuario = localStorage.getItem("idUsuario");
  const esAdmin = rol === "ADMINISTRADOR" || rol === "SISTEMA";
  const [incidenciaSeleccionada, setIncidenciaSeleccionada] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setCargando(true);
      try {
        const url = esAdmin
          ? "/incidencias"
          : `/incidencias/mis-reportes/${idUsuario}?estado=${estadoFiltro}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
        const r = await api.get(url);
        if (!cancelled) setIncidencias(r.data);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setCargando(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [esAdmin, idUsuario, estadoFiltro, fechaInicio, fechaFin, refresh]);

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await api.put(
        `/incidencias/${id}/estado?nuevoEstado=${nuevoEstado}&usuarioAccionId=${idUsuario}&comentario=Actualizado`,
      );
      setRefresh((r) => r + 1);
    } catch {
      alert("Error al actualizar");
    }
  };

  const reabrir = async (id) => {
    const motivo = prompt("Motivo de reapertura:");
    if (motivo) {
      try {
        await api.put(
          `/incidencias/${id}/reabrir?solicitadoPorId=${idUsuario}&motivo=${motivo}`,
        );
        setRefresh((r) => r + 1);
      } catch {
        alert("Error al reabrir");
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="page-main">
        <div className="container">
          <div className="page-header">
            <div>
              <h1 className="page-title">Archivo de Incidentes</h1>
              <p className="page-subtitle">Gestión e historial de reportes</p>
            </div>

            {!esAdmin && (
              <div className="filters-bar">
                <select
                  className="filter-select"
                  value={estadoFiltro}
                  onChange={(e) => setEstadoFiltro(e.target.value)}
                >
                  <option value="">Todos los estados</option>
                  <option value="REGISTRADO">Registrado</option>
                  <option value="EN_PROCESO">En Proceso</option>
                  <option value="RESUELTO">Resuelto</option>
                </select>
                <input
                  type="date"
                  className="filter-input"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
                <input
                  type="date"
                  className="filter-input"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                />
              </div>
            )}
          </div>

          <div
            className="card-custom"
            style={{ padding: 0, overflow: "hidden" }}
          >
            {cargando ? (
              <div className="loading-dots">
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
              </div>
            ) : incidencias.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--texto-suave)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <p
                  style={{
                    fontWeight: "600",
                    color: "var(--texto)",
                    marginBottom: "4px",
                  }}
                >
                  Sin incidencias registradas
                </p>
                <p style={{ fontSize: "0.85rem" }}>
                  No se encontraron reportes con los filtros seleccionados.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="table-custom">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Título</th>
                      <th>Categoría</th>
                      <th>Estado</th>
                      <th>Prioridad</th>
                      {esAdmin && <th>Acciones</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {incidencias.map((inc) => (
                      <tr key={inc.id}>
                        <td>
                          <span className="table-code">#{inc.codigo}</span>
                        </td>
                        <td style={{ fontWeight: "500" }}>{inc.titulo}</td>
                        <td
                          style={{
                            color: "var(--texto-suave)",
                            fontSize: "0.85rem",
                          }}
                        >
                          {inc.categoria}
                        </td>
                        <td>
                          <span className={getEstadoClass(inc.estado)}>
                            {inc.estado.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td>
                          <span className={getPrioridadClass(inc.prioridad)}>
                            {inc.prioridad}
                          </span>
                        </td>
                        {esAdmin && (
                          <td>
                            <div style={{ display: "flex", gap: "6px" }}>
                              <button
                                className="btn-action"
                                style={{ backgroundColor: "#6c757d", color: "white", border: "none" }}
                                onClick={() => setIncidenciaSeleccionada(inc)}
                              >
                                Detalles
                              </button>
                              {(inc.estado === "REGISTRADO" ||
                                inc.estado === "REABIERTO") && (
                                  <button
                                    className="btn-action btn-action-blue"
                                    onClick={() =>
                                      cambiarEstado(inc.id, "EN_PROCESO")
                                    }
                                  >
                                    Procesar
                                  </button>
                                )}
                              {inc.estado !== "CERRADO" &&
                                inc.estado !== "RESUELTO" && (
                                  <button
                                    className="btn-action btn-action-green"
                                    onClick={() =>
                                      cambiarEstado(inc.id, "RESUELTO")
                                    }
                                  >
                                    Resolver
                                  </button>
                                )}
                              {(inc.estado === "CERRADO" ||
                                inc.estado === "RESUELTO") && (
                                  <button
                                    className="btn-action btn-action-orange"
                                    onClick={() => reabrir(inc.id)}
                                  >
                                    Reabrir
                                  </button>
                                )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {incidenciaSeleccionada && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
            alignItems: "center", justifyContent: "center", zIndex: 9999
          }}>
            <div style={{
              backgroundColor: "white", padding: "24px", borderRadius: "8px",
              width: "90%", maxWidth: "550px", maxHeight: "85vh", overflowY: "auto",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ margin: 0, color: "var(--azul)" }}>Detalle de Incidencia</h3>
                <button
                  onClick={() => setIncidenciaSeleccionada(null)}
                  style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#666" }}
                >
                  &times;
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <strong>Código:</strong> <span className="table-code">#{incidenciaSeleccionada.codigo}</span>
                </div>
                <div>
                  <strong>Título:</strong> {incidenciaSeleccionada.titulo}
                </div>
                <div>
                  <strong>Descripción:</strong>
                  <p style={{ margin: "4px 0 0 0", color: "#555", backgroundColor: "#f8f9fa", padding: "12px", borderRadius: "6px", fontSize: "0.95rem" }}>
                    {incidenciaSeleccionada.descripcion || "Sin descripción"}
                  </p>
                </div>
                <div>
                  <strong>Motivo:</strong> {incidenciaSeleccionada.motivo || "No especificado"}
                </div>
                <div>
                  <strong>Fecha de Creación:</strong> {incidenciaSeleccionada.fechaCreacion ? new Date(incidenciaSeleccionada.fechaCreacion).toLocaleString() : "N/A"}
                </div>
                <div>
                  <strong>Prioridad:</strong> <span className={getPrioridadClass(incidenciaSeleccionada.prioridad)}>{incidenciaSeleccionada.prioridad}</span>
                </div>

                <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #eee" }}>
                  <strong style={{ color: "var(--azul)" }}>Progreso de la Incidencia:</strong>
                  {renderTimeline(incidenciaSeleccionada.estado)}
                </div>
              </div>

              <div style={{ marginTop: "24px", textAlign: "right" }}>
                <button
                  className="btn-gold-custom"
                  onClick={() => setIncidenciaSeleccionada(null)}
                  style={{ padding: "8px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
