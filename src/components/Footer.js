import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 44, height: 44, background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, color: 'white', fontWeight: 800, fontFamily: 'var(--font-display)'
            }}>A</div>
            <span className="logo-text">Adoptino</span>
          </div>
          <p>Platforma gratuită de adopții animale din România. Conectăm suflete.</p>
          <div className="footer-social">
            <a href="https://facebook.com/adoptino.ro" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
            <a href="https://instagram.com/adoptino.ro" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
          </div>
        </div>
        <div className="footer-column">
          <h4>Platformă</h4>
          <Link href="/adopta">Adoptă</Link>
          <Link href="/asociatii">Asociații</Link>
          <Link href="/articole">Articole</Link>
          <a href="https://www.buymeacoffee.com/adoptino.ro" target="_blank" rel="noopener noreferrer">☕ Donează</a>
        </div>
        <div className="footer-column">
          <h4>Informații</h4>
          <Link href="/despre">Despre noi</Link>
          <Link href="/implica-te">Implică-te</Link>
          <Link href="/termeni">Termeni</Link>
          <Link href="/confidentialitate">Confidențialitate</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
        <div className="footer-column">
          <h4>Asociații</h4>
          <Link href="/login">Autentificare</Link>
          <Link href="/register">Înregistrare</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Adoptino · Iași, România</span>
        <div className="footer-links">
          <Link href="/termeni">Termeni</Link>
          <Link href="/confidentialitate">Confidențialitate</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}