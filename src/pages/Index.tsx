
import { useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Tools from '@/components/sections/Tools';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.section-fade');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Tools />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
