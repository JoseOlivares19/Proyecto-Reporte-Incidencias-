import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

export default function Historial() {
  const [incidencias, setIncidencias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await api.get('/incidencias');
        setIncidencias(response.data);
      } catch (error) {
        console.error(error);
        alert('Error al cargar el historial');
      } finally {
        setCargando(false);
      }
    };

    fetchIncidencias();
  }, []);

  const handleExportar = async () => {
    try {
      const response = await api.get('/incidencias/exportar', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'incidencias.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert('Error al exportar');
    }
  };

  return (
    <>
      <Navbar />

      <main className="container-fluid main p-5">
        <div className="container py-4 bg-light">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <p className="fw-bolder">Historial de Reportes</p>
              <h2 className="fw-bold txt-primary">Archivo de Incidentes</h2>
              <p className="text-muted mb-0">Consulta y gestiona el historial completo de las incidencias</p>
            </div>
            <div className="d-flex gap-2">
              <button onClick={handleExportar} className="btn btn-white border shadow-sm px-3">Exportar Excel</button>
            </div>
          </div>

          <div className="card shadow-sm overflow-hidden mb-4">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr className="text-muted small text-uppercase">
                    <th className="border-0 px-4 py-3">Código</th>
                    <th className="border-0 py-3">Título</th>
                    <th className="border-0 py-3">Categoría</th>
                    <th className="border-0 py-3">Estado</th>
                    <th className="border-0 py-3">Prioridad</th>
                  </tr>
                </thead>
                <tbody className="border-top-0">
                  {cargando ? (
                    <tr><td colSpan="5" className="text-center py-4">Cargando datos...</td></tr>
                  ) : incidencias.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-4">No hay incidencias registradas.</td></tr>
                  ) : (
                    incidencias.map((inc) => (
                      <tr key={inc.id}>
                        <td className="px-4 fw-bold">#{inc.codigo}</td>
                        <td>{inc.titulo}</td>
                        <td>
                          <span className="d-flex align-items-center gap-2">{inc.categoria}</span>
                        </td>
                        <td>
                          <span className="small fw-bold text-uppercase">{inc.estado}</span>
                        </td>
                        <td>
                          <span className={`badge ${inc.prioridad === 'ALTA' || inc.prioridad === 'CRITICA' ? 'bg-danger' : 'bg-secondary'}`}>
                            {inc.prioridad}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center py-3">
              <small className="text-muted">Mostrando {incidencias.length} reportes</small>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-4 h-100">
                <i className="bi bi-clipboard-data text-primary fs-4 mb-3"></i>
                <h6 className="fw-bold">Auditoría Total</h6>
                <p className="small text-muted mb-4">Registro de todas las incidencias...</p>
                <div className="d-flex align-items-center gap-2">
                  <h3 className="fw-bold mb-0">{incidencias.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}