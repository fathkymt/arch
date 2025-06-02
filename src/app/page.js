// src/app/page.js
import Hero from '../components/home/Hero';
// import ProjectsSection from '../components/home/ProjectsSection';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      {/* <ProjectsSection /> */}
    </main>
  );
}