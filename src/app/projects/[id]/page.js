'use client';
import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Grid, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, categories } from '@/data/projects';

export default function ProjectDetail({ params }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [project, setProject] = useState(null);

  const { id } = use(params);

  useEffect(() => {
    setIsMounted(true);
    const foundProject = projects.find(p => p.id.toString() === id);
    setProject(foundProject);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    const allImages = [project.image, ...project.detailImages];
    const newIndex = (selectedImageIndex - 1 + allImages.length) % allImages.length;
    setSelectedImage(allImages[newIndex]);
    setSelectedImageIndex(newIndex);
  };

  const handleNextImage = () => {
    const allImages = [project.image, ...project.detailImages];
    const newIndex = (selectedImageIndex + 1) % allImages.length;
    setSelectedImage(allImages[newIndex]);
    setSelectedImageIndex(newIndex);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (e.key === 'ArrowRight') {
      handleNextImage();
    } else if (e.key === 'Escape') {
      setSelectedImage(null);
    }
  };

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
      <div className="absolute inset-0 bg-[#111111] z-[-1]" />

      {/* Hide WhiteLogo on mobile */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .white-logo {
            display: none !important;
          }
        }
      `}</style>

      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="h-24 flex items-center justify-between">
            {/* Sol taraf - Hamburger menu için boş bırakılıyor */}
            <div className="w-12">
              {/* Hamburger menu buraya gelecek */}
            </div>

            {/* Orta kısım - Navigation butonları */}
            <div className="flex items-center gap-3 translate-y-1 translate-x-4">
              <Link
                href="/projects"
                className="group relative px-4 py-2 text-sm text-white/90 hover:text-white transition-colors"
              >
                <span className="relative z-10">Tüm Projeler</span>
                <span className="absolute inset-0 bg-white/5 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
              
              <span className="text-white/20">|</span>
              
              <Link
                href={`/projects?category=${project?.category}`}
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
      <div className="relative z-10 px-4 -mt-32 pb-12 max-w-7xl mx-auto">
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
                {project.category === 'ic-mimari' ? 'İç Mimari Proje' : project.category === 'mimari' ? 'Mimari Proje' : categories[project.category]}
              </motion.span>
              
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white"
                {...fadeIn}
                transition={{ delay: 0.5 }}
              >
                {project.title}
              </motion.h1>

              {/* Project Details */}
              <motion.div 
                className="flex flex-col space-y-4"
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
                onClick={() => handleImageClick(image, index)}
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
            className="fixed inset-0 z-50 bg-black/95 md:p-4"
          >
            {/* Desktop View */}
            <div 
              className="hidden md:flex h-full items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <div 
                className="relative max-w-5xl aspect-video w-full"
                onClick={e => e.stopPropagation()}
              >
                <Image
                  src={selectedImage}
                  alt="Büyük görüntü"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
                
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white/90 hover:text-white transition-all transform hover:scale-110 z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white/90 hover:text-white transition-all transform hover:scale-110 z-10"
                >
                  <ChevronRight size={24} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm z-10">
                  {selectedImageIndex + 1} / {[project.image, ...project.detailImages].length}
                </div>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden h-full flex flex-col">
              {/* Top Close Area */}
              <div 
                className="flex-1"
                onClick={() => setSelectedImage(null)}
              />
              
              {/* Image Container */}
              <div className="w-full h-[50vh] relative">
                <Image
                  src={selectedImage}
                  alt="Büyük görüntü"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />

                {/* Navigation Controls */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4 z-10 pointer-events-none">
                  <button
                    onClick={handlePrevImage}
                    className="p-3 rounded-full bg-black/50 text-white pointer-events-auto"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="p-3 rounded-full bg-black/50 text-white pointer-events-auto"
                  >
                    <ChevronRight size={28} />
                  </button>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm z-10">
                  {selectedImageIndex + 1} / {[project.image, ...project.detailImages].length}
                </div>
              </div>

              {/* Bottom Close Area */}
              <div 
                className="flex-1"
                onClick={() => setSelectedImage(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}