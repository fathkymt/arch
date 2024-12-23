'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import sectionStyles from '@/styles/ProjectsSection.module.css';
import backgroundStyles from '@/styles/BackgroundEffect.module.css';

const projects = [
  {
    id: 1,
    title: 'Modern Dağ Evi',
    description: 'Doğal ahşap ve modern mimariyi birleştiren, dağ manzaralı lüks villa projesi',
    image: '/images/projects/project1.jpg',
    category: 'mimari',
    technologies: ['Sürdürülebilir Malzeme', 'Modern Tasarım', 'Enerji Verimliliği']
  },
  {
    id: 2,
    title: 'Ekolojik Yaşam Merkezi',
    description: 'Sürdürülebilir malzemeler kullanılarak tasarlanan topluluk yaşam alanı',
    image: '/images/projects/project2.jpg',
    category: 'peyzaj',
    technologies: ['Ekolojik Tasarım', 'Yeşil Çatı', 'Yağmur Hasadı']
  },
  {
    id: 3,
    title: 'Sahil Rezidansı',
    description: 'Deniz manzaralı, ahşap detaylarla bezeli modern yaşam kompleksi',
    image: '/images/projects/project3.jpg',
    category: 'ic-mimari',
    technologies: ['Özel Tasarım', 'Lüks Detaylar', 'Akıllı Ev Sistemleri']
  }
];

const ProjectsSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className={sectionStyles.projectsSection}>
      <div className={backgroundStyles.container} />
      
      <h2 className={sectionStyles.sectionTitle}>Örnek Projeler</h2>
      
      <div className={sectionStyles.projectsContainer}>
        <div className={sectionStyles.projectsGrid}>
          {projects.map((project, index) => (
            <div key={project.id} className={sectionStyles.projectCard}>
              <ProjectCard project={project} isVisible={true} />
            </div>
          ))}
        </div>
      </div>

      <div className={sectionStyles.ctaContainer}>
        <Link href="/projects" className={sectionStyles.pearlButton}>
          <div className={sectionStyles.wrap}>
            <p>
              <span>✧</span>
              <span>✦</span>
              Tüm Projeleri Görüntüle
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;