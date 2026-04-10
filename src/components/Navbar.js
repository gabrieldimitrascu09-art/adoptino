'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    { href: '/', label: 'Acasă' },
    { href: '/adopta', label: 'Adoptă' },
    { href: '/asociatii', label: 'Asociații' },
    { href: '/articole', label: 'Articole' },
    { href: '/implica-te', label: 'Implică-te' },
    { href: '/despre', label: 'Despre' },
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
            <a href="https://www.buymeacoffee.com/adoptino.ro" target="_blank" rel="noopener noreferrer" className="btn btn-coffee">
              ☕ Donează
            </a>
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
          <a href="https://www.buymeacoffee.com/adoptino.ro" target="_blank" rel="noopener noreferrer" className="btn btn-coffee btn-full">
            ☕ Susține platforma
          </a>
        </div>
      </div>
    </>
  );
}