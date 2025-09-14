// src/components/BrandsSection/BrandsSection.jsx
import { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '../../styles/BrandsSection.module.css';

// Default placeholder data to prevent empty render
const defaultBrandCards = [
  { id: 1, bgImage: '', logo: '' },
  { id: 2, bgImage: '', logo: '' },
  { id: 3, bgImage: '', logo: '' },
  { id: 4, bgImage: '', logo: '' },
  { id: 5, bgImage: '', logo: '' },
];

const LogoTicker = ({ logos }) => (
  <div className={styles.tickerContainer}>
    <div className={styles.tickerTrack}>
      {[...logos, ...logos].map((logo, index) => (
        <img
          key={index}
          src={logo}
          alt={`Brand logo ${index % logos.length + 1}`}
          className={styles.tickerLogo}
          loading="lazy"
        />
      ))}
    </div>
  </div>
);

export const BrandsSection = () => {
  const [brandCards, setBrandCards] = useState(defaultBrandCards);
  const [tickerLogos, setTickerLogos] = useState([]);

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  });

  // Smooth rotation with custom easing - stop at last card (288 degrees)
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1], // Different scroll points for smoother acceleration/deceleration
    [0, -100, -250, -288], // Gradual rotation values
    { clamp: false } // Allow smooth transitions beyond boundaries
  );

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/BrandsSection');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.docs && data.docs.length > 0) {
          // Get top 5 brands for the cards
          const topBrands = data.docs.slice(0, 5).map((brand, index) => ({
            id: brand.id || index + 1,
            bgImage: brand['Main Image']?.url || '',
            logo: brand.Logo?.url || ''
          }));

          // If less than 5 brands, pad with empty cards
          while (topBrands.length < 5) {
            topBrands.push({ id: topBrands.length + 1, bgImage: '', logo: '' });
          }

          setBrandCards(topBrands);

          // Get all logos for the ticker
          const allLogos = data.docs
            .filter(brand => brand.Logo?.url)
            .map(brand => brand.Logo.url);
          setTickerLogos(allLogos);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        // Keep default placeholder data on error
      }
    };

    fetchBrands();
  }, []);

  const cardPositions = useMemo(() => {
    const totalCards = brandCards.length;
    return brandCards.map((card, index) => {
      const angle = (index * 360) / totalCards;
      const yOffset = (index - (totalCards - 1) / 2) * 150;
      return {
        id: card.id,
        transform: `rotateY(${angle}deg) translateZ(380px) translateY(${yOffset}px)`,
        bgImage: card.bgImage,
        logo: card.logo
      };
    });
  }, [brandCards]);

  return (
    <section className={styles.brandsSection}>
      <h1 className={styles.mainHeading}>Brands</h1>

      <div ref={scrollRef} className={styles.scrollContainer}>
        <div className={styles.stickyWrapper}>
          <div className={styles.spiralPositioner}>
            <motion.div
              className={styles.spiralRotator}
              style={{ rotateY }}
              transition={{ type: "spring", damping: 30, stiffness: 100 }} // Added smooth transition
            >
              {cardPositions.map((card) => (
                <div
                  key={card.id}
                  className={styles.brandCard}
                  style={{
                    transform: card.transform,
                    backgroundImage: card.bgImage ? `url(${card.bgImage})` : 'none',
                  }}
                >
                  {card.logo && (
                    <img
                      src={card.logo}
                      alt="Brand Logo"
                      className={styles.cardLogo}
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {tickerLogos.length > 0 && <LogoTicker logos={tickerLogos} />}
    </section>
  );
};