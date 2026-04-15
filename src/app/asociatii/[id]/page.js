'use client';
import { useState, useEffect, useCallback } from 'react';
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

/* ── Lightbox Component ── */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [onClose, onPrev, onNext]);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.92)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <button onClick={(e) => { e.stopPropagation(); onClose(); }} style={{
        position: 'absolute', top: 20, right: 20, width: 44, height: 44, borderRadius: '50%',
        background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', fontSize: 24,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(8px)', zIndex: 10
      }}>✕</button>

      {images.length > 1 && (
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }} style={{
          position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
          border: 'none', color: 'white', fontSize: 28, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)', zIndex: 10
        }}>‹</button>
      )}

      <img
        onClick={(e) => e.stopPropagation()}
        src={images[index]}
        alt=""
        style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 8 }}
      />

      {images.length > 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} style={{
          position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
          border: 'none', color: 'white', fontSize: 28, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)', zIndex: 10
        }}>›</button>
      )}

      <div style={{ position: 'absolute', bottom: 20, color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 600 }}>
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

export default function AssociationPage() {
  const { id } = useParams();
  const [assoc, setAssoc] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    async function load() {
      let assocData = null;

      const resByDoc = await fetchAPI(`/associations/${id}`, {
        populate: {
          logo: true,
          gallery: true,
          cover: true,
          animals: {
            populate: { images: true },
            filters: { adoption_status: { $eq: 'disponibil' } }
          }
        }
      });

      if (resByDoc?.data) {
        assocData = resByDoc.data;
      } else {
        const resById = await fetchAPI('/associations', {
          filters: { id: { $eq: id } },
          populate: {
            logo: true,
            gallery: true,
            cover: true,
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
        const coverImg = a.cover?.url || (a.cover?.data?.url) || null;

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
          cover: coverImg,
          cui: a.cui || '',
          contact_person: a.contact_person || '',
          gallery: Array.isArray(a.gallery) ? a.gallery.map(img => img.url).filter(Boolean) : [],
        });

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

  const openLightbox = (i) => { setLightboxIndex(i); setLightboxOpen(true); };
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const prevImage = useCallback(() => {
    if (!assoc) return;
    setLightboxIndex(i => (i - 1 + assoc.gallery.length) % assoc.gallery.length);
  }, [assoc]);
  const nextImage = useCallback(() => {
    if (!assoc) return;
    setLightboxIndex(i => (i + 1) % assoc.gallery.length);
  }, [assoc]);

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
      {/* ── HEADER with cover ── */}
      <div style={{ paddingTop: 100 }}>
      <div style={{
        position: 'relative',
        padding: '40px 24px 48px',
        background: 'linear-gradient(180deg, var(--accent), var(--accent2))',
        textAlign: 'center',
        overflow: 'hidden',
        maxWidth: 1280,
        margin: '0 auto',
        borderRadius: 'var(--radius)',
      }}>
        {/* Cover photo overlay */}
        {assoc.cover && (
          <>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${assoc.cover})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 100%)',
            }} />
          </>
        )}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 110, height: 110, borderRadius: 28, margin: '0 auto 20px', overflow: 'hidden',
            border: '4px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}>
            {assoc.image ? (
              <img src={assoc.image} alt={assoc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: 44 }}>🏠</span>
            )}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: 'white',
            marginBottom: 10, textShadow: '0 2px 8px rgba(0,0,0,0.4)'
          }}>
            {assoc.name} {assoc.verified && <span style={{ color: '#a7f3d0' }}>✓</span>}
          </h1>
          <p style={{
            color: 'white', fontSize: 22, fontWeight: 700, letterSpacing: 0.5,
            textShadow: '0 2px 6px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            {assoc.county}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 28 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'white', textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>{animals.length}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Animale disponibile</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'white', textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>{assoc.total_adoptions}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Adoptate</div>
            </div>
            {assoc.founded_year && (
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'white', textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>{assoc.founded_year}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Fondată</div>
              </div>
            )}
          </div>
            </div>
      </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          {assoc.description && (
            <p style={{ fontSize: 17, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 32 }}>{assoc.description}</p>
          )}
          {(assoc.cui || assoc.contact_person) && (
            <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap', fontSize: 15, color: 'var(--text2)' }}>
              {assoc.cui && <span>🏢 CUI: <strong>{assoc.cui}</strong></span>}
              {assoc.contact_person && <span>👤 Contact: <strong>{assoc.contact_person}</strong></span>}
            </div>
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

          {/* ── Gallery with Lightbox ── */}
          {assoc.gallery.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Galerie foto</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                {assoc.gallery.map((url, i) => (
                  <div
                    key={i}
                    onClick={() => openLightbox(i)}
                    className="gallery-thumb"
                    style={{
                      borderRadius: 'var(--radius-sm)', overflow: 'hidden', height: 180,
                      cursor: 'pointer', position: 'relative'
                    }}
                  >
                    <img src={url} alt={`${assoc.name} foto ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                    <div className="gallery-overlay" style={{
                      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)',
                      transition: 'background 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <span className="gallery-zoom" style={{ color: 'white', fontSize: 28, opacity: 0, transition: 'opacity 0.3s' }}>🔍</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lightboxOpen && assoc.gallery.length > 0 && (
            <Lightbox
              images={assoc.gallery}
              index={lightboxIndex}
              onClose={closeLightbox}
              onPrev={prevImage}
              onNext={nextImage}
            />
          )}

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

      <style jsx>{`
        .gallery-thumb:hover .gallery-overlay { background: rgba(0,0,0,0.25) !important; }
        .gallery-thumb:hover .gallery-zoom { opacity: 1 !important; }
        .gallery-thumb:hover img { transform: scale(1.05); }
      `}</style>
    </>
  );
}
