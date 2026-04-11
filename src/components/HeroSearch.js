'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LanguageContext';
import { COUNTIES } from '@/data/demo';

export default function HeroSearch() {
  const [search, setSearch] = useState('');
  const [county, setCounty] = useState('');
  const router = useRouter();
  const { t } = useLang();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (county) params.set('county', county);
    router.push(`/adopta?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div style={{
      background: 'var(--card)', borderRadius: 'var(--radius)', padding: 8,
      boxShadow: 'var(--shadow-lg)', display: 'flex', gap: 8, flexWrap: 'wrap'
    }}>
      <div style={{
        flex: 2, display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px', background: 'var(--surface)', borderRadius: 'var(--radius-sm)',
        border: '2px solid transparent', transition: 'all 0.3s'
      }}>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('hero-search-placeholder')}
          style={{ border: 'none', background: 'transparent', fontSize: 15, color: 'var(--text)', outline: 'none', width: '100%' }}
        />
      </div>
      <div style={{
        flex: '1 1 150px', display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px', background: 'var(--surface)', borderRadius: 'var(--radius-sm)',
        border: '2px solid transparent'
      }}>
        <select value={county} onChange={(e) => setCounty(e.target.value)}
          style={{ border: 'none', background: 'transparent', fontSize: 15, color: 'var(--text)', outline: 'none', width: '100%', cursor: 'pointer' }}>
          <option value="">{t('hero-all-counties')}</option>
          {COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <button onClick={handleSearch} className="btn btn-primary" style={{ padding: '14px 28px', whiteSpace: 'nowrap' }}>
        {t('hero-search-btn')}
      </button>
    </div>
  );
}