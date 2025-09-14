// src/components/ServicesSection/ServicesSection.jsx
import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/ServicesSection.module.css';
import { MotionServiceCard } from '../cards/ServiceCard';
import { useScroll, useTransform } from 'framer-motion';

// Separate component for the scrollable cards container
const ScrollableCardsContainer = ({ servicesData }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const scale2 = useTransform(scrollYProgress, [0.2, 1], [1, 0.85]);
  const scale3 = useTransform(scrollYProgress, [0.4, 1], [1, 0.9]);
  const scale4 = useTransform(scrollYProgress, [0.6, 1], [1, 0.95]);

  const cardScales = [scale1, scale2, scale3, scale4];

  return (
    <div ref={containerRef} className={styles.cardsContainer}>
      {servicesData.map((service, index) => (
        <MotionServiceCard
          key={service.title}
          title={service.title}
          description={service.description}
          imageUrl={service.imageUrl}
          imageAlt={service.imageAlt}
          style={{
            scale: cardScales[index % cardScales.length],
            transformOrigin: 'top center',
          }}
        />
      ))}
    </div>
  );
};

export const ServicesSection = () => {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services data
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');

        if (!response.ok) {
          throw new Error('Failed to fetch services data');
        }

        const data = await response.json();
        console.log('Services API Response:', data);

        if (data.docs && data.docs.length > 0) {
          const transformedServices = data.docs.map(service => ({
            title: service.servicename,
            description: service.description,
            imageUrl: service.image?.url || '',
            imageAlt: service.servicename,
          }));

          setServicesData(transformedServices);
        } else {
          throw new Error('No services found');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.headingWrapper}>
          <h1 className={styles.mainHeading}>Our Services</h1>
        </div>
        <div className={styles.cardsContainer}>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
            Loading services...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <div className={styles.headingWrapper}>
          <h1 className={styles.mainHeading}>Our Services</h1>
        </div>
        <div className={styles.cardsContainer}>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
            Error: {error}
          </div>
        </div>
      </section>
    );
  }

  if (servicesData.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.headingWrapper}>
          <h1 className={styles.mainHeading}>Our Services</h1>
        </div>
        <div className={styles.cardsContainer}>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
            No services available.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.headingWrapper}>
        <h1 className={styles.mainHeading}>Our Services</h1>
      </div>
      <ScrollableCardsContainer servicesData={servicesData} />
    </section>
  );
};