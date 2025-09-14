import React, { useState, useEffect } from 'react'
import UnicornStudioEmbed from "../components/animations/UnicornStudioEmbed";
import Carousel from "../components/layout/Carousel";
import AboutSection from "../components/common/AboutSection";
import { useBafData } from "../hooks/useBafData";
import GlossyButton from "../components/buttons/mirrorbutton";
import Testimonials from "../components/layout/Testimonials";
import Brands from "../components/layout/Brands";
import Clientrev from "../components/layout/Clientrev";
import Stats from "../components/layout/Stats";
import { Footer } from '../components/footer/footer';
import { HeroSection } from "../components/layout/HeroSection";
import { BrandsSection } from "../components/layout/BrandsSection";


export default function Home() {
  const { data, loading, error } = useBafData();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
        const response = await fetch(`${apiUrl}/api/testimonials`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const testimonialsData = await response.json();
        if (testimonialsData && testimonialsData.docs) {
          setTestimonials(testimonialsData.docs);
        }
      } catch (e) {
        console.error("Failed to fetch testimonials:", e);
      }
    };

    fetchTestimonials();
  }, []);
  // Loading state
  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading BAF data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Events Carousel Section */}
        {data?.events && data.events.length > 0 && (
          <section className="min-h-screen bg-black">
            <Carousel events={data.events} />
          </section>
        )}

        {/* About Section */}
        {data?.home?.about && (
          <AboutSection aboutData={data.home.about} />
        )}

        {/* Brands Section */}
        {data?.brands && data.brands.length > 0 && (
          <BrandsSection brands={data.brands} />
        )}

        {/* Clientrev Section */}
        <Clientrev />

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <Testimonials testimonials={testimonials} />
        )}

        <Stats data={data} />
      </main>
    </div>
  )
}