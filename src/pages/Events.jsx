// src/pages/Events.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events?limit=100&depth=1');
                setEvents(response.data.docs || []);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <div>Loading events...</div>;

    return (
        <div className="events-page">
            <h1>All Events</h1>
            <div className="events-grid">
                {events.map((event) => (
                    <Link
                        key={event.id}
                        to={`/events/${event.slug}`}
                        className="event-card"
                    >
                        <h3>{event.title || event.event_name}</h3>
                        <p>{event.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default EventsPage;