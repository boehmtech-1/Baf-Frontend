import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './CatalogDetailPage.module.css';

const RichTextContent = ({ html }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export const CatalogDetailPage = () => {
    const { slug } = useParams();
    const [item, setItem] = useState(null);
    const [catalogData, setCatalogData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const response = await fetch('/api/catalog');
                const data = await response.json();

                if (data.docs) {
                    setCatalogData(data.docs);
                    const currentItem = data.docs.find(p => p.Slug === slug);
                    setItem(currentItem);
                }
            } catch (error) {
                console.error('Error fetching catalog:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCatalog();
    }, [slug]);

    if (loading) {
        return <div className={styles.pageWrapper}><h2>Loading...</h2></div>;
    }

    if (!item) {
        return <div className={styles.pageWrapper}><h2>Project not found</h2></div>;
    }

    const currentIndex = catalogData.findIndex(p => p.Slug === slug);
    const prevItem = catalogData[currentIndex - 1];
    const nextItem = catalogData[currentIndex + 1];

    // Format Content 2 if it's an object
    const formatContent2 = (content2) => {
        if (typeof content2 === 'string') return content2;

        if (content2 && typeof content2 === 'object') {
            let html = `<h2>${content2.heading || 'Details'}</h2>`;
            if (content2.subsections && content2.subsections.length > 0) {
                content2.subsections.forEach(sub => {
                    html += `<h3>${sub.subheading}</h3><p>${sub.content}</p>`;
                });
            }
            return html;
        }
        return null;
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.header}>
                <h1 className={styles.mainHeading}>{item.Title}</h1>
                {item["Team quote"] && <p className={styles.quote}>"{item["Team quote"]}"</p>}
            </div>

            <img
                src={item.Image?.url || item.Image}
                alt={item.Title}
                className={styles.mainImage}
            />

            <div className={styles.contentGrid}>
                {/* No Content 1 anymore based on your .ts file */}

                {/* Display images from imageGallery array */}
                {item.imageGallery && item.imageGallery.map((imgItem, index) => (
                    <img
                        key={imgItem.id || index}
                        src={imgItem.image?.url || imgItem.image}
                        alt={`Gallery ${index + 1}`}
                        className={styles.gridImage}
                    />
                ))}

                {/* Legacy support for Image 2-5 if they exist */}
                {item["Image 2"] && <img src={item["Image 2"]?.url || item["Image 2"]} alt="" className={styles.gridImage} />}
                {item["Image 3"] && <img src={item["Image 3"]?.url || item["Image 3"]} alt="" className={styles.gridImage} />}
                {item["Image 4"] && <img src={item["Image 4"]?.url || item["Image 4"]} alt="" className={styles.gridImage} />}
                {item["Image 5"] && <img src={item["Image 5"]?.url || item["Image 5"]} alt="" className={styles.gridImage} />}

                {/* Display Content 2 */}
                {item["Content 2"] && <RichTextContent html={formatContent2(item["Content 2"])} />}
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