'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, PaintBucket, Trees } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

const services = [
  {
    icon: <Building2 size={28} className="text-gray-700" />,
    title: "Mimari Projeler",
    description: "Modern çizgiler ve sürdürülebilir yaklaşımlarla projelerinizi hayata geçiriyoruz. Her detayı özenle planlıyor, yaşanabilir mekanlar tasarlıyoruz.",
    features: ["Konsept Tasarım", "3D Modelleme", "Teknik Çizimler"],
    link: "/projects",
    category: "mimari"
  },
  {
    icon: <PaintBucket size={28} className="text-gray-700" />,
    title: "İç Mimari Projeler",
    description: "Fonksiyonellik ve estetiği bir araya getirerek, yaşam alanlarınızı kişiselleştiriyoruz. Her mekanın potansiyelini maksimuma çıkarıyoruz.",
    features: ["Mekan Tasarımı", "Mobilya Seçimi", "Aydınlatma Planı"],
    link: "/projects",
    category: "ic-mimari"
  },
  {
    icon: <Building2 size={28} className="text-gray-700" />,
    title: "Kamu Projeleri",
    description: "Toplumsal fayda odaklı, sürdürülebilir ve yenilikçi kamu yapıları tasarlıyoruz. Modern teknoloji ve fonksiyonel tasarımı bir araya getiriyoruz.",
    features: ["Kurumsal Yapılar", "Eğitim Tesisleri", "Sosyal Alanlar"],
    link: "/projects",
    category: "kamu"
  }
];

{/* Şimdilik devre dışı bırakıldı
const team = [
  {
    name: "Ahmet Yılmaz",
    role: "Kurucu Mimar",
    image: "/images/team/member1.jpg",
    description: "20 yıllık deneyimi ile sürdürülebilir ve yenilikçi tasarımların öncüsü."
  },
  {
    name: "Ayşe Kaya",
    role: "Baş Mimar",
    image: "/images/team/member2.jpg",
    description: "Modern mimari ve geleneksel malzemeleri harmanlayan özgün tasarımların yaratıcısı."
  }
];
*/}

const ServiceCard = ({ service, index }) => (
  <Link 
    href={{
      pathname: service.link,
      query: { selectedCategory: service.category }
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group bg-white backdrop-blur-sm border border-white/10 p-8 rounded-xl cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full relative"
    >
      <div className="absolute inset-x-0 top-0 w-full h-[4px]">
        <div className="w-full h-full bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
      <div className="bg-white rounded-lg p-4 inline-flex items-center justify-center shadow-md -translate-y-1">
        {React.cloneElement(service.icon, { className: "text-gray-700" })}
      </div>
      <h3 className="text-2xl font-medium mb-4 text-gray-900 mt-4">
        {service.title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
        {service.description}
      </p>
      <ul className="space-y-2">
        {service.features.map((feature, i) => (
          <li key={i} className="text-gray-500 flex items-center text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  </Link>
);

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[90vh] lg:h-screen w-full">
        <Image
          src="/images/about/hero.jpg"
          alt="Mimarlık Ofisi"
          fill
          className="object-cover object-[22%_center]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black">
        </div>
      </section>

      {/* Hikaye Bölümü - Şimdilik devre dışı
      <section className={`py-24 px-6 ${styles.contentSection}`}>
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="grid md:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-4xl font-light mb-8">
                <span className="text-gray-400">01 /</span> Hikayemiz
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                1998'den beri, mimari tasarımın gücüne inanarak çıktığımız bu yolculukta, her projeyi benzersiz bir fırsat olarak görüyoruz. Geleneksel değerler ile modern yaklaşımları harmanlayan tasarım anlayışımızla, yaşam alanlarını dönüştürüyoruz.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Sürdürülebilirlik, inovasyon ve işlevsellik prensipleriyle, her projemizde kullanıcı deneyimini merkeze alıyoruz. Detaylara gösterdiğimiz özen ve çözüm odaklı yaklaşımımızla, müşterilerimizin hayallerini gerçeğe dönüştürüyoruz.
              </p>
            </div>
            <motion.div 
              className="relative h-[600px]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/about/story.jpg"
                alt="Ofisimiz"
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      */}

      {/* Hizmetlerimiz */}
      <section className="relative projects-bg">
        <div className="texture-container">
          <div className="metal-base" />
          <div className="metal-grain" />
          <div className="fabric-texture" />
          <div className="fine-details" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl font-light mb-16 text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Hizmetlerimiz
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8 justify-items-center">
              {services.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ekip - Şimdilik devre dışı
      <section className={`py-24 px-6 ${styles.contentSection}`}>
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            className="text-4xl font-light mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-400">03 /</span> Ekibimiz
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-16">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col h-full"
              >
                <div className="relative h-[400px] mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-2xl font-medium text-gray-800 mb-2">{member.name}</h3>
                <p className="text-gray-500 text-lg mb-4">{member.role}</p>
                <p className="text-gray-700 leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}
    </main>
  );
}