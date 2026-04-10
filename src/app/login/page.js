'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Demo: Autentificare reușită! Funcționalitatea completă vine în curând.');
  };

  return (
    <div style={{ maxWidth: 440, margin: '0 auto', padding: '120px 24px 60px' }}>
      <div style={{
        background: 'var(--card)', borderRadius: 'var(--radius)', padding: '40px 32px',
        border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, margin: '0 auto 16px',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, color: 'white', fontWeight: 800, fontFamily: 'var(--font-display)'
          }}>A</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
            Portal asociații
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text2)' }}>Intră în cont pentru a gestiona anunțurile.</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@asociatia.ro" required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Parolă</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" required style={inputStyle} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: 16, padding: '14px 28px' }}>
            Autentificare
          </button>
        </form>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0',
          color: 'var(--text3)', fontSize: 13, fontWeight: 600
        }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }}></div>
          <span>sau</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }}></div>
        </div>

        <Link href="/register" className="btn btn-secondary" style={{ width: '100%', fontSize: 15, padding: '14px 28px' }}>
          Creează cont nou
        </Link>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 };
const inputStyle = {
  width: '100%', padding: '12px 16px', border: '2px solid var(--border)',
  borderRadius: 'var(--radius-xs)', fontSize: 15, outline: 'none',
  transition: 'border-color 0.3s', background: 'var(--surface)'
};