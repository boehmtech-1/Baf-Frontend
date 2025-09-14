// src/components/TeamSection/TeamSection.jsx
import { useState, useEffect } from 'react';
import styles from '../../styles/TeamSection.module.css';
import { TeamMemberCard } from '../cards/TeamMemberCard';

export const TeamSection = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('/api/team');

        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }

        const data = await response.json();
        console.log('Team API Response:', data);

        if (data.docs && data.docs.length > 0) {
          // Transform the API data to match the component's expected format
          const transformedTeam = data.docs.map(member => ({
            name: member.name,
            role: member.designation || 'Designer', // Use designation as role, default to 'Designer'
            imageUrl: member.image?.url || '',
            socialLink: member.socialLink || '', // If you add this field later
          }));

          setTeamData(transformedTeam);
        } else {
          throw new Error('No team members found');
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.headingWrapper}>
            <span className={styles.tag}></span>
            <h2 className={styles.heading}>Meet the experts behind the Designs</h2>
          </div>
          <div className={styles.grid}>
            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem', color: '#999' }}>
              Loading team members...
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.headingWrapper}>
            <span className={styles.tag}></span>
            <h2 className={styles.heading}>Meet the experts behind the Designs</h2>
          </div>
          <div className={styles.grid}>
            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem', color: '#ff6b6b' }}>
              Error: {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (teamData.length === 0) {
    return (
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.headingWrapper}>
            <span className={styles.tag}></span>
            <h2 className={styles.heading}>Meet the experts behind the Designs</h2>
          </div>
          <div className={styles.grid}>
            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem', color: '#999' }}>
              No team members available.
            </div>
          </div>
        </div>
      </section>
    );
  }

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