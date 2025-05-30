'use client';
import { projects, categories } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { use } from 'react';

const getCategoryDescription = (category) => {
  const descriptions = {
    'mimari': 'Modern ve sürdürülebilir mimari projelerimiz',
    'ic-mimari': 'Fonksiyonel ve estetik iç mimari tasarımlarımız',
    'kamu': 'Kamu kurumları için geliştirdiğimiz özel projelerimiz'
  };
  return descriptions[category] || '';
};

export default function CategoryPage({ params }) {
  const { category } = use(params);
  
  const categoryTitle = categories[category] || 'Projeler';
  const filteredProjects = projects.filter(p => p.category === category);

  if (filteredProjects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Bu kategoride proje bulunamadı</h2>
          <Link 
            href="/projects" 
            className="inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 group"
          >
            <ChevronLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Tüm Projelere Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen projects-bg">
      <div className="texture-container">
        <div className="metal-base" />
        <div className="metal-grain" />
        <div className="fabric-texture" />
        <div className="fine-details" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-12 sm:pt-0"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all duration-300 mb-8 group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Tüm Projeler</span>
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {categoryTitle}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              {getCategoryDescription(category)}
            </p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/projects/${category}/${project.id}`}
                className="block group bg-neutral-900/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-neutral-800 hover:border-neutral-700"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-200 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-gray-400 line-clamp-2 mb-4 group-hover:text-gray-300 transition-colors">
                    {project.description}
                  </p>

                  <div className="flex items-center text-white font-medium">
                    <span className="group-hover:mr-2 transition-all duration-300">Detayları Gör</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}