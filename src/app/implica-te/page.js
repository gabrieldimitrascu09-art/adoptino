'use client';
import ScrollReveal from '@/components/ScrollReveal';
import { useLang } from '@/lib/LanguageContext';

export default function ImplicaPage() {
  const { t } = useLang();
  const cards = [
    { icon: '🏠', title: t('implica-adopt-title'), text: t('implica-adopt-text') },
    { icon: '🡪', title: t('implica-foster-title'), text: t('implica-foster-text') },
    { icon: '☕', title: t('implica-donate-title'), text: t('implica-donate-text') },
    { icon: '🤝', title: t('implica-volunteer-title'), text: t('implica-volunteer-text') },
    { icon: '📢', title: t('implica-share-title'), text: t('implica-share-text') },
    { icon: '📸', title: t('implica-photo-title'), text: t('implica-photo-text') },
  ];
  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-badge">{t('implica-badge')}</span>
            <h2 className="section-title">{t('implica-title')}</h2>
            <p className="section-subtitle">{t('implica-subtitle')}</p>
          </div>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {cards.map((card, i) => (
            <ScrollReveal key={i} delay={i < 5 ? i : 0}>
              <div style={{
                background: 'var(--card)', borderRadius: 'var(--radius)', padding: '32px 28px',
                border: '1px solid var(--border)', textAlign: 'center', transition: 'all 0.3s'
              }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>{card.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6 }}>{card.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <a href="https://www.buymeacoffee.com/adoptino.ro" target="_blank" rel="noopener noreferrer"
              className="btn btn-coffee" style={{ fontSize: 17, padding: '18px 36px' }}>
              {t('implica-support')}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}