import React from 'react';

// The component is now the default export and directly accepts the 'testimonials' prop.
export default function TestimonialComponent({ testimonials = [] }) {
  // If no testimonials are passed, render nothing
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Convert API testimonials to the format expected by this component
  const formattedTestimonials = testimonials.map((testimonial, index) => ({
    id: testimonial._id || index,
    name: testimonial.name,
    title: testimonial.designation,
    quote: testimonial.description,
    rating: testimonial.stars || 5.0,
    initials: testimonial.name ? testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'NA',
    profileImage: testimonial.profileImage
  }));

  // Duplicate testimonials for the infinite scroll effect
  const infiniteTestimonials = [...formattedTestimonials, ...formattedTestimonials, ...formattedTestimonials];

  const styles = {
    testimonialWrapper: {
      backgroundColor: '#000000',
      padding: '80px 0',
      overflow: 'hidden',
      width: '100%',
      minHeight: '100vh'
    },
    testimonialContainer: {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      minHeight: '80vh'
    },
    testimonialTrack: {
      display: 'flex',
      animation: 'scroll-left 9s linear infinite', // Slower animation for better readability
      gap: '24px' // Reduced gap between cards
    },
    testimonialCard: {
      background: 'linear-gradient(180deg,#0d0d0d 0%, #000000 100%)',
      borderRadius: '0px',
      padding: '32px 24px', // Reduced padding for smaller cards
      minWidth: '450px', // Reduced card width
      maxWidth: '450px', // Reduced card width
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left',
      flexShrink: 0,
      transition: 'transform 0.3s ease',
      border: '1px solid #333'
    },
    profileImage: {
      width: '80px', // Reduced profile image size
      height: '80px', // Reduced profile image size
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px', // Reduced margin
      overflow: 'hidden'
    },
    profileImageImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    initials: {
      color: 'white',
      fontSize: '24px', // Reduced font size
      fontWeight: '600'
    },
    testimonialName: {
      color: '#ffffff',
      fontSize: '20px', // Reduced font size
      fontWeight: '600',
      margin: '0 0 6px 0',
      lineHeight: '1.3',
      textAlign: 'left'
    },
    testimonialTitle: {
      color: '#9ca3af',
      fontSize: '14px', // Reduced font size
      margin: '0 0 20px 0', // Reduced margin
      lineHeight: '1.4',
      textAlign: 'left'
    },
    testimonialQuote: {
      color: '#ffffff',
      fontSize: '16px', // Reduced font size
      lineHeight: '1.6',
      margin: '0 0 24px 0', // Reduced margin
      flexGrow: 1,
      textAlign: 'left'
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      alignSelf: 'flex-start'
    },
    ratingNumber: {
      color: '#ffffff',
      fontSize: '16px', // Reduced font size
      fontWeight: '500'
    },
    stars: {
      display: 'flex',
      gap: '2px'
    },
    star: {
      color: '#fbbf24',
      fontSize: '16px' // Reduced star size
    }
  };

  const StarRating = ({ rating }) => (
    <div style={styles.ratingContainer}>
      <span style={styles.ratingNumber}>{rating.toFixed(1)}</span>
      <div style={styles.stars}>
        {[...Array(5)].map((_, index) => (
          <span key={index} style={styles.star}>★</span>
        ))}
      </div>
    </div>
  );

  // Add keyframe animation to the document head
  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes scroll-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-33.333%); }
      }
      .testimonial-card:hover { transform: translateY(-4px) !important; }
      @media (max-width: 768px) {
        .testimonial-card { min-width: 350px !important; max-width: 350px !important; padding: 24px 20px !important; }
      }
      @media (max-width: 480px) {
        .testimonial-card { min-width: 300px !important; max-width: 300px !important; }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <section className="min-h-screen bg-black px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">What Our Clients Say</h2>
        <div style={styles.testimonialWrapper}>
          <div style={styles.testimonialContainer}>
            <div className="testimonial-track" style={styles.testimonialTrack}>
              {infiniteTestimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="testimonial-card" style={styles.testimonialCard}>
                  <div style={styles.profileImage}>
                    {testimonial.profileImage ? (
                      <img
                        src={testimonial.profileImage}
                        alt={testimonial.name}
                        style={styles.profileImageImg}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <span style={{ ...styles.initials, display: testimonial.profileImage ? 'none' : 'flex' }}>
                      {testimonial.initials}
                    </span>
                  </div>
                  <h3 style={styles.testimonialName}>{testimonial.name}</h3>
                  <p style={styles.testimonialTitle}>{testimonial.title}</p>
                  <p style={styles.testimonialQuote}>"{testimonial.quote}"</p>
                  <StarRating rating={testimonial.rating} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};