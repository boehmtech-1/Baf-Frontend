import React from 'react';
import AboutSection from '../components/common/AboutSection';
import { ServicesSection } from '../components/layout/ServicesSection';
import { TeamSection } from '../components/layout/TeamSection';
import Founder from '../components/layout/Founder';
import { Footer } from '../components/footer/footer';

const About = () => {
  // Sample data for AboutSection
  const aboutData = {
    description1: "Nestled in the heart of Baghdad, Bab Al Faouz — meaning The Gate of Omens — brings a fresh perspective to interior design.",
    description2: "We create refined living spaces that blend elegance, comfort, and purpose, unlocking a world of exquisite living experiences for our clients.",
    image: "https://framerusercontent.com/images/m5jsKAinALaB8jAlKLQAxA6GitQ.jpg"
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* AboutSection as first container */}
      <AboutSection aboutData={aboutData} />
      
      <div className="container mx-auto px-6 py-16">
        {/* Main Content */}
        <section className="max-w-4xl mx-auto">
          {/* Services Section */}
          <ServicesSection />

          {/* Team Section */}
          <TeamSection />

          {/* Founder Section */}
          <Founder />
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;