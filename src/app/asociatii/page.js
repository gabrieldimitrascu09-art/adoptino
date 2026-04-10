import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { DEMO_ASSOCIATIONS } from '@/data/demo';

export default function AsociatiiPage() {
  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-badge">Parteneri</span>
            <h2 className="section-title">Asociații partenere</h2>
            <p className="section-subtitle">Organizații verificate care salvează vieți în fiecare zi</p>
          </div>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {DEMO_ASSOCIATIONS.map((assoc) => (
            <ScrollReveal key={assoc.id}>
              <div style={{
                background: 'var(--card)', borderRadius: 'var(--radius)', overflow: 'hidden',
                border: '1px solid var(--border)', transition: 'all 0.3s', cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 20px 0' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16, overflow: 'hidden', flexShrink: 0
                  }}>
                    <img src={assoc.image} alt={assoc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                      {assoc.name}
                      {assoc.verified && <span style={{ color: 'var(--green)', fontSize: 14 }}>✓</span>}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text3)' }}>📍 {assoc.county}</div>
                  </div>
                </div>
                <div style={{ padding: '12px 20px', fontSize: 14, color: 'var(--text2)', lineHeight: 1.6 }}>
                  {assoc.desc}
                </div>
                <div style={{
                  padding: '12px 20px 20px', display: 'flex', gap: 16,
                  fontSize: 13, color: 'var(--text3)', borderTop: '1px solid var(--border)', marginTop: 4
                }}>
                  <span>📅 Din {assoc.year}</span>
                  <span>🐾 {assoc.animalsCount} animale</span>
                  <span>💛 {assoc.adoptedCount} adoptate</span>
                </div>
                <div style={{ padding: '0 20px 20px', display: 'flex', gap: 8 }}>
                  <a href={`tel:${assoc.phone}`} style={{
                    flex: 1, padding: '10px', borderRadius: 'var(--radius-xs)',
                    background: 'var(--green-light)', color: 'var(--green)', fontSize: 14,
                    fontWeight: 600, textAlign: 'center', textDecoration: 'none', border: '2px solid #a7f3d0'
                  }}>📞 Sună</a>
                  <a href={`mailto:${assoc.email}`} style={{
                    flex: 1, padding: '10px', borderRadius: 'var(--radius-xs)',
                    background: 'var(--blue-light)', color: 'var(--blue)', fontSize: 14,
                    fontWeight: 600, textAlign: 'center', textDecoration: 'none', border: '2px solid #93c5fd'
                  }}>✉️ Email</a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}