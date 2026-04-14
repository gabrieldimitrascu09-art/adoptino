'use client';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { DEMO_ARTICLES } from '@/data/demo';
import { useLang } from '@/lib/LanguageContext';

export default function ArticolePage() {
  const { t, lang } = useLang();

  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-badge">{t('articles-badge')}</span>
            <h2 className="section-title">{t('articles-title')}</h2>
            <p className="section-subtitle">{t('articles-subtitle')}</p>
          </div>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {DEMO_ARTICLES.map((article) => {
            const title = typeof article.title === 'object' ? (article.title[lang] || article.title.ro) : article.title;
            const excerpt = typeof article.excerpt === 'object' ? (article.excerpt[lang] || article.excerpt.ro) : article.excerpt;
            const tag = typeof article.tag === 'object' ? (article.tag[lang] || article.tag.ro) : article.tag;
            const readTime = typeof article.readTime === 'object' ? (article.readTime[lang] || article.readTime.ro) : article.readTime;

            return (
              <ScrollReveal key={article.id}>
                <Link href={`/articole/${article.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{
                    background: 'var(--card)', borderRadius: 'var(--radius)', overflow: 'hidden',
                    border: '1px solid var(--border)', transition: 'all 0.3s', cursor: 'pointer', height: '100%'
                  }}>
                    <div style={{ height: 200, overflow: 'hidden' }}>
                      <img src={article.image} alt={title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                    </div>
                    <div style={{ padding: 20 }}>
                      <span style={{
                        display: 'inline-block', padding: '4px 12px', borderRadius: 20,
                        fontSize: 12, fontWeight: 700, background: 'var(--accent-light)',
                        color: 'var(--accent)', marginBottom: 10
                      }}>{tag}</span>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
                        {title}
                      </h3>
                      <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12 }}>
                        {excerpt}
                      </p>
                      <div style={{ fontSize: 13, color: 'var(--text3)' }}>
                        {article.date} · {readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}