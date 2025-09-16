// src/components/EventDetail/EventDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import styles from './EventDetail.module.css';
import MirrorButton from '../components/buttons/mirrorbutton';

const EventDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all events and current event
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                setLoading(true);

                // Try multiple approaches to ensure we get the data

                // Approach 1: Get all events with maximum depth
                const eventsResponse = await axios.get('/api/events', {
                    params: {
                        limit: 100,
                        depth: 10, // Maximum depth to ensure all nested data is populated
                        sort: '-date'
                    }
                });

                console.log('Full API Response:', eventsResponse.data);

                const allEvents = eventsResponse.data.docs || [];
                setEvents(allEvents);

                // Find current event by slug
                const currentEvent = allEvents.find(e => e.slug === slug);

                if (currentEvent) {
                    setEvent(currentEvent);
                    console.log('Current event full data:', currentEvent);
                    console.log('Speakers array:', currentEvent.speakers);

                    // Log each speaker to see the structure
                    if (currentEvent.speakers && currentEvent.speakers.length > 0) {
                        currentEvent.speakers.forEach((speaker, index) => {
                            console.log(`Speaker ${index}:`, speaker);
                            console.log(`Speaker ${index} image:`, speaker.image);
                        });
                    }
                } else {
                    // Approach 2: If not found, try fetching specific event
                    const specificEventRes = await axios.get('/api/events', {
                        params: {
                            where: {
                                slug: {
                                    equals: slug
                                }
                            },
                            depth: 10
                        }
                    });

                    console.log('Specific event response:', specificEventRes.data);

                    if (specificEventRes.data.docs && specificEventRes.data.docs.length > 0) {
                        const eventData = specificEventRes.data.docs[0];
                        setEvent(eventData);
                        setEvents([eventData]); // Set single event for navigation
                    } else {
                        setError('Event not found');
                    }
                }
            } catch (err) {
                console.error('Error fetching event data:', err);
                console.error('Error response:', err.response);
                setError('Failed to load event data');
            } finally {
                setLoading(false);
            }
        };

        fetchEventData();
    }, [slug]);

    // Calculate next and previous events
    const currentIndex = events.findIndex(e => e.slug === slug);

    const getAdjacentEvent = (direction) => {
        if (events.length <= 1) return null;

        if (direction === 'next') {
            const nextIndex = (currentIndex + 1) % events.length;
            return events[nextIndex];
        } else {
            const prevIndex = (currentIndex - 1 + events.length) % events.length;
            return events[prevIndex];
        }
    };

    const nextEvent = currentIndex !== -1 ? getAdjacentEvent('next') : null;
    const prevEvent = currentIndex !== -1 ? getAdjacentEvent('prev') : null;

    const handleNavigation = (targetSlug) => {
        if (targetSlug) {
            navigate(`/events/${targetSlug}`);
            window.scrollTo(0, 0);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Date TBD';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    // Helper function to get image URL
    const getImageUrl = (image) => {
        if (!image) return null;
        if (typeof image === 'string') return image;
        if (image.url) return image.url;
        if (image.filename) return `/media/${image.filename}`;
        return null;
    };

    // Loading state
    if (loading) {
        return (
            <section className={styles.eventDetailSection}>
                <div className={styles.loading}>
                    <div className={styles.loadingSpinner}></div>
                    <h2>Loading event...</h2>
                </div>
            </section>
        );
    }

    // Error or not found state
    if (error || !event) {
        return (
            <section className={styles.eventDetailSection}>
                <div className={styles.error}>
                    <h2 className={styles.errorTitle}>Event Not Found</h2>
                    <p className={styles.errorMessage}>
                        {error || "The event you're looking for doesn't exist."}
                    </p>
                    <MirrorButton onClick={() => navigate('/events')}>
                        Back to Events
                    </MirrorButton>
                </div>
            </section>
        );
    }

    // Main render
    return (
        <section className={styles.eventDetailSection}>
            {/* Navigation Controls */}
            <div className={styles.navigationControls}>
                <MirrorButton
                    onClick={() => handleNavigation(prevEvent?.slug)}
                    disabled={!prevEvent}
                    className={styles.navButton}
                >
                    ‹ Previous Event
                </MirrorButton>



                <MirrorButton
                    onClick={() => handleNavigation(nextEvent?.slug)}
                    disabled={!nextEvent}
                    className={styles.navButton}
                >
                    Next Event ›
                </MirrorButton>
            </div>

            {/* Event Header */}
            <motion.div
                className={styles.eventHeader}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className={styles.statusBadgeContainer}>
                    <span className={`${styles.statusBadge} ${styles[event.status || 'upcoming']}`}>
                        {event.status || 'upcoming'}
                    </span>
                </div>

                <h1 className={styles.eventTitle}>{event.title || event.event_name}</h1>

                <div className={styles.eventMeta}>
                    <div className={styles.metaItem}>
                        <span className={styles.metaIcon}></span>
                        <span>{formatDate(event.date)}</span>
                    </div>
                    {event.location && (
                        <div className={styles.metaItem}>
                            <span className={styles.metaIcon}></span>
                            <span>{event.location}</span>
                        </div>
                    )}
                    {event.category && (
                        <div className={styles.metaItem}>
                            <span className={styles.metaIcon}> </span>
                            <span className={styles.category}>{event.category}</span>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Event Image */}
            {event.image && (
                <motion.div
                    className={styles.eventImageContainer}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <img
                        src={getImageUrl(event.image)}
                        alt={event.title || event.event_name}
                        className={styles.eventImage}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-event.jpg';
                        }}
                    />
                </motion.div>
            )}

            {/* Event Content */}
            <motion.div
                className={styles.eventContent}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <div className={styles.contentGrid}>
                    <div className={styles.mainContent}>
                        <h2 className={styles.contentTitle}>About This Event</h2>

                        {event.description && (
                            <div className={styles.description}>
                                <p>{event.description}</p>
                            </div>
                        )}

                        {event.content && (
                            <div className={styles.richContent}>
                                <h3 className={styles.contentSubtitle}>Event Details</h3>
                                <p>{event.content}</p>
                            </div>
                        )}

                        {event.registrationLink && event.status !== 'completed' && event.status !== 'cancelled' && (
                            <div className={styles.registrationSection}>
                                <h3 className={styles.ctaTitle}>Ready to Join?</h3>
                                <p className={styles.ctaDescription}>
                                    Secure your spot at this {event.category || 'event'}.
                                </p>
                                <MirrorButton
                                    href={event.registrationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.primaryButton}
                                >
                                    Register Now
                                </MirrorButton>
                            </div>
                        )}
                    </div>

                    <div className={styles.sidebar}>
                        {/* Event Details Card */}
                        <div className={styles.detailsCard}>
                            <h3 className={styles.detailsTitle}>Event Information</h3>

                            <div className={styles.detailsList}>
                                <div className={styles.detailItem}>
                                    <strong>Start Date:</strong>
                                    <span>{formatDate(event.date)}</span>
                                </div>

                                {event.endDate && (
                                    <div className={styles.detailItem}>
                                        <strong>End Date:</strong>
                                        <span>{formatDate(event.endDate)}</span>
                                    </div>
                                )}

                                {event.location && (
                                    <div className={styles.detailItem}>
                                        <strong>Location:</strong>
                                        <span>{event.location}</span>
                                    </div>
                                )}

                                {event.category && (
                                    <div className={styles.detailItem}>
                                        <strong>Category:</strong>
                                        <span className={styles.categoryBadge}>
                                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                                        </span>
                                    </div>
                                )}

                                <div className={styles.detailItem}>
                                    <strong>Status:</strong>
                                    <span className={`${styles.statusText} ${styles[event.status || 'upcoming']}`}>
                                        {(event.status || 'upcoming').charAt(0).toUpperCase() + (event.status || 'upcoming').slice(1)}
                                    </span>
                                </div>
                            </div>

                            {event.registrationLink && event.status !== 'completed' && event.status !== 'cancelled' && (
                                <div className={styles.cardActions}>

                                </div>
                            )}
                        </div>

                        {/* Speakers Section */}
                        {event.speakers && event.speakers.length > 0 ? (
                            <div className={styles.speakersSection}>
                                <h3 className={styles.speakersTitle}>Featured Speakers</h3>
                                <div className={styles.speakersList}>
                                    {event.speakers.map((speaker, index) => {
                                        console.log(`Rendering speaker ${index}:`, speaker);

                                        return (
                                            <div key={`speaker-${index}`} className={styles.speakerItem}>
                                                <div className={styles.speakerImageWrapper}>
                                                    {speaker.image ? (
                                                        <img
                                                            src={getImageUrl(speaker.image)}
                                                            alt={speaker.name}
                                                            className={styles.speakerImage}
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                const initials = e.target.nextElementSibling;
                                                                if (initials) initials.style.display = 'flex';
                                                            }}
                                                        />
                                                    ) : null}
                                                    <div
                                                        className={styles.speakerInitials}
                                                        style={{ display: speaker.image ? 'none' : 'flex' }}
                                                    >
                                                        {speaker.name ? speaker.name.split(' ').map(n => n[0]).join('').toUpperCase() : '??'}
                                                    </div>
                                                </div>
                                                <div className={styles.speakerInfo}>
                                                    <h4 className={styles.speakerName}>{speaker.name || 'Unknown Speaker'}</h4>
                                                    {speaker.role && (
                                                        <p className={styles.speakerRole}>{speaker.role}</p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.speakersSection}>
                                <p style={{ color: '#666', fontStyle: 'italic' }}>
                                    No speakers listed for this event
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>






        </section>
    );
};

export default EventDetailPage;