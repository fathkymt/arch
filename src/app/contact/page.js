'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import styles from '@/styles/ContactBackground.module.css';

const contactInfo = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Adres",
    details: ["Örnek Mahallesi, Mimarlık Caddesi No:123", "Kadıköy, İstanbul"],
    delay: 0.2
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Telefon",
    details: ["+90 (212) 123 45 67"],
    delay: 0.3
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "E-posta",
    details: ["info@mimarlikofisi.com"],
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: info.delay }}
      viewport={{ once: true }}
      className={`${styles.contactCard} p-6 rounded-xl`}
    >
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
    </motion.div>
  );
};

export default function ContactPage() {
  return (
    <div className={`min-h-screen ${styles.background}`}>
      {/* Hero Section */}
      <section className="relative h-[50vh]">
        <div className={styles.heroPattern} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70">
          <div className="container mx-auto h-full flex flex-col justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
                Bize <span className="font-semibold">Ulaşın</span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6504900120997!2d29.02885931574821!3d40.99050792855247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab8679bfb3d31%3A0x7d75715e081dfa5c!2sKad%C4%B1k%C3%B6y%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1672901234567!5m2!1str!2str"
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