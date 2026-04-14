const IMAGES = {
  dogs: [
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
    'https://images.unsplash.com/photo-1477884213360-7e9d7dcc8f9b?w=600&q=80',
    'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&q=80',
    'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&q=80',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80',
    'https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&q=80',
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80',
    'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&q=80',
  ],
  cats: [
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80',
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=80',
    'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&q=80',
    'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&q=80',
    'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&q=80',
    'https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=600&q=80',
  ],
  others: [
    'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80',
    'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600&q=80',
    'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=600&q=80',
  ],
  assoc: [
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80',
    'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&q=80',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80',
    'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=400&q=80',
    'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=400&q=80',
  ],
  articles: [
    'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&q=80',
    'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80',
    'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&q=80',
    'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&q=80',
    'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&q=80',
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80',
  ],
};

export const DEMO_ASSOCIATIONS = [
  { id: 1, name: 'Asociația Suflete Calde', county: 'Iași', desc: 'Salvăm animale abandonate din zona Moldovei din 2018.', phone: '0745 123 456', email: 'contact@sufletecalde.ro', website: 'sufletecalde.ro', verified: true, animalsCount: 34, adoptedCount: 1400, year: 2018, image: IMAGES.assoc[0] },
  { id: 2, name: 'Lăbuțe Fericite', county: 'Cluj', desc: 'Adopții responsabile cu suport post-adopție de 3 luni.', phone: '0734 567 890', email: 'adoptii@labutefericite.ro', website: 'labutefericite.ro', verified: true, animalsCount: 56, adoptedCount: 980, year: 2017, image: IMAGES.assoc[1] },
  { id: 3, name: 'Prietenii Necuvântătoarelor', county: 'București', desc: 'Peste 1500 adopții reușite în București și împrejurimi.', phone: '0722 345 678', email: 'info@prieteniinec.ro', website: 'prieteniinec.ro', verified: true, animalsCount: 89, adoptedCount: 1500, year: 2015, image: IMAGES.assoc[2] },
  { id: 4, name: 'Adăpost Speranța', county: 'Timiș', desc: '150 animale în grijă permanentă. Sterilizări gratuite în comunitate.', phone: '0756 789 012', email: 'contact@adapostsperanta.ro', website: 'adapostsperanta.ro', verified: true, animalsCount: 67, adoptedCount: 850, year: 2016, image: IMAGES.assoc[3] },
  { id: 5, name: 'Casa Animalelor', county: 'Constanța', desc: 'Salvăm animalele maltratate din zona Dobrogei.', phone: '0767 234 567', email: 'adoptii@casaanimalelor.ro', website: 'casaanimalelor.ro', verified: true, animalsCount: 41, adoptedCount: 620, year: 2019, image: IMAGES.assoc[4] },
];

