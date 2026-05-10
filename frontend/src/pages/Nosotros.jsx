import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Nosotros() {
  return (
    <>
      <Navbar />
      <main className="container-fluid main p-5 min-vh-100">
        <div className="container py-5 bg-light text-center rounded">
          <h1 className="fw-bold txt-primary mb-4">Sobre UniReport</h1>
          <p className="lead text-secondary max-w-50 mx-auto">
            Somos una plataforma centralizada diseñada para la UTP, enfocada en mejorar la gestión de incidencias de infraestructura, tecnología y seguridad de manera ágil y transparente.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}