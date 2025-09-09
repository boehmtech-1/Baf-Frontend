// src/components/Navbar/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Navbar.module.css';

const NavLink = ({ href, children }) => (
  <a href={href} className={styles.navLink}>
    {children}
  </a>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);

      // show when at top or menu open
      if (isMenuOpen || currentY <= 80) {
        setIsHidden(false);
        lastScrollY.current = currentY;
        return;
      }

      // hide on down, show on up
      if (currentY > lastScrollY.current) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


    
  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isHidden ? styles.headerHidden : ''}`}>
      <nav className={styles.navbar}>
        <a href="/" className={styles.logo}>
          <img src="https://framerusercontent.com/images/MbMVQhdqK8UexVjmCpUudcZgKGQ.png" alt="BAF Logo" />
        </a>

        <div className={styles.navLinks}>
          <NavLink href="/">HOME</NavLink>
          <NavLink href="/about">ABOUT</NavLink>
          <NavLink href="/brands">BRANDS</NavLink>
          <NavLink href="/contact">CONTACT</NavLink>
          <a href="/catalog" className={styles.catalogButton}>CATALOG</a>
        </div>

        <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle menu">
          <div className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
          <NavLink href="/">HOME</NavLink>
          <NavLink href="/about">ABOUT</NavLink>
          <NavLink href="/brands">BRANDS</NavLink>
          <NavLink href="/contact">CONTACT</NavLink>
          {/* === FIX IS HERE === */}
          <a href="/catalog" className={`${styles.catalogButton} ${styles.catalogButtonMobile}`}>CATALOG</a>
        </div>
      </nav>
    </header>
  );
};