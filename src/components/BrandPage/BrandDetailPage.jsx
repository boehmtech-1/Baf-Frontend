import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './BrandDetailPage.module.css';

const RichTextContent = ({ html }) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
);

export const BrandDetailPage = () => {
    const { slug } = useParams();
    const [brand, setBrand] = useState(null);
    const [brandsData, setBrandsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch('/api/BrandsSection');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.docs) {
                    setBrandsData(data.docs);
                    const currentBrand = data.docs.find(p => p.Slug === slug);
                    setBrand(currentBrand);

                    // Debug: Log the content sections to see the structure
                    if (currentBrand) {
                        console.log('Current brand data:', currentBrand);
                        console.log('Content sections:', currentBrand.contentSections);
                    }
                }
            } catch (error) {
                console.error('Error fetching brands:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, [slug]);

    if (loading) {
        return <div className={styles.pageWrapper}><h2>Loading...</h2></div>;
    }

    if (!brand) {
        return <div className={styles.pageWrapper}><h2>Brand not found</h2></div>;
    }

    const currentIndex = brandsData.findIndex(p => p.Slug === slug);
    const prevBrand = brandsData[currentIndex - 1];
    const nextBrand = brandsData[currentIndex + 1];

    return (
        <div className={styles.pageWrapper}>
            <header className={styles.header}>
                <h1 className={styles.mainHeading}>{brand.Title}</h1>
            </header>

            {/* Main Image - already has full URL */}
            <img
                src={brand['Main Image']?.url}
                alt={brand.Title}
                className={styles.mainImage}
            />

            <div className={styles.contentArea}>
                {/* Main Content */}
                <RichTextContent html={brand.Content} />

                {/* Content Sections - map through the array */}
                {brand.contentSections && brand.contentSections.map((section, index) => (
                    <div key={section.id || index} className={styles.contentSection}>
                        {/* Section Title with inline styles as fallback */}
                        {section.title && (
                            <h2
                                className={styles.sectionTitle}
                                style={{
                                    fontSize: '1.8rem',
                                    fontWeight: 'bold',
                                    marginTop: '2rem',
                                    marginBottom: '1rem',
                                    color: '#333'
                                }}
                            >
                                {section.title}
                            </h2>
                        )}

                        {/* Section Image */}
                        <img
                            src={section.image?.url}
                            alt={section.title || `${brand.Title} detail ${index + 1}`}
                            className={styles.gridImage}
                        />

                        {/* Section Description */}
                        <p
                            className={styles.sectionDescription}
                            style={{ marginTop: '1rem', marginBottom: '1rem' }}
                        >
                            {section.description}
                        </p>
                    </div>
                ))}
            </div>

            <nav className={styles.pagination}>
                {prevBrand ? (
                    <Link to={`/brands/${prevBrand.Slug}`} className={styles.navLink}>
                        ‹ {prevBrand.Title}
                    </Link>
                ) : <div />}

                {nextBrand ? (
                    <Link to={`/brands/${nextBrand.Slug}`} className={styles.navLink}>
                        {nextBrand.Title} ›
                    </Link>
                ) : <div />}
            </nav>
        </div>
    );
};