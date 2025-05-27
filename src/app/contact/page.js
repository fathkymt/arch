'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import styles from '@/styles/ContactBackground.module.css';

const contactInfo = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Adres",
    details: [
      "Melikşah Mah. Hocafakıh Cad.",
      "Füsun Sk. Arca Plaza Kat:1 No:2",
      "Meram/Konya"
    ],
    link: "https://maps.app.goo.gl/7SuLHkdww2dPHsU27",
    delay: 0.2
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Telefon",
    details: ["+90 507 267 63 79", "+90 506 770 42 72"],
    delay: 0.3
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "E-posta",
    details: ["info@espluspartners.com"],
    delay: 0.4
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Çalışma Saatleri",
    details: ["Pazartesi - Cuma: 09:00 - 18:00", "Cumartesi: 10:00 - 14:00"],
    delay: 0.5
  }
];

const ContactCard = ({ info }) => {
  const content = (
    <>
      <div className={styles.iconWrapper}>
        {info.icon}
      </div>
      <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">
        {info.title}
      </h3>
      {info.details.map((detail, index) => (
        <p key={index} className="text-gray-600">
          {detail}
        </p>
      ))}
    </>
  );

  if (info.link) {
    return (
      <motion.a
        href={info.link}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: info.delay }}
        viewport={{ once: true }}
        className={`${styles.contactCard} p-6 rounded-xl block hover:shadow-lg transition-shadow`}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: info.delay }}
      viewport={{ once: true }}
      className={`${styles.contactCard} p-6 rounded-xl`}
    >
      {content}
    </motion.div>
  );
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] projects-bg">
        <div className="texture-container">
          <div className="metal-base" />
          <div className="metal-grain" />
          <div className="fabric-texture" />
          <div className="fine-details" />
          <div className="surface-highlights" />
        </div>
        <div className="absolute inset-0">
          <div className="container mx-auto h-full flex flex-col justify-center px-6 pt-12 md:pt-0">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
                Bize <span className="font-light">Ulaşın</span>
              </h1>
              <p className="text-zinc-300 text-xl leading-relaxed">
                Projeleriniz için yanınızdayız. Fikirlerinizi gerçeğe dönüştürmek için bizimle iletişime geçin.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* İletişim Bilgileri ve Harita */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* İletişim Bilgileri */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-light mb-12"
            >
              <span className="text-gray-400">01 /</span> İletişim Bilgilerimiz
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <ContactCard key={index} info={info} />
              ))}
            </div>
          </div>

          {/* Harita */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-light mb-12"
            >
              <span className="text-gray-400">02 /</span> Konum
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`${styles.mapContainer} rounded-xl overflow-hidden h-[400px]`}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.5228190788457!2d32.462834900000004!3d37.871454299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d08531860adcb3%3A0x5f116f4d0c50ad1c!2sES%2BPartners%20Mimarl%C4%B1k!5e0!3m2!1sen!2str!4v1748353608114!5m2!1sen!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}