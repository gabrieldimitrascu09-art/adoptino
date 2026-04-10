'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookiesAccepted', 'all');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookiesAccepted', 'necessary');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 150,
      background: 'var(--card)', padding: '20px 24px',
      boxShadow: '0 -4px 20px rgba(45,31,20,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, flexWrap: 'wrap',
      borderTop: '1px solid var(--border)'
    }}>
      <p style={{ fontSize: 14, color: 'var(--text2)', margin: 0, flex: '1 1 300px' }}>
        Acest site folosește cookie-uri pentru funcționare și analiză. Citește{' '}
        <Link href="/cookies" style={{ color: 'var(--accent)', fontWeight: 600 }}>Politica de Cookies</Link>.
      </p>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button onClick={accept} style={{
          padding: '10px 20px', borderRadius: 'var(--radius-xs)', border: 'none',
          background: 'var(--accent)', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer'
        }}>Accept toate</button>
        <button onClick={() => { window.location.href = '/cookies'; }} style={{
          padding: '10px 20px', borderRadius: 'var(--radius-xs)',
          border: '2px solid var(--border)', background: 'transparent',
          color: 'var(--text2)', fontWeight: 700, fontSize: 14, cursor: 'pointer'
        }}>Setări</button>
        <button onClick={decline} style={{
          padding: '10px 20px', borderRadius: 'var(--radius-xs)',
          border: '2px solid var(--border)', background: 'transparent',
          color: 'var(--text2)', fontWeight: 700, fontSize: 14, cursor: 'pointer'
        }}>Doar necesare</button>
      </div>
    </div>
  );
}