import React from 'react'
import UnicornStudioEmbed from "../components/animations/UnicornStudioEmbed.jsx";
import AdminCarousel from "../Admin Components/Home/Admin.Carousel.jsx";
import AdminAbout from "../Admin Components/Common/Admin.About.jsx";
import { useBafData } from "../hooks/useBafData.js";
import GlossyButton from "../components/buttons/mirrorbutton.jsx";
import Testimonials from "../components/layout/Testimonials.jsx";
import Brands from "../components/layout/Brands.jsx";
import Clientrev from "../components/layout/Clientrev.jsx";
import Stats from "../components/layout/Stats.jsx";
import { Footer } from '../components/footer/footer.jsx';
import AdminHero from "../Admin Components/Home/Admin.Hero.jsx";
import { BrandsSection } from "../components/layout/BrandsSection.jsx";
import AdminPopup from '../pages/AdminPopup.jsx';

export default function Home({ showAdminPopup = false }) {
  const { data, loading, error } = useBafData();
  
  if (data?.home?.testimonials) {
    console.log("Testimonials Array:", data.home.testimonials);
  }
  
  // Loading state Universal
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
        {/* Admin Hero Section */}
        <AdminHero />

        {/* Events Carousel Section (Admin) */}
        {data?.events && data.events.length > 0 && (
          <section className="min-h-screen bg-black">
            <AdminCarousel events={data.events} />
          </section>
        )}

        {/* About Section - Using AdminAbout instead of AboutSection */}
        <AdminAbout />

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