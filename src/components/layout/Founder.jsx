// src/components/Founder.jsx
import React, { useState, useEffect } from "react";
import styles from "../../styles/Founder.module.css";

const Founder = () => {
  const [founderData, setFounderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFounderData = async () => {
      try {
        const response = await fetch('/api/founder?limit=1');

        if (!response.ok) {
          throw new Error('Failed to fetch founder data');
        }

        const data = await response.json();
        console.log('Founder API Response:', data);

        if (data.docs && data.docs.length > 0) {
          setFounderData(data.docs[0]);
        } else {
          throw new Error('No founder data found');
        }
      } catch (error) {
        console.error('Error fetching founder data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFounderData();
  }, []);

  if (loading) {
    return (
      <section className={styles.founderSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
            Loading founder information...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.founderSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
            Error: {error}
          </div>
        </div>
      </section>
    );
  }

  if (!founderData) {
    return (
      <section className={styles.founderSection}>
        <div className={styles.container}>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
            No founder information available.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.founderSection}>
      <div className={styles.container}>

        {/* Left Content */}
        <div className={styles.leftContent}>
          {/* Heading */}
          <div>
            <h2 className={styles.heading}>Our Founder</h2>
            <p className={styles.description}>
              {founderData.description}
            </p>
          </div>

          {/* Skills */}
          {founderData.skills && founderData.skills.length > 0 && (
            <div className={styles.skillsSection}>
              <div className={styles.skillsWrapper}>
                {founderData.skills.map((skillItem, index) => (
                  <span key={index} className={styles.skillTag}>
                    {skillItem.skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {founderData.experience && founderData.experience.length > 0 && (
            <div className={styles.experienceSection}>
              <div className={styles.experienceGrid}>
                {founderData.experience.map((exp, index) => (
                  <React.Fragment key={index}>
                    <div className={styles.role}>{exp.role}</div>
                    <div className={styles.company}>{exp.company}</div>
                    <div className={styles.time}>{exp.time}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Image */}
        <div className={styles.rightImage}>
          {founderData.image?.url ? (
            <img
              src={founderData.image.url}
              alt={founderData.name || "Founder"}
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              No image available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Founder;