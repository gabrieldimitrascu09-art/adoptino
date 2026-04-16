'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { getArticles } from '@/lib/api';
import { useLang } from '@/lib/LanguageContext';

export default function ArticolePage() {
  const { t, lang } = useLang();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await getArticles({ sort: 'published_date:desc' });
      if (res?.data) {
        setArticles(res.data);
      }
      setLoading(false);
    }
    load();
  }, []);

  const getField = (article, field) => {
    const a = article.attributes || article;
    if (lang === 'en' && a[`${field}_en`]) return a[`${field}_en`];
    return a[field] || '';
  };

  const getImage = (article) => {
    const a = article.attributes || article;
    return a.cover_image?.url || a.cover_image?.data?.attributes?.url || null;
  };

  const getDate = (article) => {
    const a = article.attributes || article;
    const d = a.published_date || a.createdAt;
    if (!d) return '';
    return new Date(d).toLocaleDateString(lang === 'en' ? 'en-US' : 'ro-RO', { day: 'numeric', month: 'short', year: 'numeric' });
  };

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
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text2)', padding: 40 }}>Se încarcă...</p>
        ) : articles.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text2)', padding: 40 }}>Nu sunt articole publicate.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {articles.map((article) => {
              const title = getField(article, 'title');
              const excerpt = getField(article, 'excerpt');
              const tag = getField(article, 'tag');
              const image = getImage(article);
              const readTime = (article.attributes || article).read_time;
              const docId = article.documentId || (article.attributes?.documentId) || article.id;

              return (
                <ScrollReveal key={article.id}>
                  <Link href={`/articole/${docId}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <div style={{
                      background: 'var(--card)', borderRadius: 'var(--radius)', overflow: 'hidden',
                      border: '1px solid var(--border)', transition: 'all 0.3s', cursor: 'pointer', height: '100%'
                    }}>
                      <div style={{ height: 200, overflow: 'hidden' }}>
                        <img src={image || 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&q=80'} alt={title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                      </div>
                      <div style={{ padding: 20 }}>
                        {tag && <span style={{
                          display: 'inline-block', padding: '4px 12px', borderRadius: 20,
                          fontSize: 12, fontWeight: 700, background: 'var(--accent-light)',
                          color: 'var(--accent)', marginBottom: 10
                        }}>{tag}</span>}
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
                          {title}
                        </h3>
                        <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12 }}>
                          {excerpt}
                        </p>
                        <div style={{ fontSize: 13, color: 'var(--text3)' }}>
                          {getDate(article)}{readTime ? ` · ${readTime} min` : ''}
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}