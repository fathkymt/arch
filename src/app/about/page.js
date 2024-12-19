'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, PaintBucket, Trees } from 'lucide-react';
import styles from '@/styles/AboutBackground.module.css';

const services = [
  {
    icon: <Building2 size={28} className="text-gray-700" />,
    title: "Mimari Tasarım",
    description: "Modern çizgiler ve sürdürülebilir yaklaşımlarla projelerinizi hayata geçiriyoruz. Her detayı özenle planlıyor, yaşanabilir mekanlar tasarlıyoruz.",
    features: ["Konsept Tasarım", "3D Modelleme", "Teknik Çizimler"]
  },
  {
    icon: <PaintBucket size={28} className="text-gray-700" />,
    title: "İç Mimari",
    description: "Fonksiyonellik ve estetiği bir araya getirerek, yaşam alanlarınızı kişiselleştiriyoruz. Her mekanın potansiyelini maksimuma çıkarıyoruz.",
    features: ["Mekan Tasarımı", "Mobilya Seçimi", "Aydınlatma Planı"]
  },
  {
    icon: <Trees size={28} className="text-gray-700" />,
    title: "Peyzaj Tasarımı",
    description: "Doğayla uyumlu, sürdürülebilir peyzaj çözümleri sunuyoruz. Dış mekanlarınızı yaşayan alanlara dönüştürüyoruz.",
    features: ["Bahçe Düzenleme", "Sulama Sistemleri", "Bitki Seçimi"]
  }
];

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

const ServiceCard = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    className={`${styles.serviceCard} p-8 rounded-xl`}
  >
    <div className={styles.iconContainer}>
      {service.icon}
    </div>
    <h3 className="text-2xl font-medium mb-4 text-gray-800">
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
);

export default function AboutPage() {
  return (
    <main className={styles.background}>
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full">
        <Image
          src="/images/about/hero.jpg"
          alt="Mimarlık Ofisi"
          fill
          className="object-cover"
          priority
        />
        <div className={`absolute inset-0 ${styles.heroOverlay}`}>
          <div className="container mx-auto h-full flex items-center px-6">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-7xl font-light mb-8 text-white leading-tight">
                Mimari Vizyonunuzu<br />
                <span className="font-bold">Gerçeğe Dönüştürüyoruz</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
                25 yıldır sürdürülebilir, yenilikçi ve insan odaklı tasarımlar üretiyoruz.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hikaye Bölümü */}
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

      {/* Hizmetlerimiz */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            className="text-4xl font-light mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-400">02 /</span> Hizmetlerimiz
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Ekip */}
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
    </main>
  );
}