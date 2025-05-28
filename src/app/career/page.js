'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/Career.module.css';
import Image from 'next/image';

export default function CareerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData(e.target);
      const response = await fetch('/api/career', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || 'Başvuru gönderilemedi');
      }

      setSubmitStatus('success');
      e.target.reset();
    } catch (error) {
      console.error('Form gönderme hatası:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-wider mb-6 text-white">
                Bizimle <span className="font-semibold">Çalışın</span>
              </h1>
              <p className="text-zinc-300 text-xl leading-relaxed">
                Yaratıcı ve yenilikçi projelerimizde bizimle birlikte çalışmak ister misiniz?
                Ekibimize katılın ve geleceğin yaşam alanlarını birlikte tasarlayalım.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-light mb-12 text-center"
            >
              Başvuru Formu
            </motion.h2>
            <motion.form
              className="bg-black rounded-xl p-8 space-y-6"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white 
                      placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-700 focus:border-transparent 
                      transition-all duration-200"
                    placeholder="Adınız ve Soyadınız"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white 
                      placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-700 focus:border-transparent 
                      transition-all duration-200"
                    placeholder="ornek@mail.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white 
                      placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-700 focus:border-transparent 
                      transition-all duration-200"
                    placeholder="05XX XXX XX XX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Pozisyon
                  </label>
                  <select
                    name="position"
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white 
                      focus:ring-2 focus:ring-zinc-700 focus:border-transparent transition-all duration-200 
                      appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23ffffff%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22/%3E%3C/svg%3E')] bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-zinc-500">Pozisyon Seçin</option>
                    <option value="Mimar">Mimar</option>
                    <option value="İç Mimar">İç Mimar</option>
                    <option value="Peyzaj Mimarı">Peyzaj Mimarı</option>
                    <option value="Tasarım Asistanı">Tasarım Asistanı</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Mesajınız
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white 
                    placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-700 focus:border-transparent 
                    transition-all duration-200 resize-none"
                  placeholder="Kendinizden ve deneyimlerinizden bahsedin..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  CV
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="cvFile"
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white 
                      file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm 
                      file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 
                      transition-all duration-200"
                  />
                  <p className="mt-2 text-sm text-white/60">
                    PDF, DOC veya DOCX formatında (max 5MB)
                  </p>
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                  Başvurunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                  Başvuru gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-4 bg-zinc-800 text-white rounded-lg font-medium 
                  hover:bg-zinc-700 transition-colors duration-200 mt-6
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}
