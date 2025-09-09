// src/components/TeamSection/TeamSection.jsx
import styles from '../../styles/TeamSection.module.css';
import { TeamMemberCard } from '../cards/TeamMemberCard';

// Team member data is now in a clean, easy-to-edit array
const teamData = [
  {
    name: 'Emma Rose',
    role: 'Designer',
    imageUrl: 'https://framerusercontent.com/images/4vCw29fGMa9alVVWbBPo8m28rI.jpg',
    
  },
  {
    name: 'Sophia Lane',
    role: 'Designer',
    imageUrl: 'https://framerusercontent.com/images/hXSgLbX1DHdIvNuqZAxaObV7F7M.jpg',
    
  },
  {
    name: 'Jane Doe',
    role: 'Designer',
    imageUrl: 'https://framerusercontent.com/images/0jcsMweWJqlRpOFqV5Ujep9v0PE.jpg',
    
  },
  {
    name: 'Olivia Tate',
    role: 'Designer',
    imageUrl: 'https://framerusercontent.com/images/4pKpjWLog2qGYpoySWdeBFTJew.jpg',
    
  },
];

export const TeamSection = () => {
  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <span className={styles.tag}></span>
          <h2 className={styles.heading}>Meet the experts behind the Designs</h2>
        </div>
        <div className={styles.grid}>
          {teamData.map((member) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              imageUrl={member.imageUrl}
              socialLink={member.socialLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default TeamSection;