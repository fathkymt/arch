'use client';
import { useState, useEffect, useRef } from 'react';
import { projects, categories } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.3,
    once: false
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }}
      className="group h-full"
    >
      <Link href={`/projects/${project.id}`} className="block h-full">
        <div className="bg-zinc-900/30 rounded-2xl overflow-hidden h-full">
          {/* Project Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Project Info */}
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-medium text-white group-hover:text-gray-200 transition-colors text-center">
              {project.title}
            </h2>

            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <span className="inline-block px-2.5 py-1 text-xs sm:text-sm rounded-full bg-zinc-800 text-white whitespace-nowrap">
                {categories[project.category]}
              </span>
              
              <div className="flex items-center gap-3 sm:gap-6 text-gray-400 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                  <MapPin size={13} className="sm:w-[16px] sm:h-[16px] shrink-0" />
                  <span className="truncate sm:truncate-none">{project.location}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                  <Calendar size={13} className="sm:w-[16px] sm:h-[16px] shrink-0" />
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, []);

  // Update URL when category changes
  useEffect(() => {
    if (isMounted) {
      const url = new URL(window.location.href);
      if (selectedCategory === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', selectedCategory);
      }
      window.history.pushState({}, '', url);
    }
  }, [selectedCategory, isMounted]);

  if (!isMounted) return null;

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="relative min-h-screen">
      <section className="relative projects-bg min-h-screen">
        <div className="texture-container">
          <div className="metal-base" />
          <div className="metal-grain" />
          <div className="fabric-texture" />
          <div className="fine-details" />
        </div>
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-2 sm:px-6 sm:pb-18 lg:px-8">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-wider mb-6 text-white">
              Projelerimiz
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-light tracking-wide">
              Mimari, iç mimari ve peyzaj alanlarında gerçekleştirdiğimiz seçkin projelerimiz
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-medium ${
                selectedCategory === 'all'
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-md'
              }`}
            >
              Tümü
            </button>
            {Object.entries(categories).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-medium ${
                  selectedCategory === key
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-md'
                }`}
              >
                {value}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center min-h-[400px] text-center"
            >
              <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800 max-w-lg mx-auto">
                <h3 className="text-2xl font-light text-white mb-4">
                  Bu kategoride henüz proje bulunmuyor
                </h3>
                <p className="text-zinc-400 mb-8">
                  Çok yakında bu kategoride de projelerimizi sizlerle paylaşacağız.
                </p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="px-6 py-3 bg-white text-black rounded-full hover:bg-zinc-100 transition-colors duration-300"
                >
                  Tüm Projeleri Görüntüle
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;