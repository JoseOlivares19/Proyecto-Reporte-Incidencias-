import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

export default function Reporte() {
  const [categoria, setCategoria] = useState("");
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("MEDIA");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const idUsuario = localStorage.getItem("idUsuario");
      await api.post("/incidencias", {
        titulo: asunto,
        descripcion,
        motivo: "Generado desde portal web",
        categoria,
        prioridad,
        sedeId: 1,
        areaId: 1,
        reportadoPorId: idUsuario ? parseInt(idUsuario) : null,
      });
      alert("Reporte enviado exitosamente");
      navigate("/historial");
    } catch {
      alert("Error al guardar el reporte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="page-main">
        <div className="container" style={{ maxWidth: "680px" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--azul-suave)",
                color: "var(--azul-claro)",
                fontSize: "0.78rem",
                fontWeight: "600",
                letterSpacing: "1px",
                textTransform: "uppercase",
                padding: "5px 14px",
                borderRadius: "100px",
                marginBottom: "1rem",
              }}
            >
              Nueva Incidencia
            </div>
            <h1 className="page-title" style={{ textAlign: "center" }}>
              Registrar Reporte
            </h1>
            <p className="page-subtitle" style={{ textAlign: "center" }}>
              Complete los detalles para registrar una incidencia
            </p>
          </div>

          <div className="card-custom">
            <form onSubmit={handleSubmit}>
              <div className="row g-3" style={{ marginBottom: "1.25rem" }}>
                <div className="col-md-6">
                  <label className="form-label-custom">Categoría</label>
                  <select
                    className="form-control-custom form-select-custom"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Seleccionar...
                    </option>
                    <option value="INFRAESTRUCTURA">Infraestructura</option>
                    <option value="TECNOLOGIA">Tecnología</option>
                    <option value="SEGURIDAD">Seguridad</option>
                    <option value="OTROS">Otros</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label-custom">Prioridad</label>
                  <select
                    className="form-control-custom form-select-custom"
                    value={prioridad}
                    onChange={(e) => setPrioridad(e.target.value)}
                    required
                  >
                    <option value="BAJA">Baja</option>
                    <option value="MEDIA">Media</option>
                    <option value="ALTA">Alta</option>
                    <option value="CRITICA">Crítica</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label className="form-label-custom">Asunto</label>
                <input
                  type="text"
                  className="form-control-custom"
                  placeholder="Breve título del problema"
                  value={asunto}
                  onChange={(e) => setAsunto(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <label className="form-label-custom">
                  Descripción detallada
                </label>
                <textarea
                  className="form-control-custom"
                  rows="5"
                  placeholder="Explique la situación con el mayor detalle posible..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                  style={{ resize: "vertical", minHeight: "130px" }}
                ></textarea>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <Link
                  to="/perfil"
                  className="btn-secondary-custom"
                  style={{ flex: 1, padding: "12px" }}
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="btn-primary-custom"
                  style={{ flex: 2 }}
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar Reporte"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
