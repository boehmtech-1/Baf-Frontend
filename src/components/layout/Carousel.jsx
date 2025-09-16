import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Carousel = ({ events = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCenterCardHovered, setIsCenterCardHovered] = useState(false);

  const navigate = useNavigate();

  const rawCms = import.meta.env.VITE_CMS_URL;
  const cmsUrl = rawCms.replace(/\/+$/, '');

  if (events.length === 0) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">No Events to display.</div>
      </div>
    );
  }

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex, events.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const getCardPosition = (index) => {
    const totalItems = events.length;
    if (index === currentIndex) return 'center';
    const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
    if (index === prevIndex) return 'left';
    const nextIndex = (currentIndex + 1) % totalItems;
    if (index === nextIndex) return 'right';
    return 'hidden';
  };

  const cardVariants = {
    center: {
      x: '0%',
      scale: 1,
      rotateY: 0,
      opacity: 1,
      zIndex: 10,
      filter: 'grayscale(100%)',
      z: 50,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    left: {
      x: '-90%',
      scale: 0.8,
      rotateY: -45,
      opacity: 0.4,
      zIndex: 5,
      filter: 'grayscale(100%)',
      z: -200,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    right: {
      x: '90%',
      scale: 0.8,
      rotateY: 45,
      opacity: 0.4,
      zIndex: 5,
      filter: 'grayscale(100%)',
      z: -200,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    hidden: { scale: 0.5, opacity: 0, zIndex: 1 }
  };

  const handleCardClick = (index, position) => {
    if (position === 'center') {
      const event = events[index];
      console.log('Clicked event:', event);

      if (event.slug) {
        navigate(`/events/${event.slug}`);
      } else if (event.id || event._id) {
        console.warn('Event has no slug, using ID:', event.id || event._id);
        navigate(`/events/${event.id || event._id}`);
      } else {
        console.error('Event has no slug or ID:', event);
        navigate('/events');
      }
    } else {
      setCurrentIndex(index);
    }
  };

  return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div
        style={{ position: 'relative', width: '100%', maxWidth: '95vw', margin: 'auto' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div style={{ position: 'relative', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1200px', transformStyle: 'preserve-3d' }}>

          <button onClick={prevSlide} style={{ position: 'absolute', left: 'calc(50% - 35vh)', top: '50%', transform: 'translateY(-50%) translateZ(100px)', zIndex: 30, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', borderRadius: '9999px', padding: '0.5rem', color: '#fff' }}>
            <ChevronLeft size={28} />
          </button>

          <AnimatePresence initial={false}>
            {events.map((item, index) => {
              const position = getCardPosition(index);
              const imageUrl = item.image && item.image.url
                ? `${item.image.url}?v=${new Date(item.image.updatedAt).getTime()}`
                : 'No image URL';

              return (
                <motion.div
                  key={item._id || item.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate={position}
                  whileHover={position === 'center' ? {
                    filter: 'grayscale(0%)',
                    transition: { duration: 0.4, ease: 'easeOut' }  // <-- ADD THIS for smooth transition
                  } : {}}
                  onClick={() => handleCardClick(index, position)}
                  onMouseEnter={() => {
                    if (position === 'center') setIsCenterCardHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (position === 'center') setIsCenterCardHovered(false);
                  }}
                  style={{
                    position: 'absolute',
                    width: '80vh',
                    height: '60vh',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#111'
                  }}
                >
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%'
                    }}
                    animate={{
                      scale: position === 'center' && isCenterCardHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={imageUrl === 'No image URL' ? '' : imageUrl}
                      alt={item.title || item.event_name}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)' }} />

                    {position === 'center' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 20 }}
                      >
                        <motion.div
                          style={{
                            width: '100%', maxWidth: '24rem', padding: '.2rem 1rem', borderRadius: '1rem',
                            backgroundColor: isCenterCardHovered ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 style={{ fontFamily: 'Antonio, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#fff', textShadow: '0 2px 5px rgba(0,0,0,0.5)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                            {item.title || item.event_name}
                          </h3>
                          <p style={{ fontFamily: 'Bruno Ace SC, monospace', fontSize: '0.75rem', color: '#e5e5e5', lineHeight: 1.5, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                            {item.description}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <button onClick={nextSlide} style={{ position: 'absolute', right: 'calc(50% - 35vh)', top: '50%', transform: 'translateY(-50%) translateZ(100px)', zIndex: 30, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', borderRadius: '9999px', padding: '0.5rem', color: '#fff' }}>
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </div >
  );
};

export default Carousel;