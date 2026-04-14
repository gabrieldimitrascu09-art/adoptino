'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { getAssociations, getStrapiMedia } from '@/lib/api';

function mapStrapiAssociation(item) {
  const a = item.attributes || item;
const logo = a.logo?.url || (a.logo?.data?.url) || null;

  return {
    id: item.id,
    documentId: item.documentId || null,
    name: a.name || '',
    county: a.county || '',
    desc: a.description || '',
    year: a.founded_year || '',
    verified: a.verified || false,
    image: logo || '/placeholder-assoc.jpg',
    animalsCount: a.animals?.data?.length || 0,
    adoptedCount: a.total_adoptions || 0,
  };
}

export default function AsociatiiPage() {
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await getAssociations({
        populate: {
          logo: true,
          animals: { fields: ['id'] }
        }
      });
      if (res?.data) {
        setAssociations(res.data.map(mapStrapiAssociation));
      }
      setLoading(false);
    }
    load();
  }, []);

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

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text2)', padding: 40 }}>Se încarcă...</p>
        ) : associations.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: 24 }}>
            {associations.map((assoc) => (
              <ScrollReveal key={assoc.id}>
                <Link href={`/asociatii/${assoc.documentId || assoc.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{
                    background: 'var(--card)', borderRadius: 'var(--radius)', overflow: 'hidden',
                    border: '1px solid var(--border)', transition: 'all 0.3s', cursor: 'pointer', height: '100%'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 20px 0' }}>
                      <div style={{ width: 56, height: 56, borderRadius: 16, overflow: 'hidden', flexShrink: 0, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {assoc.image !== '/placeholder-assoc.jpg' ? (
                          <img src={assoc.image} alt={assoc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span style={{ fontSize: 24 }}>🏠</span>
                        )}
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
                      {assoc.desc ? (assoc.desc.length > 120 ? assoc.desc.slice(0, 120) + '...' : assoc.desc) : 'Fără descriere încă.'}
                    </div>
                    <div style={{
                      padding: '12px 20px 20px', display: 'flex', gap: 16,
                      fontSize: 13, color: 'var(--text3)', borderTop: '1px solid var(--border)', marginTop: 4
                    }}>
                      {assoc.year && <span>📅 Din {assoc.year}</span>}
                      <span>🐾 {assoc.animalsCount} animale</span>
                      <span>💛 {assoc.adoptedCount} adoptate</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
            <p style={{ color: 'var(--text2)', fontSize: 16 }}>Încă nu sunt asociații înregistrate.</p>
            <Link href="/register" className="btn btn-primary" style={{ marginTop: 16 }}>Înregistrează-ți asociația</Link>
          </div>
        )}
      </div>
    </section>
  );
}