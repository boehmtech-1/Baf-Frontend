
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

  const rawCms = import.meta.env.VITE_CMS_URL;
  const cmsUrl = rawCms.replace(/\/+$/, '');

  let imageUrl;
  if (typeof aboutData?.image === 'string') {
    imageUrl = aboutData.image;
  } else if (aboutData?.image?.url) {
    // The API provides a full, absolute URL in `aboutData.image.url`.
    // We use this URL directly. A cache-busting parameter is added
    // using `updatedAt` to ensure the latest image is always displayed.
    imageUrl = `${aboutData.image.url}?v=${new Date(aboutData.image.updatedAt).getTime()}`;
  } else {
    imageUrl = "https://framerusercontent.com/images/m5jsKAinALaB8jAlKLQAxA6GitQ.jpg";
  }

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
            src={imageUrl}
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
            {aboutData?.description1}
          </h3>
          <p className="content-text">
            {aboutData?.description2}
          </p>
          <GlossyButton href="/about">Know More</GlossyButton>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;