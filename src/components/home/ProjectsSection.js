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
    id: 9,
    title: 'Ekolojik Yaşam Merkezi',
    description: 'Sürdürülebilir malzemeler kullanılarak tasarlanan topluluk yaşam alanı',
    image: '/images/projects/palmares/1.png',
    category: 'kamu',
    technologies: ['Ekolojik Tasarım', 'Yeşil Çatı', 'Yağmur Hasadı']
  },
  {
    id: 8,
    title: 'Sahil Rezidansı',
    description: 'Deniz manzaralı, ahşap detaylarla bezeli modern yaşam kompleksi',
    image: '/images/projects/mgvilla/1.png',
    category: 'ic-mimari',
    technologies: ['Özel Tasarım', 'Lüks Detaylar', 'Akıllı Ev Sistemleri']
  }
];

const ProjectsSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return (
      <section className={sectionStyles.projectsSection}>
        <div className={backgroundStyles.container} />
        <div className={backgroundStyles.overlay} />
        <div className="min-h-screen" />
      </section>
    );
  }

  return (
    <section className={sectionStyles.projectsSection}>
      <div className={backgroundStyles.container} />
      <div className={backgroundStyles.overlay} />
      
      <h2 className={sectionStyles.sectionTitle}>Örnek Projeler</h2>
      
      <div className={sectionStyles.projectsContainer}>
        <div className={sectionStyles.projectsGrid}>
          {projects.map((project) => (
            <div key={project.id} className={sectionStyles.projectCard}>
              <ProjectCard project={project} isVisible={mounted} />
            </div>
          ))}
        </div>
      </div>

      <div className={sectionStyles.ctaContainer}>
        <Link href="/projects" className={sectionStyles.cta}>
          <span className={sectionStyles.hoverUnderlineAnimation}>
            Tüm Projeleri Görüntüle
          </span>
          <svg
            viewBox="0 0 46 16"
            height="10"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
            id="arrow-horizontal"
          >
            <path
              transform="translate(30)"
              d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
              data-name="Path 10"
              id="Path_10"
            ></path>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;