'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser, saveAuth } from '@/lib/auth';
import { useLang } from '@/lib/LanguageContext';

export default function LoginPage() {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await loginUser(email, password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    saveAuth(result.jwt, result.user);
    router.push('/dashboard');
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
            {t('login-title')}
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text2)' }}>{t('login-subtitle')}</p>
        </div>

        {error && (
          <div style={{
            padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: 'var(--radius-xs)', color: '#dc2626', fontSize: 14, marginBottom: 16, textAlign: 'center'
          }}>{error}</div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>{t('login-email')}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@asociatia.ro" required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{t('login-password')}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" required style={inputStyle} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}
            style={{ width: '100%', fontSize: 16, padding: '14px 28px', opacity: loading ? 0.7 : 1 }}>
            {loading ? t('login-loading') : t('login-btn')}
          </button>
        </form>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0',
          color: 'var(--text3)', fontSize: 13, fontWeight: 600
        }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }}></div>
          <span>{t('login-or')}</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }}></div>
        </div>

        <Link href="/register" className="btn btn-secondary" style={{ width: '100%', fontSize: 15, padding: '14px 28px' }}>
          {t('login-register')}
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