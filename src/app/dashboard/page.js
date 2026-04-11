'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAuth, logout } from '@/lib/auth';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    if (!auth) {
      router.push('/login');
      return;
    }
    setUser(auth.user);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return (
      <div style={{ paddingTop: 120, textAlign: 'center' }}>
        <p style={{ color: 'var(--text2)' }}>Se încarcă...</p>
      </div>
    );
  }

  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 4 }}>
              Bine ai venit! 👋
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: 15 }}>
              Conectat ca <strong>{user.email}</strong>
            </p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary">
            Deconectare
          </button>
        </div>

        <div style={{
          background: 'var(--surface)', borderRadius: 'var(--radius)', padding: 32,
          border: '1px solid var(--border)', textAlign: 'center', marginBottom: 24
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
            Dashboard în construcție
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>
            Lucrăm la panoul de administrare unde vei putea adăuga și gestiona animalele asociației tale. Între timp, poți adăuga animale direct din panoul Strapi.
          </p>
          <a href="https://api.adoptino.ro/admin" target="_blank" rel="noopener noreferrer"
            className="btn btn-primary" style={{ fontSize: 16, padding: '14px 28px' }}>
            Deschide Strapi Admin →
          </a>
        </div>

        <div style={{
          background: 'var(--card)', borderRadius: 'var(--radius)', padding: 24,
          border: '1px solid var(--border)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
            Ce vei putea face în curând:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Adăuga animale cu poze și descrieri', 'Edita sau șterge anunțuri existente', 'Vedea cererile de adopție primite', 'Actualiza profilul asociației'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, color: 'var(--text2)' }}>
                <span style={{ color: 'var(--accent)' }}>◻</span> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}