import React from 'react'
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
import AdminPopup from './AdminPopup.jsx';


export default function Home({ showAdminPopup = false }) {
  const { data, loading, error } = useBafData();
  
  if (data?.home?.testimonials) {
    console.log("Testimonials Array:", data.home.testimonials);
  }
  
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
        {data?.home?.about_section && (
          <AboutSection aboutData={data.home.about} />
        )}

        {/* Brands Section */}
        {data?.brands && data.brands.length > 0 && (
          <BrandsSection brands={data.brands} />
        )}

        {/* Clientrev Section */}
        <Clientrev />

        {/* Testimonials Section */}
        {data?.home?.testimonials && data.home.testimonials.length > 0 && (
          <Testimonials testimonials={data.home.testimonials} />
        )}

        <Stats data={data} />
      </main>

      {/* Admin Popup - shows when showAdminPopup is true */}
      {showAdminPopup && <AdminPopup onClose={() => {}} />}
    </div>
  )
}