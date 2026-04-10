import ScrollReveal from '@/components/ScrollReveal';
import { DEMO_ARTICLES } from '@/data/demo';

export default function ArticolePage() {
  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-badge">Resurse</span>
            <h2 className="section-title">Articole și ghiduri</h2>
            <p className="section-subtitle">Tot ce trebuie să știi despre adopție și îngrijirea animalelor</p>
          </div>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {DEMO_ARTICLES.map((article) => (
            <ScrollReveal key={article.id}>
              <div style={{
                background: 'var(--card)', borderRadius: 'var(--radius)', overflow: 'hidden',
                border: '1px solid var(--border)', transition: 'all 0.3s', cursor: 'pointer'
              }}>
                <div style={{ height: 200, overflow: 'hidden' }}>
                  <img src={article.image} alt={article.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                </div>
                <div style={{ padding: 20 }}>
                  <span style={{
                    display: 'inline-block', padding: '4px 12px', borderRadius: 20,
                    fontSize: 12, fontWeight: 700, background: 'var(--accent-light)',
                    color: 'var(--accent)', marginBottom: 10
                  }}>{article.tag}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12 }}>
                    {article.excerpt}
                  </p>
                  <div style={{ fontSize: 13, color: 'var(--text3)' }}>
                    {article.date} · {article.readTime}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}