import Link from 'next/link';

export default function CookiesPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 60px' }}>
      <h1 style={h1}>Politica de utilizare a Cookie-urilor</h1>
      <p style={updated}>Ultima actualizare: Aprilie 2026</p>

      <p style={p}>Această politică explică modul în care platforma <strong>Adoptino.ro</strong> utilizează modulele cookie și tehnologiile similare.</p>

      <h2 style={h2}>1. Ce sunt cookie-urile?</h2>
      <p style={p}>Un &quot;cookie&quot; este un fișier text de mici dimensiuni pe care un site web îl salvează pe dispozitivul dumneavoastră atunci când îl vizitați. Cookie-urile <strong>nu sunt viruși</strong>, nu pot citi alte date de pe dispozitiv și nu pot rula programe.</p>

      <h2 style={h2}>2. De ce folosim cookie-uri?</h2>
      <p style={p}>Folosim cookie-uri pentru a asigura funcționarea tehnică a platformei, a ține minte preferințele (ex. limba selectată), a înțelege cum interacționează vizitatorii cu platforma și a menține site-ul sigur.</p>

      <h2 style={h2}>3. Tipuri de cookie-uri</h2>
      <table style={table}>
        <thead>
          <tr><th style={th}>Categorie</th><th style={th}>Descriere</th><th style={th}>Opțiune</th></tr>
        </thead>
        <tbody>
          <tr><td style={td}><strong>Strict Necesare</strong></td><td style={td}>Esențiale pentru funcționarea site-ului (autentificare, preferințe cookie banner).</td><td style={td}><strong>Obligatorii</strong></td></tr>
          <tr><td style={td}><strong>Funcționale</strong></td><td style={td}>Rețin alegerile (limba RO/EN). Fără ele, setările se pierd la fiecare vizită.</td><td style={td}>Pot fi dezactivate</td></tr>
          <tr><td style={td}><strong>Analitice</strong></td><td style={td}>Ne ajută să înțelegem cum folosesc vizitatorii site-ul. Date complet anonimizate.</td><td style={td}>Pot fi dezactivate</td></tr>
          <tr><td style={td}><strong>Marketing / Terțe părți</strong></td><td style={td}>Nu rulăm reclame. Funcționalități terțe (butoane Share, platforme donații) pot seta propriile cookie-uri.</td><td style={td}>Pot fi dezactivate</td></tr>
        </tbody>
      </table>

      <h2 style={h2}>4. Cât timp sunt păstrate?</h2>
      <p style={p}><strong>Cookie-uri de sesiune:</strong> Șterse automat la închiderea browserului. <strong>Cookie-uri persistente:</strong> Rămân pe dispozitiv până expiră sau le ștergeți manual.</p>

      <h2 style={h2}>5. Cookie-uri de la terți</h2>
      <p style={p}>Pe anumite pagini, pot fi setate cookie-uri de procesatori de plăți (Buy Me a Coffee, Revolut) și rețele sociale (Facebook, WhatsApp). <em>Adoptino.ro nu are control asupra acestor cookie-uri terțe.</em></p>

      <h2 style={h2}>6. Cum poți controla cookie-urile?</h2>
      <h3 style={h3}>A. Prin Cookie Banner</h3>
      <p style={p}>La prima vizită pe Adoptino.ro, vă va fi afișat un banner prin care vă puteți da consimțământul pentru anumite categorii de cookie-uri.</p>
      <h3 style={h3}>B. Prin Setările Browserului</h3>
      <p style={p}><strong>Chrome:</strong> Setări → Confidențialitate și securitate → Cookie-uri. <strong>Firefox:</strong> Opțiuni → Confidențialitate și securitate. <strong>Safari:</strong> Preferințe → Confidențialitate. <strong>Edge:</strong> Setări → Confidențialitate, căutare și servicii.</p>
      <p style={p}><em>Notă: Blocarea cookie-urilor strict necesare poate afecta funcționarea secțiunii de autentificare pentru Asociații.</em></p>

      <h2 style={h2}>7. Contact</h2>
      <p style={p}>Pentru întrebări: <strong><a href="mailto:contact@adoptino.ro" style={{ color: 'var(--accent)' }}>contact@adoptino.ro</a></strong></p>
      <p style={p}><em>Pentru detalii despre prelucrarea datelor personale, vizitați <Link href="/confidentialitate" style={{ color: 'var(--accent)' }}>Politica de Confidențialitate</Link>.</em></p>
    </div>
  );
}

const h1 = { fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, marginBottom: 24 };
const h2 = { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, margin: '32px 0 16px', color: 'var(--text)' };
const h3 = { fontSize: 18, fontWeight: 700, margin: '24px 0 12px', color: 'var(--text)' };
const p = { fontSize: 15, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 16 };
const updated = { fontSize: 13, color: 'var(--text3)', marginBottom: 32 };
const table = { width: '100%', borderCollapse: 'collapse', margin: '20px 0' };
const th = { padding: '12px 16px', border: '1px solid var(--border)', textAlign: 'left', fontSize: 14, background: 'var(--surface)', fontWeight: 700, color: 'var(--text)' };
const td = { padding: '12px 16px', border: '1px solid var(--border)', textAlign: 'left', fontSize: 14, color: 'var(--text2)' };