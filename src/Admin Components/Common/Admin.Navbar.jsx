import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Navbar.module.css';

const NavLink = ({ href, children }) => (
  <a href={href} className={styles.navLink}>
    {children}
  </a>
);

export const AdminNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isHidden ? styles.headerHidden : ''}`}>
      <nav className={styles.navbar}>
        <a href="/admin" className={styles.logo}>
          <img src="https://framerusercontent.com/images/MbMVQhdqK8UexVjmCpUudcZgKGQ.png" alt="BAF Logo" />
          
        </a>

        <div className={styles.navLinks}>
          <NavLink href="/">HOME</NavLink>
          <NavLink href="/about">ABOUT</NavLink>
          <NavLink href="/brands">BRANDS</NavLink>
          <NavLink href="/contact">CONTACT</NavLink>
          <a href="/catalog" className={styles.catalogButton}>CATALOG</a>
          
          <button 
            onClick={handleLogout}
            style={{
              background: 'rgba(220, 38, 38, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '120px',
              padding: '4px 20px',
              color: 'white',
              fontFamily: "'Bruno Ace', sans-serif",
              fontSize: '12px',
              cursor: 'pointer',
              marginLeft: '12px'
            }}
          >
            LOGOUT
          </button>
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
          <a href="/catalog" className={`${styles.catalogButton} ${styles.catalogButtonMobile}`}>CATALOG</a>
          
          <button 
            onClick={handleLogout}
            style={{
              background: 'rgba(220, 38, 38, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '120px',
              padding: '4px 20px',
              color: 'white',
              fontFamily: "'Bruno Ace', sans-serif",
              fontSize: '12px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            LOGOUT
          </button>
        </div>
      </nav>
    </header>
  );
};

export default AdminNavbar;