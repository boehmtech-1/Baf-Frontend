// src/components/TeamSection/TeamMemberCard.jsx
import styles from './TeamMemberCard.module.css';

export const TeamMemberCard = ({ name, role, imageUrl }) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles.info}>
        <div className={styles.details}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.role}>{role}</p>
        </div>
      </div>
    </div>
  );
};