import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2A4A8A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    title: "Seguridad Garantizada",
    text: "Todos los reportes son encriptados y almacenados de forma segura, garantizando la confidencialidad del reportante.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2A4A8A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    title: "Respuesta Ágil",
    text: "Las incidencias son asignadas y gestionadas en tiempo real, reduciendo los tiempos de resolución significativamente.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2A4A8A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    ),
    title: "Transparencia Total",
    text: "Seguimiento en tiempo real del estado de cada reporte. La comunidad sabe exactamente qué está pasando.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2A4A8A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    title: "Gestión total",
    text: "Estudiantes, docentes y personal administrativo en un mismo canal para una mejor gestión institucional.",
  },
];

export default function Nosotros() {
  return (
    <>
      <Navbar />
      <div className="nosotros-hero">
        <div className="container">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(201,151,42,0.15)",
              border: "1px solid rgba(201,151,42,0.3)",
              color: "#E8B84B",
              fontSize: "0.78rem",
              fontWeight: "600",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              padding: "6px 14px",
              borderRadius: "100px",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#C9972A",
                display: "inline-block",
              }}
            ></span>
            Sobre Nosotros
          </div>
          <h1 className="nosotros-title">Sobre UniReport</h1>
          <p className="nosotros-subtitle">
            Somos una plataforma centralizada diseñada para la UTP:), enfocada en
            mejorar la gestión de incidencias de infraestructura, tecnología y
            seguridad de manera ágil y transparente.
          </p>
        </div>
      </div>

      <main className="page-main">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.8rem",
                fontWeight: "700",
                color: "var(--azul)",
                marginBottom: "0.5rem",
              }}
            >
              ¿Por qué UniReport?
            </h2>
            <p
              style={{
                color: "var(--texto-suave)",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            >
              Porque cada problema merece ser atendido. Nuestra misión es
              conectar la voz de la comunidad con quienes pueden resolverla.
            </p>
          </div>

          <div className="row g-4">
            {features.map((f, i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <div className="feature-card">
                  <div className="feature-icon">{f.icon}</div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-text">{f.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background:
                "linear-gradient(135deg, var(--azul), var(--azul-claro))",
              borderRadius: "20px",
              padding: "3rem",
              marginTop: "3rem",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.8rem",
                fontWeight: "700",
                color: "#fff",
                marginBottom: "0.75rem",
              }}
            >
              Diseñado para la mejorar la gestión de incidencias de la {" "}
              <span style={{ color: "#E8B84B" }}> UTP</span>
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                maxWidth: "500px",
                margin: "0 auto",
                lineHeight: "1.7",
              }}
            >
              Estudiantes, docentes y personal pueden reportar incidencias de
              forma segura, anónima y con seguimiento en tiempo real.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
