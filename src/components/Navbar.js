'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggleLang, t } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? 'hidden' : '';
  };

  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  const navLinks = [
    { href: '/', label: t('nav-home') },
    { href: '/adopta', label: t('nav-adopt') },
    { href: '/asociatii', label: t('nav-assoc') },
    { href: '/articole', label: t('nav-articles') },
    { href: '/implica-te', label: t('nav-involve') },
    { href: '/despre', label: t('nav-about') },
  ];

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>A</div>
            <span className={styles.logoText}>Adoptino</span>
          </Link>

          <div className={styles.navMenu}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.navActions}>
            <button onClick={toggleLang} className={styles.langBtn}>
              {lang === 'ro' ? 'EN' : 'RO'}
            </button>
            <a href="https://www.buymeacoffee.com/adoptino.ro" target="_blank" rel="noopener noreferrer" className="btn btn-coffee">
              ☕ {t('nav-donate')}
            </a>
            <Link href="/login" className="btn btn-secondary">
              {lang === 'ro' ? 'Cont asociație' : 'Association Account'}
            </Link>
          </div>

          <button
            className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ''}`}
            onClick={toggleMobile}
            aria-label="Meniu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={styles.mobileLink} onClick={closeMobile}>
            {link.label}
          </Link>
        ))}
        <div className={styles.divider}></div>
        <div className={styles.mobileActions}>
          <button onClick={toggleLang} style={{
            padding: '12px 20px', borderRadius: 'var(--radius-xs)', fontSize: 14, fontWeight: 700,
            border: '2px solid var(--border)', background: 'transparent', color: 'var(--text2)',
            cursor: 'pointer', width: '100%'
          }}>
            {lang === 'ro' ? '🇬🇧 English' : '🇷🇴 Română'}
          </button>
          <a href="https://www.buymeacoffee.com/adoptino.ro" target="_blank" rel="noopener noreferrer" className="btn btn-coffee btn-full">
            ☕ {lang === 'ro' ? 'Susține platforma' : 'Support us'}
          </a>
        </div>
      </div>
    </>
  );
}