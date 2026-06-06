import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-custom">
      <p>©2026 UniReport — Todos los derechos reservados.</p>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="#">Políticas</Link>
        <Link to="#">Términos</Link>
      </div>
    </footer>
  );
}