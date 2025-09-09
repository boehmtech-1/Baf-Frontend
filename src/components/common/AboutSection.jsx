
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../../styles/AboutSection.css';
import GlossyButton from '../buttons/mirrorbutton';

const AboutSection = ({ aboutData }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.4]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0.3, 0.8], [1.5, 1]);
  const contentY = useTransform(scrollYProgress, [0.7, 1], ['50px', '0px']);
  const contentOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="about-section">
      <div className="sticky-container">
        <motion.div
          className="title-wrapper"
          style={{ scale: titleScale, opacity: titleOpacity }}
        >
          <h1 className="main-title">More <span>About</span></h1>
          <h2 className="big-title">B A F</h2>
        </motion.div>
      </div>

      <div className="image-container">
        <motion.div
          className="image-wrapper"
          style={{ scale: imageScale }}
        >
          <img
            src={aboutData?.image || "https://framerusercontent.com/images/m5jsKAinALaB8jAlKLQAxA6GitQ.jpg"}
            alt="Woman in a modern interior"
            className="about-image"
          />
        </motion.div>
      </div>

      <motion.div
        className="content-container"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="content">
          <h3 className="content-title">
            {aboutData?.description1 || "Nestled in the heart of Baghdad, Bab Al Faouz — meaning The Gate of Omens — brings a fresh perspective to interior design."}
          </h3>
          <p className="content-text">
            {aboutData?.description2 || "We create refined living spaces that blend elegance, comfort, and purpose, unlocking a world of exquisite living experiences for our clients."}
          </p>
          <GlossyButton href="/about">Know More</GlossyButton>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;