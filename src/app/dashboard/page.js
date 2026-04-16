'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, logout } from '@/lib/auth';
import { useLang } from '@/lib/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const API_URL = 'https://api.adoptino.ro';

export default function DashboardPage() {
  const { t, lang } = useLang();
  const [user, setUser] = useState(null);
  const [association, setAssociation] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState('animals');
  const [profile, setProfile] = useState({ name: '', description: '', phone: '', website: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);
  const fileInputRef = useRef(null);
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    if (!auth) { router.push('/login'); return; }
    setUser(auth.user);
    fetchData(auth.jwt, auth.user);
  }, [router]);

  const fetchData = async (jwt, currentUser) => {
    try {
      const assocRes = await fetch(`${API_URL}/api/associations?filters[email][$eq]=${encodeURIComponent(currentUser.email)}&populate[logo]=true&populate[cover]=true&populate[gallery]=true&populate[animals][populate][images]=true&pagination[pageSize]=100`, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      const assocData = await assocRes.json();
      if (assocData?.data?.length > 0) {
        const a = assocData.data[0];
        setAssociation(a);
       setProfile({
          name: a.name || '',
          description: a.description || '',
          phone: a.phone || '',
          website: a.website || '',
          cui: a.cui || '',
          contact_person: a.contact_person || '',
        });
        if (a.logo?.url) setAvatarUrl(a.logo.url);
        if (a.cover?.url) setCoverUrl(a.cover.url);
        const assocAnimals = Array.isArray(a.animals) ? a.animals : [];
        setAnimals(assocAnimals);
      } else {
        await fetchAllAnimals(jwt);
      }
    } catch (err) {
      console.error('Error fetching association:', err);
      await fetchAllAnimals(jwt);
    }
    setLoading(false);
  };

  const fetchAllAnimals = async (jwt) => {
    try {
      const res = await fetch(`${API_URL}/api/animals?populate=images&pagination[pageSize]=100`, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      const data = await res.json();
      setAnimals(data.data || []);
    } catch (err) { console.error(err); }
  };

  const refreshAnimals = async () => {
    const auth = getAuth();
    if (!auth) return;
    if (association) {
      await fetchData(auth.jwt, auth.user);
    } else {
      await fetchAllAnimals(auth.jwt);
    }
  };

  const handleLogout = () => { logout(); router.push('/'); };
const fixImageOrientation = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
        }, 'image/jpeg', 0.9);
      };
      img.src = URL.createObjectURL(file);
    });
  };
  const uploadImages = async (files, jwt) => {
    const ids = [];
    for (const file of files) {
      const fixedFile = await fixImageOrientation(file);
      const fd = new FormData(); fd.append('files', fixedFile);
      try {
        const res = await fetch(`${API_URL}/api/upload`, { method: 'POST', headers: { Authorization: `Bearer ${jwt}` }, body: fd });
        const data = await res.json();
        if (data?.[0]) ids.push(data[0].id);
      } catch (err) { console.error(err); }
    }
    return ids;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setMessage('');
    const auth = getAuth(); const form = e.target;
    let imageIds = [];
    if (selectedImages.length > 0) { setUploading(true); imageIds = await uploadImages(selectedImages, auth.jwt); setUploading(false); }
    const body = { data: {
      name: form.name.value, species: form.species.value, breed: form.breed.value || null,
      age_category: form.age_category.value || null, size: form.size.value || null, gender: form.gender.value || null,
      county: form.county.value, description: form.description.value, adoption_status: form.adoption_status?.value || 'disponibil',
      sterilized: form.sterilized.checked, vaccinated: form.vaccinated.checked, good_with_kids: form.good_with_kids.checked,
      good_with_pets: form.good_with_pets.checked, house_trained: form.house_trained.checked,
    }};
    if (imageIds.length > 0) {
      const existingIds = editingAnimal?.images ? editingAnimal.images.map(img => img.id).filter(Boolean) : [];
      body.data.images = [...existingIds, ...imageIds];
    }
    if (association && !editingAnimal) body.data.association = association.id;
    try {
      const url = editingAnimal ? `${API_URL}/api/animals/${editingAnimal.documentId}` : `${API_URL}/api/animals`;
      const res = await fetch(url, { method: editingAnimal ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.jwt}` }, body: JSON.stringify(body) });
      const data = await res.json();
      if (data.error) setMessage('❌ ' + (data.error.message || 'Eroare.'));
      else { setMessage(editingAnimal ? '✅ Animal actualizat!' : '✅ Animal adăugat!'); setShowForm(false); setEditingAnimal(null); setSelectedImages([]); refreshAnimals(); }
    } catch { setMessage('❌ Eroare de conexiune.'); }
    setSaving(false);
  };

  const handleStatusChange = async (animal, newStatus) => {
    const auth = getAuth();
    try {
      await fetch(`${API_URL}/api/animals/${animal.documentId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.jwt}` }, body: JSON.stringify({ data: { adoption_status: newStatus } }) });
      setMessage(`✅ ${animal.name} — ${sLabel[newStatus]}`);
      refreshAnimals();
    } catch { setMessage('❌ Eroare.'); }
  };

  const handleDelete = async (animal) => {
    if (!confirm(`⚠️ Ștergi definitiv ${animal.name}? Această acțiune nu poate fi anulată.`)) return;
    const auth = getAuth();
    try {
      await fetch(`${API_URL}/api/animals/${animal.documentId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${auth.jwt}` } });
      setMessage(`✅ ${animal.name} a fost șters.`);
      refreshAnimals();
    } catch { setMessage('❌ Eroare la ștergere.'); }
  };

  const handleEdit = (animal) => {
    setEditingAnimal(animal); setSelectedImages([]); setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAccount = async () => {
    if (!confirm('⚠️ Ești sigur? Contul și toate datele vor fi șterse definitiv.')) return;
    localStorage.removeItem('adoptino-jwt'); localStorage.removeItem('adoptino-user'); localStorage.removeItem('adoptino-profile');
    setTimeout(() => { logout(); router.push('/'); }, 1000);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const auth = getAuth(); if (!auth || !association) return;
    const fd = new FormData(); fd.append('files', file);
    try {
      const uploadRes = await fetch(`${API_URL}/api/upload`, { method: 'POST', headers: { Authorization: `Bearer ${auth.jwt}` }, body: fd });
      const uploadData = await uploadRes.json();
      if (uploadData?.[0]) {
        await fetch(`${API_URL}/api/associations/${association.documentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.jwt}` },
          body: JSON.stringify({ data: { logo: uploadData[0].id } })
        });
        setAvatarUrl(uploadData[0].url);
        setMessage('✅ Logo actualizat!');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Eroare la upload logo.');
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const auth = getAuth(); if (!auth || !association) return;
    const fd = new FormData(); fd.append('files', file);
    try {
      const uploadRes = await fetch(`${API_URL}/api/upload`, { method: 'POST', headers: { Authorization: `Bearer ${auth.jwt}` }, body: fd });
      const uploadData = await uploadRes.json();
      if (uploadData?.[0]) {
        await fetch(`${API_URL}/api/associations/${association.documentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.jwt}` },
          body: JSON.stringify({ data: { cover: uploadData[0].id } })
        });
        setCoverUrl(uploadData[0].url);
        setMessage('✅ Cover actualizat!');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Eroare la upload cover.');
    }
  };

  const handleSaveProfile = async () => {
    if (!association) { setMessage('❌ Nu ai o asociație legată de cont.'); return; }
    setSavingProfile(true);
    const auth = getAuth();
    try {
      const res = await fetch(`${API_URL}/api/associations/${association.documentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.jwt}` },
        body: JSON.stringify({ data: {
          name: profile.name,
          description: profile.description,
          phone: profile.phone,
          website: profile.website,
          cui: profile.cui,
          contact_person: profile.contact_person,
        }})
      });
      const data = await res.json();
      if (data.error) setMessage('❌ ' + (data.error.message || 'Eroare.'));
      else setMessage('✅ Profil salvat pe server!');
    } catch { setMessage('❌ Eroare de conexiune.'); }
    setSavingProfile(false);
  };

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', newPass: '', confirm: '' });
  const [passwordMsg, setPasswordMsg] = useState('');
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportText, setReportText] = useState('');
  const [reportMsg, setReportMsg] = useState('');

  const handleChangePassword = async () => {
    setPasswordMsg('');
    if (!passwordData.current || !passwordData.newPass || !passwordData.confirm) {
      setPasswordMsg('❌ Completează toate câmpurile.'); return;
    }
    if (passwordData.newPass.length < 8) { setPasswordMsg('❌ Parola trebuie să aibă minim 8 caractere.'); return; }
    if (passwordData.newPass !== passwordData.confirm) { setPasswordMsg('❌ Parolele nu coincid.'); return; }
    const auth = getAuth();
    try {
      const res = await fetch(`${API_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.jwt}` },
        body: JSON.stringify({ currentPassword: passwordData.current, password: passwordData.newPass, passwordConfirmation: passwordData.confirm })
      });
      const data = await res.json();
      if (data.error) setPasswordMsg('❌ ' + (data.error.message || 'Parola actuală e greșită.'));
      else { setPasswordMsg('✅ Parola a fost schimbată!'); setPasswordData({ current: '', newPass: '', confirm: '' }); setTimeout(() => setShowPasswordForm(false), 2000); }
    } catch { setPasswordMsg('❌ Eroare de conexiune.'); }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const combined = [...selectedImages, ...files];
    if (combined.length > 5) { setMessage(`❌ Maximum 5 fotografii noi. Ai selectat ${combined.length}.`); return; }
    setSelectedImages(combined);
  };

  if (!user) return <div style={{ paddingTop: 120, textAlign: 'center' }}><p>Se încarcă...</p></div>;

  const counties = ['București','Alba','Arad','Argeș','Bacău','Bihor','Bistrița-Năsăud','Botoșani','Brașov','Brăila','Buzău','Caraș-Severin','Călărași','Cluj','Constanța','Covasna','Dâmbovița','Dolj','Galați','Giurgiu','Gorj','Harghita','Hunedoara','Ialomița','Iași','Ilfov','Maramureș','Mehedinți','Mureș','Neamț','Olt','Prahova','Satu Mare','Sălaj','Sibiu','Suceava','Teleorman','Timiș','Tulcea','Vaslui','Vâlcea','Vrancea'];
  const sLabel = { disponibil: 'Disponibil', rezervat: 'Rezervat', adoptat: 'Adoptat', delistat: 'Delistat' };
  const sColor = { disponibil: { bg: '#dcfce7', c: '#16a34a', b: '#a7f3d0' }, rezervat: { bg: '#fef3c7', c: '#b45309', b: '#fde68a' }, adoptat: { bg: '#dbeafe', c: '#2563eb', b: '#93c5fd' }, delistat: { bg: '#f3f4f6', c: '#6b7280', b: '#d1d5db' } };
  const statusOrder = { disponibil: 0, rezervat: 1, adoptat: 2, delistat: 3 };
  const sortedAnimals = [...animals].sort((a, b) => {
    const sa = statusOrder[a.adoption_status || 'disponibil'] ?? 4;
    const sb = statusOrder[b.adoption_status || 'disponibil'] ?? 4;
    return sa - sb;
  });
  const byStatus = (s) => animals.filter(a => (a.adoption_status || 'disponibil') === s);

  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="container" style={{ maxWidth: 960 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div onClick={() => avatarInputRef.current?.click()} style={{ width: 56, height: 56, borderRadius: 16, overflow: 'hidden', cursor: 'pointer', background: 'linear-gradient(135deg, var(--accent), var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid var(--accent-light)', position: 'relative', flexShrink: 0 }}>
              {avatarUrl ? <img src={avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ color: 'white', fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-display)' }}>{(profile.name || user.email)[0].toUpperCase()}</span>}
              <div style={{ position: 'absolute', bottom: -2, right: -2, width: 20, height: 20, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'white', border: '2px solid white' }}>✎</div>
            </div>
            <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 2 }}>{profile.name || 'Dashboard'}</h1>
              <p style={{ color: 'var(--text3)', fontSize: 14 }}>{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ fontSize: 14 }}>{t('dash-logout')}</button>
        </div>

        {/* Stats */}
        <div className="dash-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          {[{ n: byStatus('disponibil').length, l: t('dash-available'), bg: '#dcfce7', c: '#16a34a' },
            { n: byStatus('rezervat').length, l: t('dash-reserved'), bg: '#fef3c7', c: '#b45309' },
            { n: byStatus('adoptat').length, l: t('dash-adopted'), bg: '#dbeafe', c: '#2563eb' },
            { n: byStatus('delistat').length, l: t('dash-delisted'), bg: '#f3f4f6', c: '#6b7280' }
          ].map((s, i) => (
            <div key={i} style={{ background: s.bg, borderRadius: 'var(--radius-sm)', padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: s.c }}>{s.n}</div>
              <div style={{ fontSize: 12, color: s.c, fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {message && <div style={{ padding: '12px 16px', borderRadius: 'var(--radius-xs)', marginBottom: 20, fontSize: 14, fontWeight: 600, background: message.includes('❌') ? '#fef2f2' : 'var(--green-light)', color: message.includes('❌') ? '#dc2626' : 'var(--green)' }}>{message}</div>}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--surface)', borderRadius: 'var(--radius-xs)', padding: 4 }}>
          {[{ k: 'animals', l: t('dash-tab-animals') }, { k: 'requests', l: t('dash-tab-requests') }, { k: 'stats', l: t('dash-tab-stats') }, { k: 'profile', l: t('dash-tab-profile') }, { k: 'settings', l: t('dash-tab-settings') }].map(tb => (
            <button key={tb.k} onClick={() => setTab(tb.k)} style={{
              flex: 1, padding: '12px 16px', borderRadius: 'var(--radius-xs)', border: 'none',
              background: tab === tb.k ? 'var(--card)' : 'transparent', boxShadow: tab === tb.k ? 'var(--shadow)' : 'none',
              fontWeight: 700, fontSize: 14, cursor: 'pointer', color: tab === tb.k ? 'var(--text)' : 'var(--text3)', fontFamily: 'var(--font)', transition: 'all 0.3s'
            }}>{tb.l}</button>
          ))}
        </div>

        {/* PROFILE TAB */}
        {tab === 'profile' && (
          <div style={{ background: 'linear-gradient(135deg, var(--accent-light), var(--yellow-light))', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <div style={{ position: 'relative', padding: '40px 32px 24px', textAlign: 'center', overflow: 'hidden' }}>
              {/* Cover photo background */}
              {coverUrl && (
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${coverUrl})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: 0.2
                }} />
              )}
              {/* Cover change button */}
              <button onClick={() => coverInputRef.current?.click()} style={{
                position: 'absolute', top: 12, right: 12, padding: '6px 12px', borderRadius: 'var(--radius-xs)',
                background: 'rgba(255,255,255,0.8)', border: 'none', fontSize: 12, fontWeight: 700,
                color: 'var(--text2)', cursor: 'pointer', backdropFilter: 'blur(4px)', zIndex: 2
              }}>📷 {coverUrl ? 'Schimbă cover' : 'Adaugă cover'}</button>
              <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverChange} style={{ display: 'none' }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div onClick={() => avatarInputRef.current?.click()} style={{ width: 96, height: 96, borderRadius: 24, margin: '0 auto 16px', overflow: 'hidden', cursor: 'pointer', border: '4px solid white', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
                  {avatarUrl ? <img src={avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--accent), var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: 'white', fontSize: 40, fontWeight: 800, fontFamily: 'var(--font-display)' }}>{(profile.name || 'A')[0].toUpperCase()}</span></div>}
                  <div style={{ position: 'absolute', bottom: 4, right: 4, width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'white', border: '3px solid white' }}>✎</div>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, marginBottom: 4 }}>{profile.name || 'Asociația ta'}</h2>
                <p style={{ fontSize: 14, color: 'var(--text2)' }}>{user.email}</p>
              </div>
            </div>
            <div style={{ background: 'var(--card)', borderRadius: 'var(--radius) var(--radius) 0 0', padding: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="dash-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div><label style={lbl}>Numele asociației</label><input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Numele complet" style={inp} /></div>
                  <div><label style={lbl}>Telefon</label><input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="07xx xxx xxx" style={inp} /></div>
                </div>
                <div><label style={lbl}>Website</label><input value={profile.website} onChange={e => setProfile({ ...profile, website: e.target.value })} placeholder="https://asociatia.ro" style={inp} /></div>
                <div className="dash-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div><label style={lbl}>CUI / CIF</label><input value={profile.cui} onChange={e => setProfile({ ...profile, cui: e.target.value })} placeholder="RO12345678" style={inp} /></div>
                  <div><label style={lbl}>Persoană contact</label><input value={profile.contact_person} onChange={e => setProfile({ ...profile, contact_person: e.target.value })} placeholder="Nume complet" style={inp} /></div>
                </div>
                <div><label style={lbl}>Despre asociație</label><textarea value={profile.description} onChange={e => setProfile({ ...profile, description: e.target.value })} placeholder="Povestește despre misiunea asociației..." rows={5} style={{ ...inp, resize: 'vertical' }} /></div>
                <div>
                  <label style={lbl}>Galerie foto (max 5 poze)</label>
                  {association?.gallery && Array.isArray(association.gallery) && association.gallery.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                      {association.gallery.map((img, i) => (
                        <div key={img.id || i} style={{ position: 'relative', width: 100, height: 80, borderRadius: 8, overflow: 'hidden', border: '2px solid var(--border)' }}>
                          <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button onClick={async () => {
                            const auth = getAuth(); if (!auth || !association) return;
                            const remaining = association.gallery.filter((_, idx) => idx !== i).map(g => g.id);
                            try {
                              await fetch(`${API_URL}/api/associations/${association.documentId}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.jwt}` },
                                body: JSON.stringify({ data: { gallery: remaining.length > 0 ? remaining : null } })
                              });
                              setMessage('✅ Poză ștearsă din galerie!');
                              refreshAnimals();
                            } catch { setMessage('❌ Eroare la ștergere.'); }
                          }} style={{ position: 'absolute', top: 2, right: 2, width: 20, height: 20, borderRadius: '50%', background: '#dc2626', border: '2px solid white', color: 'white', fontSize: 10, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, lineHeight: 1 }}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                  {(!association?.gallery || association.gallery.length < 5) && (
                    <>
                      <div onClick={() => document.getElementById('gallery-input')?.click()} style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-xs)', padding: 20, textAlign: 'center', cursor: 'pointer', background: 'var(--surface)' }}>
                        <div style={{ fontSize: 28, marginBottom: 6 }}>📷</div>
                        <p style={{ fontSize: 14, color: 'var(--text2)', fontWeight: 600 }}>Click pentru a adăuga poze ({association?.gallery?.length || 0}/5)</p>
                      </div>
                      <input id="gallery-input" type="file" multiple accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                        const files = Array.from(e.target.files);
                        const currentCount = association?.gallery?.length || 0;
                        if (currentCount + files.length > 5) { setMessage(`❌ Poți adăuga maxim ${5 - currentCount} poze.`); return; }
                        const auth = getAuth(); if (!auth || !association) return;
                        setMessage('Se încarcă pozele...');
                        const newIds = await uploadImages(files, auth.jwt);
                        const existingIds = (association.gallery || []).map(g => g.id);
                        const allIds = [...existingIds, ...newIds];
                        try {
                          await fetch(`${API_URL}/api/associations/${association.documentId}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.jwt}` },
                            body: JSON.stringify({ data: { gallery: allIds } })
                          });
                          setMessage('✅ Galerie actualizată!');
                          refreshAnimals();
                        } catch { setMessage('❌ Eroare la salvare galerie.'); }
                      }} />
                    </>
                  )}
                </div>
                <button onClick={handleSaveProfile} className="btn btn-primary" disabled={savingProfile} style={{ width: '100%', fontSize: 16, padding: '14px 28px' }}>{savingProfile ? 'Se salvează...' : 'Salvează profilul'}</button>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Change password */}
            <div style={{ background: 'var(--card)', borderRadius: 'var(--radius)', padding: 24, border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Schimbă parola</h3>
              {!showPasswordForm ? (
                <>
                  <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 16 }}>Actualizează-ți parola de acces.</p>
                  <button onClick={() => { setShowPasswordForm(true); setPasswordMsg(''); }} style={{ padding: '10px 20px', borderRadius: 'var(--radius-xs)', border: '2px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Schimbă parola</button>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
                  <div>
                    <label style={lbl}>Parola actuală</label>
                    <input type="password" value={passwordData.current} onChange={e => setPasswordData({ ...passwordData, current: e.target.value })} placeholder="••••••••" style={inp} />
                  </div>
                  <div>
                    <label style={lbl}>Parola nouă</label>
                    <input type="password" value={passwordData.newPass} onChange={e => setPasswordData({ ...passwordData, newPass: e.target.value })} placeholder="Min. 8 caractere" style={inp} />
                  </div>
                  <div>
                    <label style={lbl}>Confirmă parola nouă</label>
                    <input type="password" value={passwordData.confirm} onChange={e => setPasswordData({ ...passwordData, confirm: e.target.value })} placeholder="••••••••" style={inp} />
                  </div>
                  {passwordMsg && <p style={{ fontSize: 14, fontWeight: 600, color: passwordMsg.includes('❌') ? '#dc2626' : 'var(--green)' }}>{passwordMsg}</p>}
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={handleChangePassword} className="btn btn-primary" style={{ fontSize: 14, padding: '10px 20px' }}>Salvează parola</button>
                    <button onClick={() => { setShowPasswordForm(false); setPasswordMsg(''); setPasswordData({ current: '', newPass: '', confirm: '' }); }} style={{ padding: '10px 20px', borderRadius: 'var(--radius-xs)', border: '2px solid var(--border)', background: 'white', color: 'var(--text2)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Anulează</button>
                  </div>
                </div>
              )}
            </div>

            {/* Report / Sesizare */}
            <div style={{ background: 'var(--card)', borderRadius: 'var(--radius)', padding: 24, border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Trimite o sesizare</h3>
              {!showReportForm ? (
                <>
                  <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 16 }}>Ai observat ceva în neregulă? Trimite-ne un mesaj.</p>
                  <button onClick={() => { setShowReportForm(true); setReportMsg(''); }} style={{ padding: '10px 20px', borderRadius: 'var(--radius-xs)', border: '2px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>✉️ Trimite sesizare</button>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 500 }}>
                  <textarea value={reportText} onChange={e => setReportText(e.target.value)} placeholder="Descrie sesizarea ta..." rows={4} style={{ ...inp, resize: 'vertical' }} />
                  {reportMsg && <p style={{ fontSize: 14, fontWeight: 600, color: reportMsg.includes('❌') ? '#dc2626' : 'var(--green)' }}>{reportMsg}</p>}
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => { if (!reportText.trim()) { setReportMsg('❌ Scrie sesizarea înainte de a trimite.'); return; } setReportMsg('✅ Sesizarea a fost trimisă. Mulțumim!'); setReportText(''); setTimeout(() => setShowReportForm(false), 2000); }} className="btn btn-primary" style={{ fontSize: 14, padding: '10px 20px' }}>Trimite</button>
                    <button onClick={() => { setShowReportForm(false); setReportMsg(''); setReportText(''); }} style={{ padding: '10px 20px', borderRadius: 'var(--radius-xs)', border: '2px solid var(--border)', background: 'white', color: 'var(--text2)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Anulează</button>
                  </div>
                </div>
              )}
            </div>

            {/* Danger zone */}
            <div style={{ background: '#fef2f2', borderRadius: 'var(--radius)', padding: 24, border: '1px solid #fecaca' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#dc2626' }}>Zona periculoasă</h3>
              <p style={{ fontSize: 14, color: '#b91c1c', marginBottom: 16 }}>Ștergerea contului este permanentă. Toate datele asociate vor fi pierdute.</p>
              {!showDeleteAccount ? (
                <button onClick={() => setShowDeleteAccount(true)} style={{ padding: '10px 20px', borderRadius: 'var(--radius-xs)', border: '2px solid #fecaca', background: 'white', color: '#dc2626', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Șterge contul</button>
              ) : (
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <p style={{ fontSize: 14, color: '#dc2626', fontWeight: 700 }}>Ești absolut sigur?</p>
                  <button onClick={handleDeleteAccount} style={{ padding: '10px 20px', borderRadius: 'var(--radius-xs)', border: 'none', background: '#dc2626', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Da, șterge definitiv</button>
                  <button onClick={() => setShowDeleteAccount(false)} style={{ padding: '10px 20px', borderRadius: 'var(--radius-xs)', border: '2px solid var(--border)', background: 'white', color: 'var(--text2)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Anulează</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* REQUESTS TAB */}
        {tab === 'requests' && (
          <RequestsTab association={association} />
        )}

        {/* STATS TAB */}
        {tab === 'stats' && (
          <StatsTab animals={animals} />
        )}

        {/* ANIMALS TAB */}
        {tab === 'animals' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>{t('dash-tab-animals')} ({animals.length})</h2>
              <button onClick={() => { setShowForm(true); setEditingAnimal(null); setSelectedImages([]); }} className="btn btn-primary" style={{ fontSize: 14 }}>{t('dash-add-animal')}</button>
            </div>

            {showForm && (
              <div style={{ background: 'var(--card)', borderRadius: 'var(--radius)', padding: '24px 20px', border: '1px solid var(--border)', marginBottom: 24, boxShadow: 'var(--shadow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>{editingAnimal ? `Editează ${editingAnimal.name}` : 'Animal nou'}</h3>
                  <button onClick={() => { setShowForm(false); setEditingAnimal(null); }} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: 'var(--text3)' }}>✕</button>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="dash-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div><label style={lbl}>Nume *</label><input name="name" required defaultValue={editingAnimal?.name || ''} placeholder="ex: Rex" style={inp} /></div>
                    <div><label style={lbl}>Specie *</label><select name="species" required defaultValue={editingAnimal?.species || ''} style={inp}><option value="">Selectează...</option><option value="caine">Câine</option><option value="pisica">Pisică</option><option value="alt">Altele</option></select></div>
                  </div>
                  <div className="dash-form-row-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                    <div><label style={lbl}>Rasă</label><input name="breed" defaultValue={editingAnimal?.breed || ''} placeholder="ex: Labrador mix" style={inp} /></div>
                    <div><label style={lbl}>Vârstă</label><select name="age_category" defaultValue={editingAnimal?.age_category || ''} style={inp}><option value="">Selectează...</option><option value="pui">Pui</option><option value="tanar">Tânăr</option><option value="adult">Adult</option><option value="senior">Senior</option></select></div>
                    <div><label style={lbl}>Talie</label><select name="size" defaultValue={editingAnimal?.size || ''} style={inp}><option value="">Selectează...</option><option value="mic">Mică</option><option value="mediu">Medie</option><option value="mare">Mare</option></select></div>
                  </div>
                  <div className="dash-form-row-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                    <div><label style={lbl}>Gen</label><select name="gender" defaultValue={editingAnimal?.gender || ''} style={inp}><option value="">Selectează...</option><option value="mascul">Mascul</option><option value="femela">Femelă</option></select></div>
                    <div><label style={lbl}>Județ *</label><select name="county" required defaultValue={editingAnimal?.county || ''} style={inp}><option value="">Selectează...</option>{counties.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                    <div><label style={lbl}>Status</label><select name="adoption_status" defaultValue={editingAnimal?.adoption_status || 'disponibil'} style={inp}><option value="disponibil">Disponibil</option><option value="rezervat">Rezervat</option><option value="adoptat">Adoptat</option></select></div>
                  </div>
                  <div><label style={lbl}>Descriere</label><textarea name="description" rows={3} defaultValue={editingAnimal?.description || ''} placeholder="Descrie personalitatea animalului..." style={{ ...inp, resize: 'vertical' }} /></div>
                  <div>
                    <label style={lbl}>Fotografii (max 5)</label>
                    {editingAnimal?.images && editingAnimal.images.length > 0 && (
                      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                        {editingAnimal.images.map((img, i) => {
                          const url = img.url?.startsWith('http') ? img.url : `${API_URL}${img.url}`;
                          return (
                            <div key={img.id || i} style={{ position: 'relative', width: 100, height: 80, borderRadius: 8, overflow: 'hidden', border: '2px solid var(--border)' }}>
                              <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <button type="button" onClick={async () => {
                                const auth = getAuth(); if (!auth) return;
                                const remaining = editingAnimal.images.filter((_, idx) => idx !== i).map(g => g.id);
                                try {
                                  await fetch(`${API_URL}/api/animals/${editingAnimal.documentId}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.jwt}` },
                                    body: JSON.stringify({ data: { images: remaining.length > 0 ? remaining : null } })
                                  });
                                  setMessage('✅ Poză ștearsă!');
                                  setEditingAnimal({ ...editingAnimal, images: editingAnimal.images.filter((_, idx) => idx !== i) });
                                  refreshAnimals();
                                } catch { setMessage('❌ Eroare la ștergere poză.'); }
                              }} style={{ position: 'absolute', top: 2, right: 2, width: 20, height: 20, borderRadius: '50%', background: '#dc2626', border: '2px solid white', color: 'white', fontSize: 10, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, lineHeight: 1 }}>✕</button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div onClick={() => fileInputRef.current?.click()} style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-xs)', padding: 24, textAlign: 'center', cursor: 'pointer', background: 'var(--surface)' }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>+</div>
                      <p style={{ fontSize: 14, color: 'var(--text2)', fontWeight: 600 }}>{selectedImages.length > 0 ? `${selectedImages.length} fotografie(i) selectate` : 'Click pentru a selecta fotografii'}</p>
                    </div>
                    <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} />
                    {selectedImages.length > 0 && <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>{selectedImages.map((f, i) => <div key={i} style={{ position: 'relative', width: 72, height: 72, borderRadius: 8, overflow: 'hidden', border: '2px solid var(--border)' }}><img src={URL.createObjectURL(f)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><button type="button" onClick={() => setSelectedImages(selectedImages.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: 2, right: 2, width: 18, height: 18, borderRadius: '50%', background: '#dc2626', border: '2px solid white', color: 'white', fontSize: 9, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, lineHeight: 1 }}>✕</button></div>)}</div>}
                  </div>
                  <div className="dash-checkboxes" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, padding: 16, background: 'var(--surface)', borderRadius: 'var(--radius-xs)' }}>
                    {[{ n: 'sterilized', l: 'Sterilizat', d: editingAnimal?.sterilized }, { n: 'vaccinated', l: 'Vaccinat', d: editingAnimal?.vaccinated }, { n: 'good_with_kids', l: 'Bun cu copiii', d: editingAnimal?.good_with_kids }, { n: 'good_with_pets', l: 'Bun cu alte animale', d: editingAnimal?.good_with_pets }, { n: 'house_trained', l: 'Potrivit pentru bloc', d: editingAnimal?.house_trained }].map(ch => (
                      <label key={ch.n} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--text2)', cursor: 'pointer' }}><input type="checkbox" name={ch.n} defaultChecked={ch.d || false} style={{ width: 18, height: 18, accentColor: 'var(--accent)' }} />{ch.l}</label>
                    ))}
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={saving || uploading} style={{ width: '100%', fontSize: 16, padding: '14px 28px', opacity: (saving || uploading) ? 0.7 : 1 }}>
                    {uploading ? 'Se încarcă pozele...' : saving ? 'Se salvează...' : editingAnimal ? 'Actualizează' : 'Adaugă animalul'}
                  </button>
                </form>
              </div>
            )}

            {loading ? <p style={{ textAlign: 'center', padding: 40, color: 'var(--text2)' }}>Se încarcă...</p>
            : animals.length === 0 ? (
              <div style={{ background: 'var(--card)', borderRadius: 'var(--radius)', padding: 48, border: '1px solid var(--border)', textAlign: 'center' }}>
                <p style={{ color: 'var(--text2)', fontSize: 18, marginBottom: 16 }}>{t('dash-no-animals')}</p>
                <button onClick={() => { setShowForm(true); setEditingAnimal(null); }} className="btn btn-primary">{t('dash-add-first')}</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {sortedAnimals.map((animal) => {
                  const st = animal.adoption_status || 'disponibil';
                  const sc = sColor[st] || sColor.disponibil;
                  const isDelistat = st === 'delistat';
                  return (
                    <div key={animal.id} className="dash-animal-row" style={{
                      background: isDelistat ? '#f9fafb' : 'var(--card)', borderRadius: 'var(--radius-sm)', padding: 16,
                      border: `1px solid ${isDelistat ? '#e5e7eb' : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
                      opacity: isDelistat ? 0.6 : 1
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                          {animal.images?.[0] ? (
                            <div style={{ width: 56, height: 56, borderRadius: 12, overflow: 'hidden' }}>
                              <img src={animal.images[0].url?.startsWith('http') ? animal.images[0].url : `${API_URL}${animal.images[0].url}`} alt={animal.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: isDelistat ? 'grayscale(1)' : 'none' }} />
                            </div>
                          ) : <div style={{ width: 56, height: 56, borderRadius: 12, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🐾</div>}
                          {isDelistat && <div style={{ position: 'absolute', top: -4, right: -4, width: 22, height: 22, borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white', fontWeight: 800, border: '2px solid white' }}>✕</div>}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: isDelistat ? '#9ca3af' : 'var(--text)', textDecoration: isDelistat ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{animal.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>{animal.species === 'caine' ? 'Câine' : animal.species === 'pisica' ? 'Pisică' : 'Altele'} · {animal.breed ? animal.breed + ' · ' : ''}{animal.county}</div>
                          <div style={{ display: 'flex', gap: 10, fontSize: 11, color: 'var(--text3)', flexWrap: 'wrap' }}>
                            <span title="Vizualizări">👁 {animal.views || 0}</span>
                            <span title="Click telefon">📞 {animal.phone_clicks || 0}</span>
                            <span title="Cereri">📋 {animal.request_count || 0}</span>
                          </div>
                        </div>
                      </div>
                      <div className="dash-animal-actions" style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <select value={st} onChange={(e) => handleStatusChange(animal, e.target.value)}
                          style={{ padding: '6px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700, border: `2px solid ${sc.b}`, background: sc.bg, color: sc.c, cursor: 'pointer', maxWidth: '100%' }}>
                          <option value="disponibil">● Disponibil</option>
                          <option value="rezervat">● Rezervat</option>
                          <option value="adoptat">● Adoptat</option>
                          <option value="delistat">✕ Delistat</option>
                        </select>
                        <button onClick={() => handleEdit(animal)} title={t('dash-edit')} style={{ padding: '6px 12px', borderRadius: 6, border: '2px solid var(--border)', background: 'white', color: 'var(--accent)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{t('dash-edit')}</button>
                        <button onClick={() => handleDelete(animal)} title={t('dash-delete')} style={{ padding: '6px 12px', borderRadius: 6, border: '2px solid #fecaca', background: '#fef2f2', color: '#dc2626', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{t('dash-delete')}</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .dash-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dash-form-row { grid-template-columns: 1fr !important; }
          .dash-form-row-3 { grid-template-columns: 1fr !important; }
          .dash-checkboxes { grid-template-columns: 1fr !important; }
          .dash-animal-row { flex-direction: column !important; align-items: stretch !important; }
          .dash-animal-actions { justify-content: stretch !important; }
          .dash-animal-actions select { flex: 1; }
          .dash-animal-actions button { flex: 1; text-align: center; }
        }
      `}</style>
    </section>
  );
}

const lbl = { display: 'block', fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 };
const inp = { width: '100%', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: 15, outline: 'none', background: 'var(--surface)' };

/* ── Requests Tab Component ── */
function RequestsTab({ association }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const loadRequests = async () => {
    if (!association) { setLoading(false); return; }
    const auth = getAuth(); if (!auth) { setLoading(false); return; }
    try {
      const res = await fetch(
        `${API_URL}/api/adoption-requests?populate[animal][populate][images]=true&populate[association]=true&sort=createdAt:desc&pagination[pageSize]=100`,
        { headers: { Authorization: `Bearer ${auth.jwt}` } }
      );
      const data = await res.json();
      const allRequests = data?.data || [];
      const filtered = allRequests.filter(req => {
        const r = req.attributes || req;
        const reqAssoc = r.association?.data || r.association;
        if (!reqAssoc) return false;
        return reqAssoc.id === association.id
          || reqAssoc.documentId === association.documentId
          || reqAssoc.email === association.email;
      });
      setRequests(filtered);
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
    setLoading(false);
  };

  useEffect(() => { loadRequests(); }, [association]);

  const updateStatus = async (req, newStatus) => {
    const auth = getAuth(); if (!auth) return;
    const documentId = req.documentId || req.attributes?.documentId;
    try {
      await fetch(`${API_URL}/api/adoption-requests/${documentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.jwt}` },
        body: JSON.stringify({ data: { status: newStatus } })
      });
      setRequests(reqs => reqs.map(r => r.id === req.id ? { ...r, status: newStatus } : r));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  if (loading) return <p style={{ textAlign: 'center', padding: 40, color: 'var(--text2)' }}>Se încarcă cererile...</p>;

  const statusColors = {
    nou: { bg: '#dbeafe', c: '#2563eb', label: 'Nouă' },
    vazut: { bg: '#fef3c7', c: '#b45309', label: 'Văzută' },
    contactat: { bg: '#dcfce7', c: '#16a34a', label: 'Contactat' },
    respins: { bg: '#f3f4f6', c: '#6b7280', label: 'Respins' },
  };

  const counts = {
    all: requests.length,
    nou: requests.filter(r => ((r.attributes || r).status || 'nou') === 'nou').length,
    vazut: requests.filter(r => (r.attributes || r).status === 'vazut').length,
    contactat: requests.filter(r => (r.attributes || r).status === 'contactat').length,
    respins: requests.filter(r => (r.attributes || r).status === 'respins').length,
  };

  const displayed = filter === 'all' ? requests : requests.filter(req => {
    const r = req.attributes || req;
    return (r.status || 'nou') === filter;
  });

  const filterTabs = [
    { k: 'all', l: 'Toate', c: counts.all },
    { k: 'nou', l: 'Noi', c: counts.nou },
    { k: 'vazut', l: 'Văzute', c: counts.vazut },
    { k: 'contactat', l: 'Contactate', c: counts.contactat },
    { k: 'respins', l: 'Respinse', c: counts.respins },
  ];

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
        Cereri de adopție {requests.length > 0 && <span style={{ color: 'var(--accent)' }}>({requests.length})</span>}
      </h2>

      {/* Filter tabs */}
      {requests.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {filterTabs.map(t => (
            <button key={t.k} onClick={() => setFilter(t.k)} style={{
              padding: '8px 14px', borderRadius: 'var(--radius-xs)',
              border: filter === t.k ? '2px solid var(--accent)' : '2px solid var(--border)',
              background: filter === t.k ? 'var(--accent-light)' : 'var(--card)',
              color: filter === t.k ? 'var(--accent)' : 'var(--text2)',
              fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)'
            }}>{t.l} ({t.c})</button>
          ))}
        </div>
      )}

      {displayed.length === 0 ? (
        <div style={{ background: 'var(--card)', borderRadius: 'var(--radius)', padding: 48, border: '1px solid var(--border)', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
          <p style={{ color: 'var(--text2)', fontSize: 16, marginBottom: 8 }}>
            {filter === 'all' ? 'Nu ai cereri de adopție momentan.' : 'Nu ai cereri în această categorie.'}
          </p>
          {filter === 'all' && <p style={{ color: 'var(--text3)', fontSize: 14 }}>Când un utilizator trimite o cerere pentru unul din animalele tale, aceasta va apărea aici.</p>}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {displayed.map((req) => {
            const r = req.attributes || req;
            const animalData = r.animal?.data || r.animal;
            const animalName = animalData?.name || animalData?.attributes?.name || 'Animal necunoscut';
            const animalImg = animalData?.images?.[0]?.url || animalData?.attributes?.images?.data?.[0]?.url || null;
            const date = r.createdAt ? new Date(r.createdAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
            const currentStatus = r.status || 'nou';
            const sc = statusColors[currentStatus] || statusColors.nou;

            return (
              <div key={req.id} style={{
                background: 'var(--card)', borderRadius: 'var(--radius-sm)', padding: 20,
                border: '1px solid var(--border)', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start'
              }}>
                {/* Animal info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 200 }}>
                  {animalImg ? (
                    <div style={{ width: 48, height: 48, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                      <img src={animalImg.startsWith('http') ? animalImg : `${API_URL}${animalImg}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ) : (
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🐾</div>
                  )}
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>Pentru: {animalName}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)' }}>{date}</div>
                  </div>
                </div>

                {/* Adopter info */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{r.adopter_name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span>📞 {r.adopter_phone}</span>
                    <span>✉️ {r.adopter_email}</span>
                    <span>📍 {r.adopter_city}</span>
                    {r.housing_type && <span>🏠 {r.housing_type === 'apartament' ? 'Apartament' : 'Casă'}</span>}
                  </div>
                  {r.message && (
                    <div style={{ marginTop: 8, padding: '8px 12px', background: 'var(--surface)', borderRadius: 'var(--radius-xs)', fontSize: 13, color: 'var(--text2)', lineHeight: 1.5, fontStyle: 'italic' }}>
                      "{r.message}"
                    </div>
                  )}
                </div>

                {/* Status selector */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end', minWidth: 140 }}>
                  <select value={currentStatus} onChange={(e) => updateStatus(req, e.target.value)}
                    style={{
                      padding: '6px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                      border: `2px solid ${sc.c}20`, background: sc.bg, color: sc.c, cursor: 'pointer'
                    }}>
                    <option value="nou">Nouă</option>
                    <option value="vazut">Văzută</option>
                    <option value="contactat">Contactat</option>
                    <option value="respins">Respins</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
/* ── Stats Tab Component ── */
function StatsTab({ animals }) {
  if (!animals || animals.length === 0) {
    return (
      <div style={{ background: 'var(--card)', borderRadius: 'var(--radius)', padding: 48, border: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
        <p style={{ color: 'var(--text2)', fontSize: 16 }}>Adaugă animale ca să vezi statistici.</p>
      </div>
    );
  }

  // Totaluri
  const totalViews = animals.reduce((s, a) => s + (a.views || 0), 0);
  const totalPhoneClicks = animals.reduce((s, a) => s + (a.phone_clicks || 0), 0);
  const totalRequests = animals.reduce((s, a) => s + (a.request_count || 0), 0);
  const avgViews = Math.round(totalViews / animals.length);

  // Status breakdown
  const statusCounts = {
    disponibil: animals.filter(a => (a.adoption_status || 'disponibil') === 'disponibil').length,
    rezervat: animals.filter(a => a.adoption_status === 'rezervat').length,
    adoptat: animals.filter(a => a.adoption_status === 'adoptat').length,
    delistat: animals.filter(a => a.adoption_status === 'delistat').length,
  };

  const statusData = [
    { name: 'Disponibil', value: statusCounts.disponibil, color: '#16a34a' },
    { name: 'Rezervat', value: statusCounts.rezervat, color: '#b45309' },
    { name: 'Adoptat', value: statusCounts.adoptat, color: '#2563eb' },
    { name: 'Delistat', value: statusCounts.delistat, color: '#6b7280' },
  ];

  // Top 3 dupa views
  const topViews = [...animals].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3);
  // Top 3 dupa cereri
  const topRequests = [...animals].sort((a, b) => (b.request_count || 0) - (a.request_count || 0)).slice(0, 3);

  const cardStyle = { background: 'var(--card)', borderRadius: 'var(--radius)', padding: 20, border: '1px solid var(--border)' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>Statistici generale</h2>

      {/* Totaluri */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        <div style={{ ...cardStyle, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>👁</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>{totalViews}</div>
          <div style={{ fontSize: 13, color: 'var(--text3)', fontWeight: 600 }}>Vizualizări totale</div>
        </div>
        <div style={{ ...cardStyle, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>📞</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--green)' }}>{totalPhoneClicks}</div>
          <div style={{ fontSize: 13, color: 'var(--text3)', fontWeight: 600 }}>Click telefon</div>
        </div>
        <div style={{ ...cardStyle, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>📋</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--blue)' }}>{totalRequests}</div>
          <div style={{ fontSize: 13, color: 'var(--text3)', fontWeight: 600 }}>Cereri adopție</div>
        </div>
        <div style={{ ...cardStyle, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>📊</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--yellow)' }}>{avgViews}</div>
          <div style={{ fontSize: 13, color: 'var(--text3)', fontWeight: 600 }}>Medie views/animal</div>
        </div>
      </div>

      {/* Grafic statusuri */}
      <div style={cardStyle}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Anunțuri pe status</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 13, fill: 'var(--text2)' }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 13, fill: 'var(--text2)' }} />
            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {statusData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top views + Top requests */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <div style={cardStyle}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🔥 Top profile accesate</h3>
          {topViews.map((a, i) => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < topViews.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{i + 1}</div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{a.name}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>👁 {a.views || 0}</div>
            </div>
          ))}
        </div>
        <div style={cardStyle}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>💛 Top după cereri</h3>
          {topRequests.map((a, i) => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < topRequests.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--blue-light)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{i + 1}</div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{a.name}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--blue)' }}>📋 {a.request_count || 0}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}