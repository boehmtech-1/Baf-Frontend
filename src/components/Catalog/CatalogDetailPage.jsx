// src/components/Catalog/CatalogDetailPage.jsx
import { useParams, Link } from 'react-router-dom';
import styles from './CatalogDetailPage.module.css';
import catalogData from '../../components/CMS/data/catalogData.json'

// A helper component to safely render HTML from the JSON
const RichTextContent = ({ html }) => {
    // Note: dangerouslySetInnerHTML is safe here because we trust our own JSON data.
    // Be very careful using this with data from external APIs.
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export const CatalogDetailPage = () => {
    const { slug } = useParams();
    const item = catalogData.find(p => p.Slug === slug);

    if (!item) {
        return <div className={styles.pageWrapper}><h2>Project not found</h2></div>;
    }

    // Find previous and next items for navigation
    const currentIndex = catalogData.findIndex(p => p.Slug === slug);
    const prevItem = catalogData[currentIndex - 1];
    const nextItem = catalogData[currentIndex + 1];

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.header}>
                <h1 className={styles.mainHeading}>{item.Title}</h1>
                {item["Team quote"] && <p className={styles.quote}>"{item["Team quote"]}"</p>}
            </div>
            
            <img src={item.Image} alt={item.Title} className={styles.mainImage} />

            <div className={styles.contentGrid}>
                {item["Content 1"] && <RichTextContent html={item["Content 1"]} />}
                {item["Image 2"] && <img src={item["Image 2"]} alt="" className={styles.gridImage} />}
                {item["Image 3"] && <img src={item["Image 3"]} alt="" className={styles.gridImage} />}
                {item["Image 4"] && <img src={item["Image 4"]} alt="" className={styles.gridImage} />}
                {item["Image 5"] && <img src={item["Image 5"]} alt="" className={styles.gridImage} />}
                {item["Content 2"] && <RichTextContent html={item["Content 2"]} />}
            </div>

            <nav className={styles.pagination}>
                {prevItem ? (
                    <Link to={`/catalog/${prevItem.Slug}`} className={styles.navLink}>
                        ‹ {prevItem.Title}
                    </Link>
                ) : <div></div>}
                
                {nextItem ? (
                    <Link to={`/catalog/${nextItem.Slug}`} className={styles.navLink}>
                        {nextItem.Title} ›
                    </Link>
                ) : <div></div>}
            </nav>
        </div>
    );
};