// src/components/ServicesSection/ServiceCard.jsx
import styles from './ServiceCard.module.css';
import { motion } from 'framer-motion';
// Dummy data for services

export const ServiceCard = ({ title, description, imageUrl, imageAlt }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.textWrapper}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.line}></div>
          </div>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt={imageAlt} className={styles.image} />
        </div>
      </div>
    </div>
  );
};

// We wrap the ServiceCard in motion() to allow it to be animated by the parent
export const MotionServiceCard = motion(ServiceCard);