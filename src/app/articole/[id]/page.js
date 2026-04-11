'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DEMO_ARTICLES } from '@/data/demo';

export default function ArticlePage() {
  const { id } = useParams();
  const article = DEMO_ARTICLES.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <section className="section" style={{ paddingTop: 120, textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>Articol negăsit</h1>
          <Link href="/articole" className="btn btn-primary">← Înapoi la articole</Link>
        </div>
      </section>
    );
  }

  return (
    <section style={{ paddingTop: 100, paddingBottom: 60 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <Link href="/articole" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 600, color: 'var(--text2)', marginBottom: 24 }}>
          ← Înapoi la articole
        </Link>
        <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: 'var(--accent-light)', color: 'var(--accent)', marginBottom: 16 }}>
          {article.tag}
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          {article.title}
        </h1>
        <div style={{ fontSize: 14, color: 'var(--text3)', marginBottom: 32 }}>
          {article.date} · {article.readTime}
        </div>
        <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: 40, height: 360 }}>
          <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ fontSize: 17, lineHeight: 1.85, color: 'var(--text2)' }} dangerouslySetInnerHTML={{ __html: article.content }} />
        <div style={{
          marginTop: 48, padding: 32,
          background: 'linear-gradient(135deg, var(--accent-light), var(--yellow-light))',
          borderRadius: 'var(--radius)', textAlign: 'center'
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Susține Adoptino</h3>
          <p style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 16 }}>Dacă ți-a plăcut acest articol, ajută-ne să continuăm cu o donație.</p>
          <a href="https://www.buymeacoffee.com/adoptino.ro" target="_blank" rel="noopener noreferrer" className="btn btn-coffee" style={{ fontSize: 16, padding: '14px 32px' }}>
            ☕ Donează
          </a>
        </div>
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <Link href="/articole" className="btn btn-secondary">← Înapoi la articole</Link>
        </div>
      </div>
    </section>
  );
}
