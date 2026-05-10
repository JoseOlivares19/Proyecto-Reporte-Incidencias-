import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

export default function Reporte() {
  const [categoria, setCategoria] = useState('');
  const [asunto, setAsunto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idUsuario = localStorage.getItem('idUsuario');
      
      await api.post('/incidencias', {
        titulo: asunto,
        descripcion: descripcion,
        motivo: 'Generado desde portal web',
        categoria: categoria,
        prioridad: 'MEDIA',
        sedeId: 1,
        areaId: 1,
        reportadoPorId: idUsuario ? parseInt(idUsuario) : null
      });

      alert('Reporte enviado y registrado en el sistema');
      navigate('/historial');
    } catch (error) {
      console.error(error);
      alert('Hubo un error al guardar el reporte');
    }
  };

  return (
    <>
      <Navbar />

      <main className="container-fluid main p-5">
        <div className="container py-5 bg-light min-vh-100">
          <div className="text-center mb-5">
            <h2 className="fw-bold txt-primary">Nuevo Informe de Incidencia</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '500px' }}>
              Complete los detalles a continuación para registrar una nueva entrada en el registro institucional.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-6">
              <div className="card border-0 shadow-sm p-4 p-md-5">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-bold small text-uppercase text-muted">Categoría</label>
                    <select 
                      className="form-select border-0 bg-light py-3" 
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      required
                    >
                      <option value="" disabled>Seleccione una categoría</option>
                      <option value="INFRAESTRUCTURA">Infraestructura</option>
                      <option value="TECNOLOGIA">Tecnología</option>
                      <option value="SEGURIDAD">Seguridad</option>
                      <option value="OTROS">Otros</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold small text-uppercase text-muted">Asunto</label>
                    <input 
                      type="text" 
                      className="form-control border-0 bg-light py-3"
                      placeholder="Ej. Fallo de iluminación en el ala norte" 
                      value={asunto}
                      onChange={(e) => setAsunto(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold small text-uppercase text-muted">Descripción Detallada</label>
                    <textarea 
                      className="form-control border-0 bg-light" 
                      rows="5"
                      placeholder="Proporcione una descripción clara..."
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-5">
                    <label className="form-label fw-bold small text-uppercase text-muted">Evidencia Adjunta</label>
                    <div className="upload-area border border-2 border-dashed rounded-3 p-5 text-center bg-white">
                      <p className="mb-1 fw-bold">Haga clic para subir o arrastre archivos</p>
                      <p>PNG, JPG hasta 5MB</p>
                    </div>
                  </div>

                  <button type="submit" className="btn w-100 py-3 fw-bold text-white mb-3 bg-primary">
                    Enviar Reporte
                  </button>

                  <div className="text-center">
                    <Link to="/perfil" className="btn btn-danger py-3 w-100">
                      Cancelar y volver al panel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}