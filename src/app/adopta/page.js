'use client';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AnimalCard from '@/components/AnimalCard';
import { getAnimals, getStrapiMedia } from '@/lib/api';
import { COUNTIES } from '@/data/demo';
import { useLang } from '@/lib/LanguageContext';

function mapStrapiAnimal(item) {
  const a = item.attributes || item;
  const images = Array.isArray(a.images)
    ? a.images.map((img) => img.url).filter(Boolean)
    : [];
  const assocData = a.association?.data || a.association;
  const assoc = assocData && assocData.id ? assocData : null;

  return {
    id: item.id,
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
    createdAt: item.createdAt || null,
    association: assoc ? {
      id: assoc.id,
      name: assoc.name || '',
      county: assoc.county || '',
    } : null,
  };
}

function AdoptaPageContent() {
  const { t } = useLang();
  const urlParams = useSearchParams();
  const [allAnimals, setAllAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(urlParams.get('q') || '');
  const [county, setCounty] = useState(urlParams.get('county') || '');
  const [species, setSpecies] = useState(urlParams.get('species') || '');
  const [age, setAge] = useState(urlParams.get('age') || '');
  const [size, setSize] = useState(urlParams.get('size') || '');
  const [gender, setGender] = useState('');

  useEffect(() => {
    async function load() {
      const res = await getAnimals();
      if (res?.data) {
        setAllAnimals(res.data.map(mapStrapiAnimal));
      }
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return allAnimals.filter((a) => {
      const normalize = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const searchN = normalize(search);

      if (search && !normalize(a.name).includes(searchN) && !normalize(a.breed).includes(searchN) && !normalize(a.species).includes(searchN)) return false;
      if (county && a.county !== county) return false;
      if (species) {
        const speciesMap = { 'Câine': 'caine', 'Pisică': 'pisica', 'Altele': 'alt' };
        if (a.species !== species && a.species !== speciesMap[species]) return false;
      }
      if (size) {
        const sizeMap = { 'Mică': 'mic', 'Medie': 'mediu', 'Mare': 'mare' };
        if (a.size !== size && a.size !== sizeMap[size]) return false;
      }
      if (gender && a.gender !== gender) return false;
      if (age) {
        const ageMap = { '0-1': 'pui', '1-3': 'tanar', '3-6': 'adult', '6+': 'senior' };
        if (a.age !== ageMap[age]) return false;
      }
      return true;
    });
  }, [allAnimals, search, county, species, age, size, gender]);

  const clearFilters = () => {
    setSearch(''); setCounty(''); setSpecies(''); setAge(''); setSize(''); setGender('');
  };

  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
          {t('adopta-title')}
        </h1>
        <p style={{ color: 'var(--text2)', marginBottom: 24 }}>
          {loading ? t('adopta-loading') : `${filtered.length} ${filtered.length === 1 ? t('adopta-available-1') : t('adopta-available')}`}
        </p>

        <div style={{
          display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap',
          background: 'var(--card)', padding: 16, borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)'
        }}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={t('adopta-search')}
            style={{ flex: '2 1 200px', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, outline: 'none', background: 'var(--surface)', transition: 'border-color 0.3s' }} />
          <select value={county} onChange={(e) => setCounty(e.target.value)}
            style={{ flex: '1 1 150px', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, background: 'var(--surface)', cursor: 'pointer' }}>
            <option value="">{t('adopta-all-counties')}</option>
            {COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={species} onChange={(e) => setSpecies(e.target.value)}
            style={{ flex: '1 1 130px', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, background: 'var(--surface)', cursor: 'pointer' }}>
            <option value="">{t('adopta-species')}</option>
            <option value="caine">{t('adopta-dog')}</option>
            <option value="pisica">{t('adopta-cat')}</option>
            <option value="alt">{t('adopta-other')}</option>
          </select>
          <select value={age} onChange={(e) => setAge(e.target.value)}
            style={{ flex: '1 1 120px', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, background: 'var(--surface)', cursor: 'pointer' }}>
            <option value="">{t('adopta-age')}</option>
            <option value="0-1">{t('adopta-puppy')}</option>
            <option value="1-3">{t('adopta-young')}</option>
            <option value="3-6">{t('adopta-adult')}</option>
            <option value="6+">{t('adopta-senior')}</option>
          </select>
          <select value={size} onChange={(e) => setSize(e.target.value)}
            style={{ flex: '1 1 120px', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, background: 'var(--surface)', cursor: 'pointer' }}>
            <option value="">{t('adopta-size')}</option>
            <option value="mic">{t('adopta-small')}</option>
            <option value="mediu">{t('adopta-medium')}</option>
            <option value="mare">{t('adopta-large')}</option>
          </select>
          <select value={gender} onChange={(e) => setGender(e.target.value)}
            style={{ flex: '1 1 120px', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, background: 'var(--surface)', cursor: 'pointer' }}>
            <option value="">{t('adopta-gender')}</option>
            <option value="mascul">{t('adopta-male')}</option>
            <option value="femela">{t('adopta-female')}</option>
          </select>
          <button onClick={clearFilters}
            style={{ padding: '12px 20px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', background: 'transparent', fontSize: 14, fontWeight: 700, color: 'var(--text2)', cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap' }}>
            {t('adopta-clear')}
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text2)', padding: 60 }}>{t('adopta-loading-animals')}</p>
        ) : filtered.length > 0 ? (
          <div className="animals-grid">
            {filtered.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 8 }}>{t('adopta-no-results')}</h3>
            <p style={{ color: 'var(--text2)' }}>{t('adopta-no-results-text')}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function AdoptaPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: 120, textAlign: 'center' }}><p>Se încarcă...</p></div>}>
      <AdoptaPageContent />
    </Suspense>
  );
}