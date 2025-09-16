import { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from "../../styles/Navbar.module.css";
import { useBafData } from '../../hooks/useBafData';

const NavLink = ({ to, children }) => (
  <RouterNavLink to={to} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}>
    {children}
  </RouterNavLink>
);

const CatalogCard = ({ item, onLinkClick }) => {
  const getImageUrl = (item) => {
    if (item?.Image?.url) {
      return item.Image.url;
    }
    if (item?.image?.url) {
      return item.image.url;
    }
    return '';
  };

  return (
    <Link
      to={`/catalog/${item?.Slug || item?.id}`}
      onClick={onLinkClick}
      className="catalog-card block hover:shadow-md transition-all duration-200"
    >
      <div className="catalog-image">
        <img
          src={getImageUrl(item)}
          alt={item?.Title || item?.title || 'Catalog item'}
          className="w-full h-[100px] object-cover rounded-t-md"
        />
      </div>
      <div className="catalog-title text-sm p-2">
        {item?.Title || item?.title || 'Untitled'}
      </div>
    </Link>
  );
};

const CatalogOverlay = ({ isVisible, closeOverlay, catalogData }) => {
  const navigate = useNavigate();

  const handleViewAll = (e) => {
    e.preventDefault();
    closeOverlay();
    navigate('/catalog');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onMouseLeave={closeOverlay}
        >
          <div className={styles.overlayHeader}>
            <h2 className={styles.overlayTitle}>CATALOG</h2>
            <button
              onClick={handleViewAll}
              className={styles.viewAllLink}
            >
              View All →
            </button>
          </div>

          <div className={styles.overlayGrid}>
            {catalogData && catalogData.length > 0 ? (
              catalogData.slice(0, 4).map(item => (
                <CatalogCard
                  key={item.Slug || item.id}
                  item={item}
                  onLinkClick={closeOverlay}
                />
              ))
            ) : (
              <p className={styles.noData}>Loading catalog items...</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogHovered, setIsCatalogHovered] = useState(false);
  const { data, loading } = useBafData();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeCatalogOverlay = () => setIsCatalogHovered(false);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          <img src="https://framerusercontent.com/images/MbMVQhdqK8UexVjmCpUudcZgKGQ.png" alt="BAF Logo" />
        </Link>

        <div className={styles.navLinks}>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/about">ABOUT</NavLink>
          <NavLink to="/brands">BRANDS</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
          <div
            className={styles.catalogWrapper}
            onMouseEnter={() => setIsCatalogHovered(true)}
            onMouseLeave={() => setTimeout(closeCatalogOverlay, 200)}
          >
            <Link
              to="/catalog"
              className={styles.catalogButton}
              onClick={closeCatalogOverlay}
            >
              <svg className={styles.bookmarkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              CATALOG
            </Link>
            <CatalogOverlay
              isVisible={isCatalogHovered}
              closeOverlay={closeCatalogOverlay}
              catalogData={data?.catalog || []}
            />
          </div>
        </div>

        <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}>
            <span></span><span></span><span></span>
          </div>
        </button>

        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/about">ABOUT</NavLink>
          <NavLink to="/brands">BRANDS</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
          <NavLink to="/catalog">CATALOG</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;