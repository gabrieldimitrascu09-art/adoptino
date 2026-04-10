'use client';
import { useState } from 'react';
import Link from 'next/link';
import { COUNTIES } from '@/data/demo';

export default function RegisterPage() {
  const handleRegister = (e) => {
    e.preventDefault();
    alert('Demo: Cont creat cu succes! Vei fi contactat pentru verificare.');
  };

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', padding: '120px 24px 60px' }}>
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
            Înregistrare asociație
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text2)' }}>Creează un cont pentru a lista animale pe platformă.</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>Numele asociației *</label>
            <input type="text" placeholder="ex: Asociația Prietenii Animalelor" required style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Email *</label>
              <input type="email" placeholder="contact@asociatia.ro" required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Telefon *</label>
              <input type="tel" placeholder="07xx xxx xxx" required style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Persoană contact *</label>
              <input type="text" placeholder="Nume complet" required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Județ *</label>
              <select required style={inputStyle}>
                <option value="">Selectează...</option>
                {COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Website (opțional)</label>
            <input type="url" placeholder="https://asociatia.ro" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Descriere *</label>
            <textarea placeholder="Descrieți pe scurt activitatea asociației..." rows={3} required
              style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Parolă *</label>
              <input type="password" placeholder="Min. 8 caractere" required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Confirmă parola *</label>
              <input type="password" placeholder="••••••••" required style={inputStyle} />
            </div>
          </div>

          <div style={{ padding: '12px 16px', background: 'var(--surface)', borderRadius: 'var(--radius-xs)', fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
            📋 Prin crearea contului, confirm că reprezint legal o asociație de protecție a animalelor înregistrată în România și sunt de acord cu{' '}
            <Link href="/termeni" style={{ color: 'var(--accent)', fontWeight: 600 }}>Termenii și Condițiile</Link> și{' '}
            <Link href="/confidentialitate" style={{ color: 'var(--accent)', fontWeight: 600 }}>Politica de Confidențialitate</Link>.
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: 16, padding: '14px 28px' }}>
            Creează contul
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

        <Link href="/login" className="btn btn-secondary" style={{ width: '100%', fontSize: 15, padding: '14px 28px' }}>
          Am deja un cont
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