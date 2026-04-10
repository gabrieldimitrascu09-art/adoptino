import Link from 'next/link';

export default function ConfidentialitatePage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 60px' }}>
      <h1 style={h1}>Politica de Confidențialitate</h1>
      <p style={updated}>Ultima actualizare: Aprilie 2026</p>

      <p style={p}>Platforma <strong>Adoptino.ro</strong> (&quot;noi&quot;, &quot;Platforma&quot;) respectă confidențialitatea datelor tale personale. Această Politică de Confidențialitate descrie ce date colectăm, de ce le colectăm, cum le folosim și care sunt drepturile tale, în conformitate cu Regulamentul General privind Protecția Datelor (GDPR - Regulamentul UE 2016/679).</p>

      <h2 style={h2}>1. Cine suntem?</h2>
      <p style={p}>Adoptino.ro este o platformă online gratuită, fără scop lucrativ, cu sediul în Iași, România, dedicată facilitării adopțiilor de animale de companie. Contact DPO: <strong><a href="mailto:contact@adoptino.ro" style={{ color: 'var(--accent)' }}>contact@adoptino.ro</a></strong></p>

      <h2 style={h2}>2. Ce date colectăm?</h2>
      <p style={p}><strong>Date furnizate de Asociații:</strong> Numele asociației, CUI/CIF, adresa sediului, numele persoanei de contact, adresa de email, numărul de telefon, parola contului (criptată), descrierea activității, fotografii ale animalelor.</p>
      <p style={p}><strong>Date furnizate de Adoptatori:</strong> Prin formularul de adopție: nume, telefon, email, oraș, tip locuință, mesaj. Prin abonarea la newsletter: adresa de email.</p>
      <p style={p}><strong>Date colectate automat:</strong> Adresa IP (anonimizată), tipul de browser și dispozitiv, pagini vizitate și durata vizitei, sursa traficului.</p>

      <h2 style={h2}>3. De ce colectăm aceste date?</h2>
      <table style={table}>
        <thead>
          <tr><th style={th}>Scop</th><th style={th}>Temei Legal</th></tr>
        </thead>
        <tbody>
          <tr><td style={td}>Afișarea profilurilor asociațiilor și animalelor</td><td style={td}>Executarea unui contract</td></tr>
          <tr><td style={td}>Transmiterea cererilor de adopție către asociații</td><td style={td}>Consimțământ</td></tr>
          <tr><td style={td}>Trimiterea newsletterelor</td><td style={td}>Consimțământ</td></tr>
          <tr><td style={td}>Analiza traficului pentru îmbunătățirea platformei</td><td style={td}>Interes legitim</td></tr>
          <tr><td style={td}>Asigurarea securității IT a site-ului</td><td style={td}>Interes legitim</td></tr>
        </tbody>
      </table>

      <h2 style={h2}>4. Cu cine partajăm datele tale?</h2>
      <p style={p}>Nu vindem și nu închiriem datele tale personale. Folosim servicii terțe de încredere: furnizorul de hosting, servicii de email marketing, procesatori de plăți (Buy Me a Coffee, Revolut) și autorități publice doar dacă există o solicitare legală justificată.</p>

      <h2 style={h2}>5. Cât timp păstrăm datele?</h2>
      <p style={p}><strong>Datele Asociațiilor:</strong> Atât timp cât contul este activ. Dacă un cont este șters, datele vor fi șterse în maxim 30 de zile. <strong>Abonații la Newsletter:</strong> Până la dezabonare. <strong>Date analitice:</strong> Între 14 și 26 de luni.</p>

      <h2 style={h2}>6. Drepturile tale (Conform GDPR)</h2>
      <p style={p}>Ai control total asupra datelor tale personale: dreptul de acces, dreptul la rectificare, dreptul la ștergere (&quot;dreptul de a fi uitat&quot;), dreptul la restricționarea prelucrării, dreptul la portabilitate, dreptul de a-ți retrage consimțământul și dreptul de a depune o plângere la ANSPDCP (dataprotection.ro).</p>
      <p style={p}>Pentru a exercita aceste drepturi: <strong><a href="mailto:contact@adoptino.ro" style={{ color: 'var(--accent)' }}>contact@adoptino.ro</a></strong> — răspundem în maxim 30 de zile.</p>

      <h2 style={h2}>7. Securitatea Datelor</h2>
      <p style={p}>Platforma folosește protocolul <strong>HTTPS/SSL</strong> pentru criptarea datelor. Conturile asociațiilor sunt protejate prin parole criptate nereversibil.</p>

      <h2 style={h2}>8. Cookie-uri</h2>
      <p style={p}>Site-ul utilizează cookie-uri. Pentru detalii, vizitează <Link href="/cookies" style={{ color: 'var(--accent)' }}>Politica de Cookies</Link>.</p>

      <h2 style={h2}>9. Modificări</h2>
      <p style={p}>Ne rezervăm dreptul de a actualiza această politică periodic. Continuarea utilizării platformei reprezintă acceptarea noii Politici de Confidențialitate.</p>
    </div>
  );
}

const h1 = { fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, marginBottom: 24 };
const h2 = { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, margin: '32px 0 16px', color: 'var(--text)' };
const p = { fontSize: 15, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 16 };
const updated = { fontSize: 13, color: 'var(--text3)', marginBottom: 32 };
const table = { width: '100%', borderCollapse: 'collapse', margin: '20px 0' };
const th = { padding: '12px 16px', border: '1px solid var(--border)', textAlign: 'left', fontSize: 14, background: 'var(--surface)', fontWeight: 700, color: 'var(--text)' };
const td = { padding: '12px 16px', border: '1px solid var(--border)', textAlign: 'left', fontSize: 14, color: 'var(--text2)' };