export const DEMO_ANIMALS = [
  { id: 1, name: 'Rex', species: 'Câine', breed: 'Ciobănesc Carpatin mix', age: '3 ani', size: 'Mare', gender: 'Mascul', county: 'Iași', assocId: 1, images: [IMAGES.dogs[0], IMAGES.dogs[1], IMAGES.dogs[2]], desc: 'Băiat blând și protector, ideal pentru casă cu curte.', sterilized: true, vaccinated: true, goodWithKids: true, goodWithPets: true, goodForApartment: false },
  { id: 2, name: 'Luna', species: 'Pisică', breed: 'Europeană', age: '1 an', size: 'Mică', gender: 'Femelă', county: 'Iași', assocId: 1, images: [IMAGES.cats[0], IMAGES.cats[1], IMAGES.cats[2]], desc: 'Jucăușă și afectuoasă, perfectă pentru apartament.', sterilized: true, vaccinated: true, goodWithKids: true, goodWithPets: true, goodForApartment: true },
  { id: 3, name: 'Bobo', species: 'Câine', breed: 'Bichon mix', age: '6 luni', size: 'Mică', gender: 'Mascul', county: 'Iași', assocId: 1, images: [IMAGES.dogs[3], IMAGES.dogs[4]], desc: 'Pufuleț energic care adoră copiii și jocurile.', sterilized: false, vaccinated: true, goodWithKids: true, goodWithPets: true, goodForApartment: true },
  { id: 4, name: 'Mișu', species: 'Pisică', breed: 'Europeană tigrat', age: '2 ani', size: 'Medie', gender: 'Mascul', county: 'Iași', assocId: 1, images: [IMAGES.cats[3]], desc: 'Independent dar afectuos când vrea.', sterilized: true, vaccinated: true, goodWithKids: false, goodWithPets: false, goodForApartment: true },
  { id: 5, name: 'Bella', species: 'Câine', breed: 'Labrador mix', age: '2 ani', size: 'Mare', gender: 'Femelă', county: 'Cluj', assocId: 2, images: [IMAGES.dogs[5], IMAGES.dogs[6], IMAGES.dogs[7]], desc: 'Prietenoasă cu toată lumea, adoră înotul.', sterilized: true, vaccinated: true, goodWithKids: true, goodWithPets: true, goodForApartment: false },
  { id: 6, name: 'Pufă', species: 'Altele', breed: 'Iepure Berbec Pitic', age: '8 luni', size: 'Mică', gender: 'Femelă', county: 'Cluj', assocId: 2, images: [IMAGES.others[0]], desc: 'Iepuraș docil și blând, ideal pentru familii cu copii.', sterilized: true, vaccinated: true, goodWithKids: true, goodWithPets: false, goodForApartment: true },
];

