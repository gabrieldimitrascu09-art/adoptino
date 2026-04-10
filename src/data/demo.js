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
  { id: 4, name: 'Adăpost Speranța', county: 'Timiș', desc: '150 animale în grijă. Sterilizări gratuite în comunitate.', phone: '0756 789 012', email: 'contact@adapostsperanta.ro', website: 'adapostsperanta.ro', verified: true, animalsCount: 67, adoptedCount: 850, year: 2016, image: IMAGES.assoc[3] },
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
  { id: 1, tag: 'Ghid', title: 'Ce trebuie să știi înainte de a adopta', image: IMAGES.articles[0], excerpt: 'Pregătiri esențiale, primele zile acasă și vizita la veterinar.', date: '28 Mar 2026', readTime: '5 min' },
  { id: 2, tag: 'Educație', title: 'De ce sterilizarea este importantă', image: IMAGES.articles[2], excerpt: 'Beneficii pentru sănătate, mituri demontate și opțiuni gratuite.', date: '25 Mar 2026', readTime: '6 min' },
  { id: 3, tag: 'Sfat', title: '5 semne că pisica ta este fericită', image: IMAGES.articles[3], excerpt: 'Învață să citești limbajul corporal al pisicii tale.', date: '22 Mar 2026', readTime: '3 min' },
];

export const DEMO_FAQ = [
  { q: 'Cât costă adopția?', a: 'Adopția prin platformă este gratuită. Unele asociații pot solicita o taxă simbolică care acoperă vaccinarea și sterilizarea.' },
  { q: 'Ce documente am nevoie pentru adopție?', a: 'De obicei, asociațiile cer buletin și semnarea unui contract de adopție.' },
  { q: 'Animalele sunt sănătoase?', a: 'Da, animalele de la asociațiile partenere sunt consultate veterinar, vaccinate și sterilizate.' },
  { q: 'Pot returna animalul dacă nu merge?', a: 'Da, asociațiile preferă să primească animalul înapoi decât să fie abandonat.' },
  { q: 'Adopția este disponibilă în tot județul?', a: 'Da, majoritatea asociațiilor livrează în tot județul, iar unele oferă transport național.' },
  { q: 'Cum știu dacă un animal e potrivit pentru mine?', a: 'Filtrele de pe platformă te ajută. Plus, poți vorbi direct cu asociația pentru sfaturi.' },
];

export const COUNTIES = ['București','Alba','Arad','Argeș','Bacău','Bihor','Bistrița-Năsăud','Botoșani','Brașov','Brăila','Buzău','Caraș-Severin','Călărași','Cluj','Constanța','Covasna','Dâmbovița','Dolj','Galați','Giurgiu','Gorj','Harghita','Hunedoara','Ialomița','Iași','Ilfov','Maramureș','Mehedinți','Mureș','Neamț','Olt','Prahova','Satu Mare','Sălaj','Sibiu','Suceava','Teleorman','Timiș','Tulcea','Vaslui','Vâlcea','Vrancea'];