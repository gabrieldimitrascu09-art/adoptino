'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AnimalCard from '@/components/AnimalCard';
import { DEMO_ASSOCIATIONS, DEMO_ANIMALS } from '@/data/demo';

export default function AssociationPage() {
  const { id } = useParams();
  const assoc = DEMO_ASSOCIATIONS.find((a) => a.id === Number(id));

  if (!assoc) {
    return (
      <section className="section" style={{ paddingTop: 120, textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>Asociație negăsită</h1>
          <Link href="/asociatii" className="btn btn-primary">← Înapoi la asociații</Link>
        </div>
      </section>
    );
  }

  const assocAnimals = DEMO_ANIMALS.filter((a) => a.assocId === assoc.id);

  return (
    <>
      <div style={{ padding: '100px 24px 40px', background: 'linear-gradient(180deg, var(--text), #3d2a1f)', textAlign: 'center' }}>
        <div style={{ width: 100, height: 100, borderRadius: 24, margin: '0 auto 20px', overflow: 'hidden', border: '4px solid rgba(255,255,255,0.2)' }}>
          <img src={assoc.image} alt={assoc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'white', marginBottom: 8 }}>
          {assoc.name} {assoc.verified && <span style={{ color: 'var(--green)' }}>✓</span>}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>📍 {assoc.county}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 24 }}>
          <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'white' }}>{assoc.animalsCount}</div><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Animale în grijă</div></div>
          <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'white' }}>{assoc.adoptedCount}</div><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Adoptate</div></div>
          <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'white' }}>{assoc.year}</div><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Fondată</div></div>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <p style={{ fontSize: 17, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 32 }}>{assoc.desc}</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
            <a href={`tel:${assoc.phone}`} style={{ flex: 1, minWidth: 150, padding: 14, borderRadius: 'var(--radius-xs)', background: 'var(--green-light)', color: 'var(--green)', fontSize: 15, fontWeight: 600, textAlign: 'center', textDecoration: 'none', border: '2px solid #a7f3d0' }}>📞 {assoc.phone}</a>
            <a href={`mailto:${assoc.email}`} style={{ flex: 1, minWidth: 150, padding: 14, borderRadius: 'var(--radius-xs)', background: 'var(--blue-light)', color: 'var(--blue)', fontSize: 15, fontWeight: 600, textAlign: 'center', textDecoration: 'none', border: '2px solid #93c5fd' }}>✉️ {assoc.email}</a>
            {assoc.website && <a href={`https://${assoc.website}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: 150, padding: 14, borderRadius: 'var(--radius-xs)', background: 'var(--surface)', color: 'var(--text2)', fontSize: 15, fontWeight: 600, textAlign: 'center', textDecoration: 'none', border: '2px solid var(--border)' }}>🌐 {assoc.website}</a>}
          </div>
          {assocAnimals.length > 0 && (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 24 }}>Animale disponibile ({assocAnimals.length})</h2>
              <div className="animals-grid">{assocAnimals.map((a) => <AnimalCard key={a.id} animal={a} />)}</div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
