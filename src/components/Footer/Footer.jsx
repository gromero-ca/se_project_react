import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Developed by Gabriel Romero</p>
      <p className="footer__text">
        Weather data: <a href="https://open-meteo.com/">Open-Meteo</a>
      </p>
      <p className="footer__text">2026</p>
    </footer>
  );
}

export default Footer;
