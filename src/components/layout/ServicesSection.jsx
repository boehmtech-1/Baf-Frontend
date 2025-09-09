// src/components/ServicesSection/ServicesSection.jsx
import styles from '../../styles/ServicesSection.module.css';
import { MotionServiceCard } from '../cards/ServiceCard';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Data is now in a clean array, easy to manage!
const servicesData = [
  {
    title: 'Luxury Interior Design',
    description: 'Tailored concepts that elevate your home’s personality.',
    imageUrl: 'https://framerusercontent.com/images/yblEUzvdw0lWdC1TTFuV0IFuWw.jpg',
    imageAlt: 'Luxury interior design example',
  },
  {
    title: 'Space Planning',
    description: 'Intelligent layouts for comfort, flow, and functionality.',
    imageUrl: 'https://framerusercontent.com/images/o83lF1bGsebBLxOOTRjRtT15c.jpg',
    imageAlt: 'Space planning diagram',
  },
  {
    title: 'Custom Furnishing',
    description: 'Bespoke pieces crafted to complement your lifestyle.',
    imageUrl: 'https://framerusercontent.com/images/iFGfWXXvKP8IH8EGBOyWlGpBfa8.jpg',
    imageAlt: 'Custom furniture piece',
  },
  {
    title: 'Styling & Décor',
    description: 'Finishing touches that bring every detail to life.',
    imageUrl: 'https://framerusercontent.com/images/eQx7OeIrL8Dl7K00bwoOE15y4.jpg',
    imageAlt: 'Stylish home decor items',
  },
];

export const ServicesSection = () => {
  const containerRef = useRef(null);
  
  // Use Framer Motion's scroll hooks to track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Create transformed scale values for each card based on scroll progress
  // Each subsequent card's animation starts a bit later, creating the stacking effect.
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const scale2 = useTransform(scrollYProgress, [0.2, 1], [1, 0.85]);
  const scale3 = useTransform(scrollYProgress, [0.4, 1], [1, 0.9]);
  const scale4 = useTransform(scrollYProgress, [0.6, 1], [1, 0.95]);

  const cardScales = [scale1, scale2, scale3, scale4];

  return (
    <section className={styles.section}>
      <div className={styles.headingWrapper}>
        <h1 className={styles.mainHeading}>Our Services</h1>
      </div>
      <div ref={containerRef} className={styles.cardsContainer}>
        {servicesData.map((service, index) => (
          <MotionServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            imageUrl={service.imageUrl}
            imageAlt={service.imageAlt}
            style={{
              scale: cardScales[index],
              transformOrigin: 'top center',
            }}
          />
        ))}
      </div>
    </section>
  );
};