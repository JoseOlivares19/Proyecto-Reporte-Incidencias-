import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="d-flex justify-content-around align-items-center border h-100">

        <p className="mb-0">©2026 Todos los derechos reservados.</p>
        <ul>
          <Link to="#" className="text-decoration-underline text-secondary me-3">Políticas</Link>
          <Link to="#" className="text-decoration-underline text-secondary">Términos</Link>
        </ul>
      </div>
    </footer>
  );
}