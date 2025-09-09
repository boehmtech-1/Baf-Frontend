// src/components/Founder.jsx
import React from "react";
import styles from "../../styles/Founder.module.css";

const Founder = () => {
  return (
    <section className={styles.founderSection}>
      <div className={styles.container}>
        
        {/* Left Content */}
        <div className={styles.leftContent}>
          {/* Heading */}
          <div>
            <h2 className={styles.heading}>Our Founder</h2>
            <p className={styles.description}>
              Lorem ipsum is a dummy text commonly used in the english language.
            </p>
          </div>

          {/* Skills */}
          <div className={styles.skillsSection}>
            <div className={styles.skillsWrapper}>
              {[
                "Product Design",
                "Brand Identity Design",
                "Design",
                "Branding",
                "Brand Development",
                "Ideator",
                "Scaling",
              ].map((skill, index) => (
                <span key={index} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className={styles.experienceSection}>
            <div className={styles.experienceGrid}>
              <React.Fragment>
                <div className={styles.role}>Baab Al Fouz</div>
                <div className={styles.company}>GreenLeaf Co</div>
                <div className={styles.time}>Currently</div>
              </React.Fragment>
              <React.Fragment>
                <div className={styles.role}>Brand Designer</div>
                <div className={styles.company}>UrbanFit Studio</div>
                <div className={styles.time}>2023-24</div>
              </React.Fragment>
              <React.Fragment>
                <div className={styles.role}>Package Designer</div>
                <div className={styles.company}>GreenK Studio</div>
                <div className={styles.time}>2020-22</div>
              </React.Fragment>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className={styles.rightImage}>
          <img
            src="/founder.jpg" // replace with your image path
            alt="Founder"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default Founder;
