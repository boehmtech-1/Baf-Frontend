// src/components/Catalog/CatalogPage.jsx
import { Link } from 'react-router-dom';
import styles from './CatalogPage.module.css';
import catalogData from '../data/catalogData.json'; // Use your actual JSON file name

export const CatalogPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.mainHeading}>CATALOG</h1>
      <div className={styles.grid}>
        {catalogData.map(item => (
          <Link to={`/catalog/${item.Slug}`} key={item.Slug} className={styles.card}>
              <img src={item.Image} alt={item.Title} className={styles.cardImage} />
              <div className={styles.cardOverlay}>
                <h3 className={styles.cardTitle}>{item.Title}</h3>
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
};