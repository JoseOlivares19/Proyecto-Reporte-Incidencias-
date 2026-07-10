import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, porEstado: {}, porPrioridad: {}, porMes: {} });

  useEffect(() => {
    api
      .get("/incidencias/dashboard")
      .then((r) => setStats(r.data))
      .catch((err) => console.error("Error cargando dashboard:", err));
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

  const handleExportarPdf = async () => {
    try {
      const response = await api.get("/incidencias/exportar-pdf-resueltas", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "incidencias_resueltas.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("Error al exportar PDF");
    }
  };

  const estadoCards = Object.entries(stats.porEstado || {});

  const dataEstado = Object.entries(stats.porEstado || {}).map(([name, value]) => ({
    name: name.replace(/_/g, " "),
    cantidad: value
  }));

  const dataPrioridad = Object.entries(stats.porPrioridad || {}).map(([name, value]) => ({
    name: name.replace(/_/g, " "),
    value: value
  }));

  const dataMes = Object.entries(stats.porMes || {}).map(([name, value]) => ({
    name,
    incidencias: value
  }));

  const COLORS = ['#e74c3c', '#f1c40f', '#3498db', '#2ecc71'];

  return (
    <>
      <Navbar />
      <main className="page-main py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fw-bold">Panel de Control</h1>
              <p className="text-muted">Métricas de incidencias en tiempo real</p>
            </div>
            <button onClick={handleExportar} className="btn btn-primary">
              Exportar Reporte Ecel
            </button>
            <button onClick={handleExportarPdf} className="btn btn-danger">
                Exportar PDF Resueltas
              </button>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-3">
              <div className="card bg-dark text-white p-3 shadow-sm h-100 border-0">
                <p className="mb-1 text-uppercase small fw-bold">Total Registradas</p>
                <div className="fs-1 fw-bold">{stats.total}</div>
              </div>
            </div>

            {estadoCards.map(([estado, cantidad]) => (
              <div className="col-md-3" key={estado}>
                <div className="card bg-white p-3 shadow-sm h-100 border-0 border-start border-4 border-primary">
                  <p className="text-secondary mb-1 text-uppercase small fw-bold">
                    {estado.replace(/_/g, " ")}
                  </p>
                  <div className="text-dark fs-1 fw-bold">{cantidad}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-4 mb-4">
            <div className="col-lg-8">
              <div className="card shadow-sm border-0 p-4 h-100">
                <h5 className="mb-4 text-secondary fw-bold">Incidencias por Estado</h5>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={dataEstado} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip cursor={{ fill: '#f8f9fa' }} />
                      <Bar dataKey="cantidad" fill="#0f2044" radius={[4, 4, 0, 0]} barSize={50} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card shadow-sm border-0 p-4 h-100">
                <h5 className="mb-4 text-secondary fw-bold">Nivel de Prioridad</h5>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={dataPrioridad}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {dataPrioridad.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-12">
              <div className="card shadow-sm border-0 p-4">
                <h5 className="mb-4 text-secondary fw-bold">Histórico de Incidencias por Mes</h5>
                <div style={{ width: '100%', height: 320 }}>
                  <ResponsiveContainer>
                    <AreaChart data={dataMes} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorIncidencias" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3498db" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="incidencias" stroke="#3498db" strokeWidth={3} fillOpacity={1} fill="url(#colorIncidencias)" name="Incidencias" />
                    </AreaChart>
                  </ResponsiveContainer>
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