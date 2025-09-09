// src/components/BrandsSection/BrandsSection.jsx
import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '../../styles/BrandsSection.module.css';

// Brand data - in a real app, consider moving to a constants file or fetching from CMS
const brandCards = [
  { 
    id: 1, 
    bgImage: 'https://framerusercontent.com/images/KiVuKKPVr0qYIMtL0lDkmfgUXs.jpg', 
    logo: 'https://framerusercontent.com/images/otv1rEDn2X7h8TFtKPCksQmAEKQ.svg' 
  },
  { 
    id: 2, 
    bgImage: 'https://framerusercontent.com/images/eC0Y9wS9u2SpIBPTzSspvT0OE.jpg', 
    logo: 'https://framerusercontent.com/images/np97j2F8KUZ2HLiullJ6eZCAlsQ.png' 
  },
  { 
    id: 3, 
    bgImage: 'https://framerusercontent.com/images/f7TQU9cgKVIAfQ5PA9T79jMkUg.jpg', 
    logo: 'https://framerusercontent.com/images/f0y1IAXP7xxPZoecHyx9XHFdiHA.png' 
  },
  { 
    id: 4, 
    bgImage: 'https://framerusercontent.com/images/FUThoLpntQmFuVw9JdkXZ4y38.jpg', 
    logo: 'https://framerusercontent.com/images/6IX9srHugK666NPKQJythMbMME.png' 
  },
  { 
    id: 5, 
    bgImage: 'https://framerusercontent.com/images/KOQjQrydrJvVSvzcz2fLyVMiuBc.png', 
    logo: 'https://framerusercontent.com/images/6IX9srHugK666NPKQJythMbMME.png' 
  },
];

const tickerLogos = [
  'https://framerusercontent.com/images/otv1rEDn2X7h8TFtKPCksQmAEKQ.svg',
  'https://framerusercontent.com/images/rrRoFs4icQtustYbIGm5r5DXREI.svg',
  'https://framerusercontent.com/images/hhTRf8RciR9bakkAgIckAkEiQM.svg',
  'https://framerusercontent.com/images/1ph1389RD4RtUDEfqVhWbujyF7s.svg',
  'https://framerusercontent.com/images/Yn3MOOL9rTXhK9U8MLvSnEoNP8.svg',
];

const LogoTicker = () => (
  <div className={styles.tickerContainer}>
    <div className={styles.tickerTrack}>
      {[...tickerLogos, ...tickerLogos].map((logo, index) => (
        <img 
          key={index} 
          src={logo} 
          alt={`Brand logo ${index % tickerLogos.length + 1}`} 
          className={styles.tickerLogo} 
          loading="lazy"
        />
      ))}
    </div>
  </div>
);

export const BrandsSection = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  });

  // Calculate rotation based on scroll
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -360]);

  // Memoize card positions for performance
  const cardPositions = useMemo(() => {
    const totalCards = brandCards.length;
    return brandCards.map((card, index) => {
      const angle = (index * 360) / totalCards;
      const yOffset = (index - (totalCards - 1) / 2) * 120;
      return {
        id: card.id,
        transform: `rotateY(${angle}deg) translateZ(350px) translateY(${yOffset}px)`,
        bgImage: card.bgImage,
        logo: card.logo
      };
    });
  }, []);

  return (
    <section className={styles.brandsSection}>
      <h1 className={styles.mainHeading}>Brands</h1>
      
      <div ref={scrollRef} className={styles.scrollContainer}>
        <div className={styles.stickyWrapper}>
          <div className={styles.spiralPositioner}>
            <motion.div 
              className={styles.spiralRotator} 
              style={{ rotateY }}
            >
              {cardPositions.map((card) => (
                <div
                  key={card.id}
                  className={styles.brandCard}
                  style={{
                    transform: card.transform,
                    backgroundImage: `url(${card.bgImage})`,
                  }}
                >
                  <img 
                    src={card.logo} 
                    alt="Brand Logo" 
                    className={styles.cardLogo} 
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      
      <LogoTicker />
    </section>
  );
};