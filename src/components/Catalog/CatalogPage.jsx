import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './CatalogPage.module.css';

export const CatalogPage = () => {
  const [catalogData, setCatalogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await fetch('/api/catalog');
        const data = await response.json();

        if (data.docs) {
          setCatalogData(data.docs);
        }
      } catch (err) {
        setError('Failed to load catalog');
        console.error('Error fetching catalog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <h1 className={styles.mainHeading}>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageWrapper}>
        <h1 className={styles.mainHeading}>{error}</h1>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.mainHeading}>CATALOG</h1>
      <div className={styles.grid}>
        {catalogData.map(item => (
          <Link to={`/catalog/${item.Slug}`} key={item.id || item.Slug} className={styles.card}>
            <img
              src={item.Image?.url || item.Image}
              alt={item.Title}
              className={styles.cardImage}
            />
            <div className={styles.cardOverlay}>
              <h3 className={styles.cardTitle}>{item.Title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};