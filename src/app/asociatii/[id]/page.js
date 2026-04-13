'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AnimalCard from '@/components/AnimalCard';
import { fetchAPI, getStrapiMedia } from '@/lib/api';

function mapStrapiAnimal(item) {
  const a = item.attributes || item;
  const images = Array.isArray(a.images)
    ? a.images.map((img) => img.url).filter(Boolean)
    : [];
  const assocData = a.association?.data || a.association;
  const assoc = assocData && assocData.id ? assocData : null;

  return {
    id: item.id,
    documentId: item.documentId || null,
    name: a.name || '',
    species: a.species || '',
    breed: a.breed || '',
    age: a.age_category || '',
    size: a.size || '',
    county: a.county || '',
    gender: a.gender || '',
    description: a.description || '',
    image: images[0] || '/placeholder-animal.jpg',
    images: images.length > 0 ? images : ['/placeholder-animal.jpg'],
    sterilized: a.sterilized || false,
    vaccinated: a.vaccinated || false,
    association: assoc ? { id: assoc.id, name: assoc.name || '' } : null,
  };
}

export default function AssociationPage() {
  const { id } = useParams();
  const [assoc, setAssoc] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Try to find association by documentId first, then by id
      let assocData = null;

      // Method 1: fetch by documentId (Strapi v5 style)
      const resByDoc = await fetchAPI(`/associations/${id}`, {
        populate: {
          logo: true,
          animals: {
            populate: { images: true },
            filters: { adoption_status: { $eq: 'disponibil' } }
          }
        }
      });

      if (resByDoc?.data) {
        assocData = resByDoc.data;
      } else {
        // Method 2: filter by id number
        const resById = await fetchAPI('/associations', {
          filters: { id: { $eq: id } },
          populate: {
            logo: true,
            animals: {
              populate: { images: true },
              filters: { adoption_status: { $eq: 'disponibil' } }
            }
          }
        });
        if (resById?.data?.length > 0) {
          assocData = resById.data[0];
        }
      }

      if (assocData) {
        const a = assocData.attributes || assocData;
        const logo = a.logo?.url || (a.logo?.data?.url) || null;

        setAssoc({
          id: assocData.id,
          documentId: assocData.documentId || null,
          name: a.name || '',
          county: a.county || '',
          description: a.description || '',
          phone: a.phone || '',
          email: a.email || '',
          website: a.website || '',
          verified: a.verified || false,
          founded_year: a.founded_year || null,
          total_adoptions: a.total_adoptions || 0,
          image: logo,
        });

        // Map animals from the relation
        const assocAnimals = Array.isArray(a.animals?.data) ? a.animals.data : (Array.isArray(a.animals) ? a.animals : []);
        setAnimals(assocAnimals.filter(animal => {
          const animalData = animal.attributes || animal;
          return animalData.adoption_status === 'disponibil';
        }).map(mapStrapiAnimal));
      }

      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <section className="section" style={{ paddingTop: 120, textAlign: 'center' }}>
        <div className="container">
          <p style={{ color: 'var(--text2)', fontSize: 16 }}>Se încarcă...</p>
        </div>
      </section>
    );
  }

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

  return (
    <>
      <div style={{
        padding: '100px 24px 40px',
        background: 'linear-gradient(180deg, var(--accent), var(--accent2))',
        textAlign: 'center'
      }}>
        <div style={{
          width: 100, height: 100, borderRadius: 24, margin: '0 auto 20px', overflow: 'hidden',
          border: '4px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {assoc.image ? (
            <img src={assoc.image} alt={assoc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: 40 }}>🏠</span>
          )}
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'white', marginBottom: 8 }}>
          {assoc.name} {assoc.verified && <span style={{ color: '#a7f3d0' }}>✓</span>}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>📍 {assoc.county}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 24 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'white' }}>{animals.length}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Animale disponibile</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'white' }}>{assoc.total_adoptions}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Adoptate</div>
          </div>
          {assoc.founded_year && (
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'white' }}>{assoc.founded_year}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Fondată</div>
            </div>
          )}
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          {assoc.description && (
            <p style={{ fontSize: 17, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 32 }}>{assoc.description}</p>
          )}

          <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
            {assoc.phone && (
              <a href={`tel:${assoc.phone}`} style={{
                flex: 1, minWidth: 150, padding: 14, borderRadius: 'var(--radius-xs)',
                background: 'var(--green-light)', color: 'var(--green)', fontSize: 15,
                fontWeight: 600, textAlign: 'center', textDecoration: 'none', border: '2px solid #a7f3d0'
              }}>📞 {assoc.phone}</a>
            )}
            {assoc.email && (
              <a href={`mailto:${assoc.email}`} style={{
                flex: 1, minWidth: 150, padding: 14, borderRadius: 'var(--radius-xs)',
                background: 'var(--blue-light)', color: 'var(--blue)', fontSize: 15,
                fontWeight: 600, textAlign: 'center', textDecoration: 'none', border: '2px solid #93c5fd'
              }}>✉️ {assoc.email}</a>
            )}
            {assoc.website && (
              <a href={assoc.website.startsWith('http') ? assoc.website : `https://${assoc.website}`} target="_blank" rel="noopener noreferrer" style={{
                flex: 1, minWidth: 150, padding: 14, borderRadius: 'var(--radius-xs)',
                background: 'var(--surface)', color: 'var(--text2)', fontSize: 15,
                fontWeight: 600, textAlign: 'center', textDecoration: 'none', border: '2px solid var(--border)'
              }}>🌐 {assoc.website}</a>
            )}
          </div>

          {animals.length > 0 ? (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 24 }}>
                Animale disponibile ({animals.length})
              </h2>
              <div className="animals-grid">
                {animals.map((a) => <AnimalCard key={a.id} animal={a} />)}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🐾</div>
              <p style={{ color: 'var(--text2)', fontSize: 16 }}>Această asociație nu are încă animale listate.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