export const DEMO_ARTICLES = [
  {
    id: 1, tag: { ro: 'Mituri', en: 'Myths' }, image: IMAGES.articles[0], date: '8 Apr 2026', readTime: { ro: '5 min', en: '5 min' },
    title: { ro: '5 mituri false despre câinii și pisicile din adăposturi', en: '5 false myths about shelter dogs and cats' },
    excerpt: { ro: 'Descoperă adevărul din spatele celor mai comune prejudecăți despre animalele din adăposturi.', en: 'Discover the truth behind the most common misconceptions about shelter animals.' },
    content: {
      ro: '<p>Când te gândești la adopția unui animal, este posibil să te lovești de prejudecăți. Adevărul este că animalele salvate sunt printre cei mai loiali parteneri.</p><h3>1. „Sunt în adăpost pentru că au probleme de comportament"</h3><p><strong>Fals.</strong> Majoritatea ajung din motive care nu țin de ele: mutarea stăpânilor, probleme financiare sau abandonul puilor nedoriți.</p><h3>2. „Nu poți învăța un câine adult trucuri noi"</h3><p><strong>Fals.</strong> Animalele adulte au o capacitate excelentă de concentrare, adesea mult peste cea a unui pui energic.</p><h3>3. „Animalele salvate sunt mereu bolnave"</h3><p><strong>Fals.</strong> Asociațiile investesc enorm în sănătate. Animalele sunt deparazitate, vaccinate și sterilizate înainte de adopție.</p><h3>4. „Nu știi ce personalitate vei primi"</h3><p><strong>Fals.</strong> Voluntarii își cunosc foarte bine animalele și îți pot spune exact dacă un câine este activ sau leneș.</p><h3>5. „Animalele de rasă sunt mai bune"</h3><p><strong>Fals.</strong> Animalele metis sunt adesea mult mai rezistente la boli ereditare datorită diversității genetice. Iubirea nu are pedigree!</p>',
      en: '<p>When thinking about adopting an animal, you might encounter prejudices. The truth is that rescued animals are among the most loyal partners.</p><h3>1. "They\'re in shelters because they have behavioral problems"</h3><p><strong>False.</strong> Most end up there for reasons beyond their control: owners moving, financial problems, or unwanted litters.</p><h3>2. "You can\'t teach an adult dog new tricks"</h3><p><strong>False.</strong> Adult animals have excellent concentration, often far beyond that of an energetic puppy.</p><h3>3. "Rescued animals are always sick"</h3><p><strong>False.</strong> Associations invest heavily in health. Animals are dewormed, vaccinated, and sterilized before adoption.</p><h3>4. "You don\'t know what personality you\'ll get"</h3><p><strong>False.</strong> Volunteers know their animals very well and can tell you exactly if a dog is active or lazy.</p><h3>5. "Purebred animals are better"</h3><p><strong>False.</strong> Mixed-breed animals are often much more resistant to hereditary diseases due to genetic diversity. Love has no pedigree!</p>'
    }
  },
  {
    id: 2, tag: { ro: 'Sfat', en: 'Tip' }, image: IMAGES.articles[1], date: '5 Apr 2026', readTime: { ro: '5 min', en: '5 min' },
    title: { ro: 'Adoptă un senior: De ce animalele în vârstă sunt partenerii perfecți', en: 'Adopt a senior: Why older animals make perfect companions' },
    excerpt: { ro: 'Află de ce animalele în vârstă sunt partenerii perfecți pentru apartament și oameni ocupați.', en: 'Find out why older animals are perfect partners for apartments and busy people.' },
    content: {
      ro: '<p>Animalele senior (peste 7 ani) sunt adesea trecute cu vederea, deși sunt în multe cazuri cea mai bună alegere.</p><h3>Ce vezi, aia primești</h3><p>Talia, greutatea și personalitatea sunt deja formate. Știi exact ce iei acasă.</p><h3>Nivel de energie adaptat</h3><p>Câinii bătrâni sunt perfecți pentru viața la apartament. Se bucură de plimbări scurte și relaxate.</p><h3>Au deja bunele maniere</h3><p>Sunt deja obișnuite cu regulile casei, nu mai rod mobilă și știu să meargă în lesă.</p><h3>Recunoștința lor este profundă</h3><p>Un animal salvat la bătrânețe îți va oferi o loialitate absolută.</p>',
      en: '<p>Senior animals (over 7 years) are often overlooked, yet they are in many cases the best choice.</p><h3>What you see is what you get</h3><p>Size, weight, and personality are already formed. You know exactly what you\'re bringing home.</p><h3>Adapted energy level</h3><p>Older dogs are perfect for apartment living. They enjoy short, relaxed walks.</p><h3>Already well-mannered</h3><p>They\'re already used to house rules, don\'t chew furniture, and know how to walk on a leash.</p><h3>Their gratitude runs deep</h3><p>An animal rescued in old age will give you absolute loyalty.</p>'
    }
  },
  {
    id: 3, tag: { ro: 'Ghid', en: 'Guide' }, image: IMAGES.articles[2], date: '2 Apr 2026', readTime: { ro: '6 min', en: '6 min' },
    title: { ro: 'Cum să îți pregătești casa pentru sosirea noului blănos', en: 'How to prepare your home for your new furry friend' },
    excerpt: { ro: 'Lista de cumpărături, măsuri de siguranță și sfaturi pentru pregătirea locuinței.', en: 'Shopping list, safety measures, and tips for preparing your home.' },
    content: {
      ro: '<p>Felicitări, cererea ta de adopție a fost acceptată! Înainte să îți aduci noul prieten acasă, trebuie să te asiguri că mediul este primitor și sigur.</p><h3>Pentru Câini</h3><p>Amenajează-i un culcuș moale într-un colț liniștit. Kitul de bază: boluri, zgardă/ham, lesă și jucării de ros. Ascunde cablurile și substanțele periculoase.</p><h3>Pentru Pisici</h3><p>Plase la geamuri sunt obligatorii. Litiera într-un loc ferit, zgârietor și ascunzători la înălțime.</p><h3>Regula de aur: Fără grabă!</h3><p>Cumpără exact tipul de hrană cu care animalul a fost obișnuit și stabilește un program clar.</p>',
      en: '<p>Congratulations, your adoption request has been accepted! Before bringing your new friend home, make sure the environment is welcoming and safe.</p><h3>For Dogs</h3><p>Set up a soft bed in a quiet corner. Basic kit: bowls, collar/harness, leash, and chew toys. Hide cables and dangerous substances.</p><h3>For Cats</h3><p>Window nets are mandatory. Litter box in a private spot, scratching post and high hiding spots.</p><h3>Golden rule: No rush!</h3><p>Buy the exact type of food the animal was used to and establish a clear schedule.</p>'
    }
  },
  {
    id: 4, tag: { ro: 'Ghid', en: 'Guide' }, image: IMAGES.articles[3], date: '30 Mar 2026', readTime: { ro: '5 min', en: '5 min' },
    title: { ro: 'Primele 7 zile acasă: Cum ajuți un animal salvat să se acomodeze', en: 'First 7 days home: How to help a rescued animal adjust' },
    excerpt: { ro: 'Descoperă regula 3-3-3 și sfaturi practice pentru primele zile.', en: 'Discover the 3-3-3 rule and practical tips for the first days.' },
    content: {
      ro: '<p>Aducerea unui animal dintr-un adăpost în casa ta este o schimbare masivă pentru el.</p><h3>Regula 3-3-3</h3><p><strong>3 Zile:</strong> Se va simți copleșit, speriat, poate refuza mâncarea.</p><p><strong>3 Săptămâni:</strong> Începe să se relaxeze și își arată adevărata personalitate.</p><p><strong>3 Luni:</strong> Se simte complet acasă.</p><h3>Primele zile (1-3)</h3><p>Fii calm. Lasă animalul să exploreze în ritmul lui. Nu forța interacțiunea.</p><h3>Stabilirea rutinei (4-7)</h3><p>Hrănește-l la aceleași ore. Folosește exclusiv recompense pozitive.</p>',
      en: '<p>Bringing an animal from a shelter into your home is a massive change for them.</p><h3>The 3-3-3 Rule</h3><p><strong>3 Days:</strong> They\'ll feel overwhelmed, scared, may refuse food.</p><p><strong>3 Weeks:</strong> They start to relax and show their true personality.</p><p><strong>3 Months:</strong> They feel completely at home.</p><h3>First days (1-3)</h3><p>Stay calm. Let the animal explore at their own pace. Don\'t force interaction.</p><h3>Establishing routine (4-7)</h3><p>Feed at the same times. Use only positive reinforcement.</p>'
    }
  },
  {
    id: 5, tag: { ro: 'Educație', en: 'Education' }, image: IMAGES.articles[4], date: '27 Mar 2026', readTime: { ro: '6 min', en: '6 min' },
    title: { ro: 'Cum funcționează procesul de adopție în România?', en: 'How does the adoption process work in Romania?' },
    excerpt: { ro: 'Pașii procesului de adopție, de la completarea chestionarului până la semnarea contractului.', en: 'Steps of the adoption process, from filling out the questionnaire to signing the contract.' },
    content: {
      ro: '<p>ONG-urile au salvat acele animale și vor să se asigure că nu vor mai fi abandonate niciodată.</p><h3>1. Chestionarul de pre-adopție</h3><p>Un instrument de matchmaking, nu un examen.</p><h3>2. Discuția telefonică</h3><p>Un dialog deschis unde poți pune întrebări despre istoricul animalului.</p><h3>3. Vizita la domiciliu</h3><p>Voluntarii verifică că mediul este sigur.</p><h3>4. Contractul de Adopție</h3><p>Document legal prin care te angajezi să oferi asistență veterinară și hrană adecvată.</p>',
      en: '<p>NGOs have rescued these animals and want to make sure they\'ll never be abandoned again.</p><h3>1. Pre-adoption questionnaire</h3><p>A matchmaking tool, not an exam.</p><h3>2. Phone interview</h3><p>An open dialogue where you can ask questions about the animal\'s history.</p><h3>3. Home visit</h3><p>Volunteers verify the environment is safe.</p><h3>4. Adoption Contract</h3><p>A legal document committing you to provide veterinary care and proper nutrition.</p>'
    }
  },
  {
    id: 6, tag: { ro: 'Sfat', en: 'Tip' }, image: IMAGES.articles[5], date: '24 Mar 2026', readTime: { ro: '6 min', en: '6 min' },
    title: { ro: 'Cum să introduci noul animal copiilor sau altor animale din casă', en: 'How to introduce the new animal to children or other pets' },
    excerpt: { ro: 'Sfaturi esențiale pentru o conviețuire armonioasă.', en: 'Essential tips for harmonious cohabitation.' },
    content: {
      ro: '<p>Prima impresie contează enorm! Introducerea trebuie făcută treptat, cu calm și control.</p><h3>Introducerea copiilor</h3><p>Educă copilul înainte. Stabilește reguli: nu tragem de urechi, nu deranjăm animalul când mănâncă sau doarme.</p><h3>Între doi câini</h3><p>Întâlnire pe teren neutru. Plimbare în paralel, cu distanță sigură.</p><h3>Câine - pisică / pisică - pisică</h3><p>Izolare vizuală în primele zile. Schimb de mirosuri. Contact controlat treptat.</p>',
      en: '<p>First impressions matter enormously! Introduction must be done gradually, with calm and control.</p><h3>Introducing to children</h3><p>Educate the child beforehand. Set rules: no pulling ears, don\'t disturb the animal when eating or sleeping.</p><h3>Between two dogs</h3><p>Meet on neutral ground. Walk in parallel, with safe distance.</p><h3>Dog - cat / cat - cat</h3><p>Visual isolation for the first days. Scent swapping. Gradual controlled contact.</p>'
    }
  },
  {
    id: 7, tag: { ro: 'Legislație', en: 'Legislation' }, image: IMAGES.dogs[6], date: '20 Mar 2026', readTime: { ro: '7 min', en: '7 min' },
    title: { ro: 'Drepturile animalelor în România', en: 'Animal rights in Romania' },
    excerpt: { ro: 'Ce spune Legea 205/2004 și cum poți acționa când ești martor la abuz.', en: 'What Law 205/2004 says and how to act when witnessing abuse.' },
    content: {
      ro: '<p>Legea 205/2004 interzice maltratarea și abandonul. Dacă ești martor la abuz, sună la 112 sau contactează Poliția Locală.</p><p>Pedepsele variază de la amenzi până la închisoare. Abandonul este considerat infracțiune.</p>',
      en: '<p>Law 205/2004 prohibits mistreatment and abandonment. If you witness abuse, call 112 or contact the Local Police.</p><p>Penalties range from fines to imprisonment. Abandonment is considered a criminal offense.</p>'
    }
  },
  {
    id: 8, tag: { ro: 'Educație', en: 'Education' }, image: IMAGES.cats[4], date: '15 Mar 2026', readTime: { ro: '6 min', en: '6 min' },
    title: { ro: 'De ce sterilizarea este importantă', en: 'Why sterilization is important' },
    excerpt: { ro: 'Beneficii pentru sănătate, mituri demontate și opțiuni gratuite în România.', en: 'Health benefits, debunked myths, and free options in Romania.' },
    content: {
      ro: '<p>Sterilizarea reduce semnificativ riscul de cancer. Contrar miturilor, nu schimbă personalitatea animalului.</p><p>Multe asociații oferă sterilizări gratuite. Un câine sterilizat trăiește în medie cu 1-3 ani mai mult.</p>',
      en: '<p>Sterilization significantly reduces the risk of cancer. Contrary to myths, it doesn\'t change the animal\'s personality.</p><p>Many associations offer free sterilizations. A sterilized dog lives on average 1-3 years longer.</p>'
    }
  },
  {
    id: 9, tag: { ro: 'Sfat', en: 'Tip' }, image: IMAGES.cats[0], date: '10 Mar 2026', readTime: { ro: '5 min', en: '5 min' },
    title: { ro: 'Alimentația corectă pentru pisici', en: 'Proper nutrition for cats' },
    excerpt: { ro: 'Ce să dai și ce să eviți în dieta pisicii tale.', en: 'What to feed and what to avoid in your cat\'s diet.' },
    content: {
      ro: '<p>Combină hrana umedă cu cea uscată de calitate. Asigură acces permanent la apă proaspătă.</p><p>Evită laptele de vacă, ciocolata, ceapa, usturoiul și strugurii — sunt toxice pentru pisici.</p><p>Alege hrană cu conținut ridicat de proteină animală (minim 30%). Consultă veterinarul.</p>',
      en: '<p>Combine quality wet and dry food. Ensure permanent access to fresh water.</p><p>Avoid cow\'s milk, chocolate, onion, garlic, and grapes — they are toxic for cats.</p><p>Choose food with high animal protein content (minimum 30%). Consult your vet.</p>'
    }
  },
];

