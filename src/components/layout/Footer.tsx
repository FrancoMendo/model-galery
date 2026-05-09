/**
 * Componente Footer
 */

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/*      <div className="footer-content">
        <div className="footer-section">
          <h3>Model Gallery</h3>
          <p>Agencia de modelos y actrices profesionales</p>
        </div>
        
        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/gallery">Galería</a></li>
            <li><a href="/about">Nosotros</a></li>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Twitter">Twitter</a>
          </div>
        </div>
      </div>
       */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} Model Gallery. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

