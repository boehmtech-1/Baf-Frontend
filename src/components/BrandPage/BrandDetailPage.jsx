import { useParams, Link } from 'react-router-dom';
import styles from './BrandDetailPage.module.css'; // Corrected import path
import brandsData from '../../components/CMS/data/brandsData.json';

const RichTextContent = ({ html }) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
);

export const BrandDetailPage = () => {
    const { slug } = useParams();
    const brand = brandsData.find(p => p.Slug === slug);

    if (!brand) {
        return <div className={styles.pageWrapper}><h2>Brand not found</h2></div>;
    }

    const currentIndex = brandsData.findIndex(p => p.Slug === slug);
    const prevBrand = brandsData[currentIndex - 1];
    const nextBrand = brandsData[currentIndex + 1];

    const images = [brand['Image 1'], brand['Image 2'], brand['Image 3']].filter(Boolean);
    const contents = [brand['Content 2'], brand['Content 3'], brand['Content 4']].filter(Boolean);

    return (
        <div className={styles.pageWrapper}>
            <header className={styles.header}>
                <h1 className={styles.mainHeading}>{brand.Title}</h1>
            </header>
            
            <img src={brand['Main Image']} alt={brand.Title} className={styles.mainImage} />

            <div className={styles.contentArea}>
                <RichTextContent html={brand.Content} />
                
                {images.map((img, index) => (
                    <img key={index} src={img} alt={`${brand.Title} detail ${index + 1}`} className={styles.gridImage} />
                ))}

                {contents.map((content, index) => (
                    <RichTextContent key={index} html={content} />
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
