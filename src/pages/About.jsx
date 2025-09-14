import React from 'react';
import AboutSection from '../components/common/AboutSection';
import { ServicesSection } from '../components/layout/ServicesSection';
import { TeamSection } from '../components/layout/TeamSection';
import Founder from '../components/layout/Founder';
import { useBafData } from '../hooks/useBafData';

const About = () => {
  const { data, loading, error } = useBafData();

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading About data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading data.</p>
      </div>
    );
  }

  const aboutData = data?.home?.about || {
    description1: 'Nestled in the heart of Baghdad, Bab Al Faouz — meaning The Gate of Omens — brings a fresh perspective to interior design.',
    description2: 'We create refined living spaces that blend elegance, comfort, and purpose, unlocking a world of exquisite living experiences for our clients.',
    image: 'https://framerusercontent.com/images/m5jsKAinALaB8jAlKLQAxA6GitQ.jpg',
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


    </div>
  );
};

export default About;