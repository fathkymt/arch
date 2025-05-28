'use client';
import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Grid, ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import styles from '@/styles/ProjectBackgroundPattern.module.css';

export default function ProjectDetail({ params }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [project, setProject] = useState(null);

  const { category, id } = use(params);

  useEffect(() => {
    setIsMounted(true);
    const foundProject = projects.find(p => p.id.toString() === id);
    setProject(foundProject);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!isMounted || !project) return null;

  const nextProject = project.nextProject ? {
    ...project.nextProject,
    category: projects.find(p => p.id === project.nextProject.id)?.category
  } : null;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  const imageGridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Pattern */}
      <div className={styles.backgroundContainer} />

      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="h-20 flex items-center justify-between">
            {/* Sol taraf - Hamburger menu için boş bırakılıyor */}
            <div className="w-12">
              {/* Hamburger menu buraya gelecek */}
            </div>

            {/* Orta kısım - Navigation butonları */}
            <div className="flex items-center gap-3">
              <Link
                href="/projects"
                className="group relative px-4 py-2 text-sm text-white/90 hover:text-white transition-colors"
              >
                <span className="relative z-10">Tüm Projeler</span>
                <span className="absolute inset-0 bg-white/5 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
              
              <span className="text-white/20">|</span>
              
              <Link
                href={`/projects/${category}`}
                className="group relative px-4 py-2 text-sm text-white/90 hover:text-white transition-colors"
              >
                <span className="relative z-10">Kategori</span>
                <span className="absolute inset-0 bg-white/5 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </div>

            {/* Sağ taraf - Denge için boş bırakılıyor */}
            <div className="w-12" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[70vh] w-full mt-16"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
      </motion.div>

      {/* Content Section */}
      <div className="relative z-10 px-4 -mt-32 max-w-7xl mx-auto">
        <motion.div 
          className="bg-neutral-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-neutral-800"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Project Info */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <motion.span 
                className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm"
                {...fadeIn}
                transition={{ delay: 0.4 }}
              >
                {project.category}
              </motion.span>
              
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white"
                {...fadeIn}
                transition={{ delay: 0.5 }}
              >
                {project.title}
              </motion.h1>
              
              <motion.p 
                className="text-gray-300 text-lg leading-relaxed"
                {...fadeIn}
                transition={{ delay: 0.6 }}
              >
                {project.fullDescription || project.description}
              </motion.p>

              {/* Project Details */}
              <motion.div 
                className="grid grid-cols-2 gap-6 mt-8"
                {...fadeIn}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-white/60" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-white/60" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Grid className="w-5 h-5 text-white/60" />
                  <span>{project.area} m²</span>
                </div>
              </motion.div>
            </div>

            {/* Main Gallery Image */}
            <motion.div 
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-neutral-800"
              {...fadeIn}
              transition={{ delay: 0.8 }}
            >
              <Image
                src={project.detailImages[0]}
                alt={`${project.title} detay`}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Image Gallery */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
            variants={imageGridVariants}
            initial="hidden"
            animate="show"
          >
            {[project.image, ...project.detailImages].map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-neutral-800 hover:border-neutral-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(image)}
                variants={fadeIn}
              >
                <Image
                  src={image}
                  alt={`${project.title} görsel ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>

          {/* Next Project Link */}
          <motion.div 
            className="mt-12 pt-8 border-t border-neutral-800"
            {...fadeIn}
            transition={{ delay: 1 }}
          >
            {nextProject && (
              <Link
                href={`/projects/${nextProject.category}/${nextProject.id}`}
                className="flex items-center justify-between group hover:bg-neutral-800/50 p-4 rounded-xl transition-all duration-300"
              >
                <div>
                  <p className="text-gray-400">Sonraki Proje</p>
                  <h3 className="text-xl text-white mt-1">{nextProject.title}</h3>
                </div>
                <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-2 transition-transform" />
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-video"
            >
              <Image
                src={selectedImage}
                alt="Büyük görüntü"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}