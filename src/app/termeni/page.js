export default function TermeniPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 60px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, marginBottom: 24 }}>Termeni și Condiții de Utilizare</h1>
      <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 32 }}>Ultima actualizare: Aprilie 2026</p>

      <p style={p}>Bine ai venit pe <strong>Adoptino.ro</strong> (&quot;Platforma&quot;, &quot;Site-ul&quot;, &quot;noi&quot;). Adoptino.ro este o platformă online gratuită, fără scop lucrativ, dedicată facilitării procesului de adopție a animalelor de companie din România. Prin accesarea și utilizarea acestui site, ești de acord cu următorii Termeni și Condiții. Dacă nu ești de acord cu acești termeni, te rugăm să nu utilizezi platforma.</p>

      <h2 style={h2}>1. Despre Platformă</h2>
      <p style={p}>Adoptino.ro funcționează ca un intermediar digital, o &quot;vitrină&quot; care conectează Asociațiile de Protecție a Animalelor (&quot;Asociațiile&quot;) cu persoanele interesate de adopție (&quot;Adoptatorii&quot;). Platforma afișează profilurile animalelor disponibile pentru adopție, informații despre asociațiile partenere, articole educative și resurse utile. Adoptino.ro <strong>nu este proprietarul, deținătorul sau custodele animalelor</strong> listate pe platformă.</p>

      <h2 style={h2}>2. Rolul Adoptino.ro</h2>
      <p style={p}>Adoptino.ro nu vinde și nu intermediază vânzarea de animale. Platforma nu este parte în contractul de adopție dintre Asociație și Adoptator. Rolul nostru se limitează la oferirea unui spațiu digital gratuit în care asociațiile verificate pot lista animalele disponibile, iar potențialii adoptatori pot căuta și contacta aceste asociații.</p>

      <h2 style={h2}>3. Utilizatorii Platformei</h2>
      <p style={p}><strong>Vizitatorii</strong> pot naviga pe site, căuta animale disponibile, citi articolele și accesa informațiile publice fără a fi nevoie de un cont. <strong>Asociațiile</strong> sunt organizații non-guvernamentale sau asociații de protecție a animalelor, legal înregistrate în România, care se pot înregistra pe platformă pentru a lista animale disponibile spre adopție.</p>

      <h2 style={h2}>4. Înregistrarea Asociațiilor</h2>
      <p style={p}>Pentru a lista animale pe Adoptino.ro, o Asociație trebuie să creeze un cont și să furnizeze informații reale și verificabile (nume, CUI/CIF, adresă, persoană de contact, date de contact). Adoptino.ro își rezervă dreptul de a verifica informațiile furnizate și de a aproba sau respinge orice cerere de înregistrare. Publicarea de informații false, înșelătoare sau incomplete poate duce la suspendarea sau ștergerea contului fără preaviz.</p>

      <h2 style={h2}>5. Conținutul Postat de Asociații</h2>
      <p style={p}>Asociațiile sunt pe deplin responsabile pentru acuratețea și actualitatea informațiilor pe care le publică pe platformă (fotografii, descrieri, starea de sănătate a animalelor etc.). Adoptino.ro nu garantează exactitatea informațiilor furnizate de Asociații.</p>

      <h2 style={h2}>6. Procesul de Adopție</h2>
      <p style={p}>Procesul efectiv de adopție (verificarea adoptatorului, semnarea contractului, predarea animalului) se desfășoară exclusiv între Asociație și Adoptator. Adoptino.ro nu este responsabil pentru derularea, succesul sau eșecul niciunui proces de adopție.</p>

      <h2 style={h2}>7. Responsabilitatea Utilizatorilor</h2>
      <p style={p}>Utilizatorii se angajează să utilizeze platforma cu bună-credință, să nu publice conținut ofensator, ilegal sau fals, să nu utilizeze platforma în scopuri comerciale neautorizate și să respecte legislația românească în vigoare privind protecția animalelor.</p>

      <h2 style={h2}>8. Donații</h2>
      <p style={p}>Adoptino.ro poate accepta donații voluntare prin intermediul platformelor terțe (Buy Me a Coffee, Revolut). Aceste donații sunt utilizate exclusiv pentru acoperirea costurilor de mentenanță, hosting și dezvoltare a platformei. Donațiile nu sunt rambursabile.</p>

      <h2 style={h2}>9. Proprietate Intelectuală</h2>
      <p style={p}>Designul, logo-ul, textele originale și structura site-ului Adoptino.ro sunt proprietatea platformei. Conținutul postat de Asociații (fotografii, descrieri ale animalelor) rămâne proprietatea intelectuală a acestora.</p>

      <h2 style={h2}>10. Limitarea Răspunderii</h2>
      <p style={p}>Adoptino.ro este oferit &quot;ca atare&quot; (as is). Nu garantăm funcționarea neîntreruptă a platformei. Nu suntem responsabili pentru eventualele daune directe sau indirecte rezultate din utilizarea platformei, din interacțiunea dintre Asociații și Adoptatori, sau din comportamentul oricărui animal adoptat prin intermediul platformei.</p>

      <h2 style={h2}>11. Modificări ale Termenilor</h2>
      <p style={p}>Ne rezervăm dreptul de a modifica acești Termeni și Condiții în orice moment. Modificările vor fi publicate pe această pagină cu data ultimei actualizări.</p>

      <h2 style={h2}>12. Contact</h2>
      <p style={p}>Pentru orice întrebări legate de acești Termeni și Condiții, ne poți contacta la: <strong><a href="mailto:contact@adoptino.ro" style={{ color: 'var(--accent)' }}>contact@adoptino.ro</a></strong></p>
    </div>
  );
}

const h2 = { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, margin: '32px 0 16px', color: 'var(--text)' };
const p = { fontSize: 15, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 16 };