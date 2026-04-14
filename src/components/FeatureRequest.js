'use client';
import { useState, useEffect } from 'react';
import { useLang } from '@/lib/LanguageContext';

export default function FeatureRequest() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    window.__showFeatureRequest = () => setShow(true);
    return () => { delete window.__showFeatureRequest; };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setShow(false); setSent(false); }, 2500);
  };

  if (!show) return null;

  return (
    <div onClick={() => setShow(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--card)', borderRadius: 'var(--radius)', padding: 32, maxWidth: 480, width: '100%' }}>
        {sent ? (
          <div style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>{t('feature-thanks')}</h3>
            <p style={{ color: 'var(--text2)', marginTop: 8 }}>{t('feature-sent')}</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>{t('feature-title')}</h3>
              <button onClick={() => setShow(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--text3)' }}>✕</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input required placeholder={t('feature-name')} style={{ width: '100%', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, outline: 'none', background: 'var(--surface)' }} />
              <input required type="email" placeholder={t('feature-email')} style={{ width: '100%', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, outline: 'none', background: 'var(--surface)' }} />
              <textarea required rows={4} placeholder={t('feature-desc')} style={{ width: '100%', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, outline: 'none', background: 'var(--surface)', resize: 'vertical' }} />
              <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: 16, padding: '14px 28px' }}>{t('feature-btn')}</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}