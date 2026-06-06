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
      </main>
      <Footer />
    </>
  );
}
