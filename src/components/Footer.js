'use client';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLang();

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
          <p>{t('footer-desc')}</p>
          <div className="footer-social">
            <a href="https://facebook.com/adoptino.ro" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
            <a href="https://instagram.com/adoptino.ro" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
          </div>
        </div>
        <div className="footer-column">
          <h4>{t('footer-platform')}</h4>
          <Link href="/adopta">{t('nav-adopt')}</Link>
          <Link href="/asociatii">{t('nav-assoc')}</Link>
          <Link href="/articole">{t('nav-articles')}</Link>
          <a href="https://www.buymeacoffee.com/adoptino.ro" target="_blank" rel="noopener noreferrer">☕ {t('nav-donate')}</a>
        </div>
        <div className="footer-column">
          <h4>{t('footer-info')}</h4>
          <Link href="/despre">{t('nav-about')}</Link>
          <Link href="/implica-te">{t('nav-involve')}</Link>
          <Link href="/termeni">{t('footer-terms')}</Link>
          <Link href="/confidentialitate">{t('footer-privacy')}</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
        <div className="footer-column">
          <h4>{t('footer-assoc')}</h4>
          <Link href="/login">{t('footer-login')}</Link>
          <Link href="/register">{t('footer-register')}</Link>
        </div>
        <div className="footer-column">
          <h4>{t('footer-feedback')}</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); window.__showFeatureRequest?.(); }} style={{ cursor: 'pointer' }}>{t('footer-feature-request')}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Adoptino · Iași, România</span>
        <div className="footer-links">
          <Link href="/termeni">{t('footer-terms')}</Link>
          <Link href="/confidentialitate">{t('footer-privacy')}</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}