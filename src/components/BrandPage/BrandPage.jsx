import { Link } from 'react-router-dom';
import styles from '../BrandPage/BrandPage.module.css';
import brandsData from '../../components/CMS/data/brandsData.json';
import { motion } from 'framer-motion';

const ArrowIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 5L19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const BrandCard = ({ brand }) => (
  <Link to={`/brands/${brand.Slug}`} className={styles.card}>
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
      <div className={styles.imageWrapper}>
        <img src={brand['Main Image']} alt={brand.Title} className={styles.cardImage} />
      </div>
      <div className={styles.cardOverlay}>
        <h3 className={styles.cardTitle}>{brand.Title}</h3>
        <div className={styles.arrowIcon}>
            <ArrowIcon />
        </div>
      </div>
    </motion.div>
  </Link>
);

export const BrandPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.mainHeading}>Brands</h1>
      <div className={styles.grid}>
        {brandsData.map(brand => (
          <BrandCard key={brand.Slug} brand={brand} />
        ))}
      </div>
    </div>
  );
};