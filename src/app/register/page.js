'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser, saveAuth } from '@/lib/auth';
import { COUNTIES } from '@/data/demo';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.adoptino.ro';

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const assocName = form.assocName.value;
    const phone = form.phone.value;
    const contactPerson = form.contact.value;
    const county = form.county.value;
    const website = form.website.value;
    const description = form.description.value;

    if (password !== confirmPassword) {
      setError('Parolele nu coincid.');
      return;
    }
    if (password.length < 8) {
      setError('Parola trebuie să aibă minim 8 caractere.');
      return;
    }

    setLoading(true);

    // Pas 1: Creăm user-ul în Strapi
    const result = await registerUser({
      username: assocName,
      email,
      password,
    });

    if (result.error) {
      setLoading(false);
      setError(result.error);
      return;
    }

    // Pas 2: Creăm Association legată de user, folosind JWT-ul primit
    try {
      const assocRes = await fetch(`${API_URL}/api/associations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${result.jwt}`,
        },
       body: JSON.stringify({
          data: {
            name: assocName,
            county: county,
            phone: phone,
            email: email,
            website: website || null,
            description: description,
            cui: form.cui?.value || null,
            contact_person: contactPerson,
            verified: false,
          }
        }),
      });

      if (!assocRes.ok) {
        const errData = await assocRes.json().catch(() => null);
        console.error('Association creation error:', errData);
        // User-ul e creat dar Association nu — continuăm oricum
        // Asociația poate fi creată manual din dashboard mai târziu
      }
    } catch (err) {
      console.error('Association creation failed:', err);
    }

    saveAuth(result.jwt, result.user);
    setLoading(false);
    router.push('/dashboard');
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

        {error && (
          <div style={{
            padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: 'var(--radius-xs)', color: '#dc2626', fontSize: 14, marginBottom: 16, textAlign: 'center'
          }}>{error}</div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>Numele asociației *</label>
            <input name="assocName" type="text" placeholder="ex: Asociația Prietenii Animalelor" required style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Email *</label>
              <input name="email" type="email" placeholder="contact@asociatia.ro" required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Telefon *</label>
              <input name="phone" type="tel" placeholder="07xx xxx xxx" required style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Persoană contact *</label>
              <input name="contact" type="text" placeholder="Nume complet" required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Județ *</label>
              <select name="county" required style={inputStyle}>
                <option value="">Selectează...</option>
                {COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>CUI / CIF (opțional)</label>
            <input name="cui" type="text" placeholder="ex: RO12345678" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Website (opțional)</label>
            <input name="website" type="url" placeholder="https://asociatia.ro" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Descriere *</label>
            <textarea name="description" placeholder="Descrieți pe scurt activitatea asociației..." rows={3} required
              style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Parolă *</label>
              <input name="password" type="password" placeholder="Min. 8 caractere" required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Confirmă parola *</label>
              <input name="confirmPassword" type="password" placeholder="••••••••" required style={inputStyle} />
            </div>
          </div>

          <div style={{ padding: '12px 16px', background: 'var(--surface)', borderRadius: 'var(--radius-xs)', fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
            📋 Prin crearea contului, confirm că reprezint legal o asociație de protecție a animalelor înregistrată în România și sunt de acord cu{' '}
            <Link href="/termeni" style={{ color: 'var(--accent)', fontWeight: 600 }}>Termenii și Condițiile</Link> și{' '}
            <Link href="/confidentialitate" style={{ color: 'var(--accent)', fontWeight: 600 }}>Politica de Confidențialitate</Link>.
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}
            style={{ width: '100%', fontSize: 16, padding: '14px 28px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Se creează contul...' : 'Creează contul'}
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