import { Facebook, Instagram } from 'lucide-react';
import XLogo from '../icons/XLogo'; // use our custom logo
import MirrorButton from '../buttons/mirrorbutton';
import styles from './footer.module.css';

const socialLinks = [
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://x.com/home", icon: XLogo, label: "X" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
];

const legalLinks = [
  { href: "/privacy", text: "Privacy Policy" },
  { href: "/cookies", text: "Cookie Policy" },
  { href: "/terms", text: "Terms of Use" },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.heading}>
            Unlock the Doors to Exquisite Living.
          </h2>
          
          <div className={styles.ctaGroup}>
            <MirrorButton href="/contact">Book a Free Call</MirrorButton>
            <MirrorButton href="/contact">Book a Consultation</MirrorButton>
          </div>

          {/* Social Links with vertical separators */}
          <div className={styles.socials}>
            {socialLinks.map((link, index) => (
              <div key={link.label} className={styles.socialItem}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIconLink}
                >
                  <link.icon className={styles.socialIcon} />
                </a>
                {index < socialLinks.length - 1 && (
                  <span className={styles.socialSeparator} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>© 2025 B.A.F</p>
        <nav className={styles.legalNav}>
          {legalLinks.map((link) => (
            <a key={link.text} href={link.href} className={styles.legalLink}>
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};