export const DEMO_FAQ = [
  { q: { ro: 'Cât costă adopția?', en: 'How much does adoption cost?' }, a: { ro: 'Adopția prin platformă este gratuită. Unele asociații pot solicita o taxă simbolică care acoperă vaccinarea și sterilizarea.', en: 'Adoption through the platform is free. Some associations may charge a symbolic fee covering vaccination and sterilization.' } },
  { q: { ro: 'Ce documente am nevoie pentru adopție?', en: 'What documents do I need for adoption?' }, a: { ro: 'De obicei, asociațiile cer buletin și semnarea unui contract de adopție.', en: 'Usually, associations require an ID and signing an adoption contract.' } },
  { q: { ro: 'Animalele sunt sănătoase?', en: 'Are the animals healthy?' }, a: { ro: 'Da, animalele de la asociațiile partenere sunt consultate veterinar, vaccinate și sterilizate.', en: 'Yes, animals from partner associations are vet-checked, vaccinated, and sterilized.' } },
  { q: { ro: 'Pot returna animalul dacă nu merge?', en: 'Can I return the animal if it doesn\'t work out?' }, a: { ro: 'Da, asociațiile preferă să primească animalul înapoi decât să fie abandonat.', en: 'Yes, associations prefer to take the animal back rather than have it abandoned.' } },
  { q: { ro: 'Adopția este disponibilă în tot județul?', en: 'Is adoption available throughout the county?' }, a: { ro: 'Da, majoritatea asociațiilor livrează în tot județul, iar unele oferă transport național.', en: 'Yes, most associations deliver throughout the county, and some offer national transport.' } },
  { q: { ro: 'Cum știu dacă un animal e potrivit pentru mine?', en: 'How do I know if an animal is right for me?' }, a: { ro: 'Filtrele de pe platformă te ajută. Plus, poți vorbi direct cu asociația pentru sfaturi.', en: 'The platform filters help. Plus, you can talk directly to the association for advice.' } },
];

export const COUNTIES = ['București','Alba','Arad','Argeș','Bacău','Bihor','Bistrița-Năsăud','Botoșani','Brașov','Brăila','Buzău','Caraș-Severin','Călărași','Cluj','Constanța','Covasna','Dâmbovița','Dolj','Galați','Giurgiu','Gorj','Harghita','Hunedoara','Ialomița','Iași','Ilfov','Maramureș','Mehedinți','Mureș','Neamț','Olt','Prahova','Satu Mare','Sălaj','Sibiu','Suceava','Teleorman','Timiș','Tulcea','Vaslui','Vâlcea','Vrancea'];