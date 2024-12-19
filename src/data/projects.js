// src/data/projects.js
export const projects = [
  {
    id: 1,
    title: "Modern Dağ Evi",
    description: "Doğal yaşamla modern konforu birleştiren lüks villa projesi",
    fullDescription: `Modern Dağ Evi projesi, doğal yaşamla modern konforu birleştiren özel bir tasarımdır. Yerel malzemeler ve çağdaş mimari anlayışı bir araya getirerek, doğayla uyumlu yaşam alanları oluşturduk. Geniş pencereler ve açık yaşam alanları, dağ manzarasını evin her noktasından görünür kılıyor.

    Projede sürdürülebilir malzemeler kullanılarak, enerji verimliliği ön planda tutuldu. Ahşap ve taş gibi doğal malzemelerin modern yapı teknikleriyle birleşimi, hem estetik hem de fonksiyonel bir yaşam alanı ortaya çıkardı.`,
    image: "/images/projects/project1.jpg",
    detailImages: [
      "/images/projects/project1-detail1.jpg",
      "/images/projects/project1-detail2.jpg",
      "/images/projects/project1-detail3.jpg"
    ],
    category: "mimari",
    location: "Bolu, Türkiye",
    year: "2023",
    area: "450",
    nextProject: {
      id: 2,
      title: "Ekolojik Yaşam Merkezi"
    }
  },
  {
    id: 2,
    title: "Ekolojik Yaşam Merkezi",
    description: "Sürdürülebilir malzemeler kullanılarak tasarlanan topluluk yaşam alanı",
    fullDescription: `Ekolojik Yaşam Merkezi, sürdürülebilir yaşam prensiplerini modern tasarımla buluşturan yenilikçi bir projedir. Topluluk yaşamını destekleyen ortak alanlar, organik tarım bahçeleri ve yenilenebilir enerji sistemleri ile tam bir eko-yaşam deneyimi sunuyor.

    Proje kapsamında, yeşil çatılar, yağmur suyu toplama sistemleri ve güneş enerjisi panelleri gibi sürdürülebilir çözümler entegre edildi. Peyzaj tasarımında yerel bitki örtüsü kullanılarak, doğal habitat korundu.`,
    image: "/images/projects/project2.jpg",
    detailImages: [
      "/images/projects/project2-detail1.jpg",
      "/images/projects/project2-detail2.jpg",
      "/images/projects/project2-detail3.jpg"
    ],
    category: "peyzaj",
    location: "Fethiye, Muğla",
    year: "2023",
    area: "2800",
    nextProject: {
      id: 3,
      title: "Sahil Rezidansı"
    }
  },
  {
    id: 3,
    title: "Sahil Rezidansı",
    description: "Deniz manzaralı, ahşap detaylarla bezeli modern yaşam kompleksi",
    fullDescription: `Sahil Rezidansı projesi, deniz manzarasını maksimum düzeyde değerlendiren, lüks yaşam standartlarını doğal malzemelerle buluşturan özel bir tasarımdır. Geniş teraslar ve tam boy pencereler, iç mekanı dış mekanla bütünleştiriyor.

    İç mimari tasarımda kullanılan ahşap detaylar ve doğal dokular, modern çizgilerle harmonik bir şekilde bir araya getirildi. Her daire, özgün tasarım detaylarıyla kişiselleştirildi.`,
    image: "/images/projects/project3.jpg",
    detailImages: [
      "/images/projects/project3-detail1.jpg",
      "/images/projects/project3-detail2.jpg",
      "/images/projects/project3-detail3.jpg"
    ],
    category: "ic-mimari",
    location: "Bodrum, Muğla",
    year: "2024",
    area: "1200",
    nextProject: {
      id: 4,
      title: "Orman Evi"
    }
  },
  {
    id: 4,
    title: "Orman Evi",
    description: "Doğayla iç içe, minimal tasarım anlayışıyla oluşturulan villa",
    fullDescription: `Orman Evi projesi, doğal yaşamın içinde minimal bir yaşam alanı sunan özel bir villa tasarımıdır. Çevredeki ağaçlar ve doğal yapı korunarak, mevcut dokunun içine zarif bir şekilde yerleştirildi.

    Minimalist tasarım yaklaşımı, doğal malzemelerle birleştirilerek sade ama etkileyici bir görünüm elde edildi. Büyük pencereler ve açık plan yerleşimi, iç mekanı ormanla bütünleştiriyor.`,
    image: "/images/projects/project4.jpg",
    detailImages: [
      "/images/projects/project4-detail1.jpg",
      "/images/projects/project4-detail2.jpg",
      "/images/projects/project4-detail3.jpg"
    ],
    category: "mimari",
    location: "Sapanca, Sakarya",
    year: "2024",
    area: "380",
    nextProject: {
      id: 1,
      title: "Modern Dağ Evi"
    }
  }
];

export const categories = {
  mimari: 'Mimari Projeler',
  'ic-mimari': 'İç Mimari Projeler',
  peyzaj: 'Peyzaj Projeleri'
};