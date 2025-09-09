// src/components/HeroSection/HeroSection.jsx
import { motion } from 'framer-motion';
import styles from '../../styles/HeroSection.module.css';
import GlossyButton from '../buttons/mirrorbutton.jsx';
import UnicornStudioEmbed from '../animations/UnicornStudioEmbed';

const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // slower stagger per word
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', damping: 15, stiffness: 100 },
  },
};

export const HeroSection = () => {
  const title = ["Exquisite", "Living"]; // split by words
  const unicornProjectId = "JKeB2qPLyTm1e8kfV4Xc";

  return (
    <section className={styles.heroSection}>
      <div className={styles.videoOverlay} />
      <UnicornStudioEmbed
        projectId={unicornProjectId}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          height: '120vh', /* extend background */
          width: '100%'
        }}
      />
      <div className={styles.contentWrapper}>
        <motion.h1
          className={styles.mainHeading}
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {title.map((word, index) => (
            <motion.span key={index} variants={wordVariants}>
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className={styles.buttonContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <GlossyButton href="/contact">Book a Consultation</GlossyButton>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className={styles.scrollButton}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
