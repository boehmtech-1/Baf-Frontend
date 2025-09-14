import React from 'react';

// The component is now the default export and directly accepts the 'testimonials' prop.
export default function TestimonialComponent({ testimonials = [] }) {
  // If no testimonials are passed, render nothing
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Convert API testimonials to the format expected by this component
  const formattedTestimonials = testimonials.map((testimonial, index) => ({
    id: testimonial.id || index,
    name: testimonial.name,
    title: testimonial.designation,
    quote: testimonial.description,
    rating: testimonial.stars || 5.0,
    initials: testimonial.name ? testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'NA',
    profileImage: testimonial.image?.url
  }));

  // Duplicate testimonials for the infinite scroll effect - we need at least 2 sets for seamless loop
  const infiniteTestimonials = [...formattedTestimonials, ...formattedTestimonials];

  const styles = {
    testimonialWrapper: {
      backgroundColor: '#000000',
      padding: '10px 0',
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
      gap: '24px', // Reduced gap between cards
      width: 'fit-content'
    },
    testimonialCard: {
      background: 'linear-gradient(180deg,#0d0d0d 0%, #000000 100%)',
      borderRadius: '0px',
      padding: '32px 24px', // Reduced padding for smaller cards
      minWidth: '500px', // Increased card width
      maxWidth: '500px', // Increased card width
      minHeight: '450px', // Increased card height
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left',
      flexShrink: 0,
      transition: 'transform 0.3s ease',
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
      fontFamily: "'Clash Display', sans-serif",
      color: '#ffffff',
      fontSize: '36px',
      fontWeight: '500', // Bruno Ace is typically available in a 400 weight
      margin: '0 0 6px 0',
      lineHeight: '1.3',
      textAlign: 'left',
      letterSpacing: '0.5px'
    },
    testimonialTitle: {
      fontFamily: "'Poppins', sans-serif",
      color: '#9ca3af',
      fontSize: '14px', // Reduced font size
      margin: '0 0 12px 0', // Adjusted margin to make space for the divider
      lineHeight: '1.4',
      textAlign: 'left'
    },
    divider: {
      width: '100%',
      height: '.75px',
      backgroundColor: '#333',
      margin: '0 0 20px 0',
    },
    testimonialQuote: {
      fontFamily: "'Bruno Ace', sans-serif",
      fontWeight: '100',
      WebkitFontSmoothing: 'antialiased', // For smoother font rendering on WebKit browsers
      MozOsxFontSmoothing: 'grayscale',  // For smoother font rendering on Firefox
      color: '#ffffffc8',
      fontSize: '12px', // Further reduced font size to make it appear less bold
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
      color: '#ffffffd2',
      fontSize: '22px', // Reduced font size
      fontWeight: '100'
    },
    stars: {
      display: 'flex',
      gap: '4px'
    },
    star: {
      color: '#fbbf24',
      fontSize: '20px' // Reduced star size
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
    // Calculate the width of one complete set of testimonials
    const cardWidth = 500; // card width
    const gap = 24; // gap between cards
    const totalTestimonials = formattedTestimonials.length;
    const oneSetWidth = (cardWidth * totalTestimonials) + (gap * (totalTestimonials - 1));

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes scroll-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${oneSetWidth + gap}px); }
      }
      .testimonial-track {
        animation: scroll-left ${totalTestimonials * 3}s linear infinite !important;
      }
      .testimonial-fader-container::before,
      .testimonial-fader-container::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 150px;
        z-index: 2;
        pointer-events: none;
      }
      .testimonial-fader-container::before {
        left: 0;
        background: linear-gradient(to right, #000000, transparent);
      }
      .testimonial-fader-container::after {
        right: 0;
        background: linear-gradient(to left, #000000, transparent);
      }
      .testimonial-card:hover { transform: translateY(-4px) !important; }
      @media (max-width: 768px) {
        .testimonial-card { min-width: 380px !important; max-width: 380px !important; padding: 24px 20px !important; }
      }
      @media (max-width: 480px) {
        .testimonial-card { min-width: 320px !important; max-width: 320px !important; }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [formattedTestimonials.length]);

  return (
    <section className="min-h-screen bg-black px-6 py-2">
      <div className="max-w-7xl mx-auto">
        <div style={styles.testimonialWrapper}>
          <div className="testimonial-fader-container" style={styles.testimonialContainer}>
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
                  <div style={styles.divider} />
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