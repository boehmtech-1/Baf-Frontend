// AdminCarousel.jsx

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Edit, Trash2, Plus, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminCarousel = ({ events: eventsProp = [], onUpdateEvent, onDeleteEvent, onAddEvent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCenterCardHovered, setIsCenterCardHovered] = useState(false);
  
  const [editingCard, setEditingCard] = useState(null);
  const [editForm, setEditForm] = useState({ event_name: '', description: '', image: null });
  const [localEvents, setLocalEvents] = useState(eventsProp);

  const rawCms = import.meta.env.VITE_CMS_URL || 'https://baf-backend-18y5.onrender.com';
  const cmsUrl = rawCms.replace(/\/+$/, '');

  // --- NEW DEBUGGING LOG ---
  // This will show you the state of the form in real-time.
  useEffect(() => {
    console.log('📝 Edit form state changed:', editForm);
  }, [editForm]);
  // --- END ---

  useEffect(() => {
    setLocalEvents(eventsProp);
  }, [eventsProp]);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('adminToken') || '';
      const res = await fetch(`${cmsUrl}/api/events`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await res.json();
      setLocalEvents(Array.isArray(data) ? data : []);
      setCurrentIndex(0);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  useEffect(() => {
    if (!eventsProp.length) {
      fetchEvents();
    }
  }, [eventsProp]);

  if (localEvents.length === 0 && editingCard !== 'new') {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center relative">
        <div className="text-white text-xl">No events yet. Click + to add one.</div>
        <button
          onClick={() => handleAddNew()}
          style={{
            position: 'fixed',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            zIndex: 50,
            transition: 'all 0.3s ease'
          }}
        >
          <Plus size={28} />
        </button>
      </div>
    );
  }

  useEffect(() => {
    if (isPaused || editingCard) return;
    const interval = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex, localEvents.length, editingCard]);

  const nextSlide = () => {
    if (localEvents.length) setCurrentIndex((prev) => (prev + 1) % localEvents.length);
  };

  const prevSlide = () => {
    if (localEvents.length) setCurrentIndex((prev) => (prev - 1 + localEvents.length) % localEvents.length);
  };

  const handleEdit = (item, event) => {
    event.stopPropagation();
    setEditingCard(item._id);
    setEditForm({
      event_name: item.event_name,
      description: item.description,
      image: null // Reset image state
    });
    setIsPaused(true);
  };

  const handleSaveEdit = async (event) => {
    event.stopPropagation();
    try {
      const token = localStorage.getItem('adminToken') || '';
      
      const formData = new FormData();
      formData.append('event_name', editForm.event_name);
      formData.append('description', editForm.description);
      if (editForm.image && editForm.image instanceof File) {
        formData.append('image', editForm.image);
      }
      
      console.log(`🚀 Preparing to update event ID: ${editingCard}`);
      console.log('📦 FormData to be sent:');
      for (let [key, value] of formData.entries()) {
        console.log(`  - ${key}:`, value);
      }

      const response = await fetch(`${cmsUrl}/api/events/${editingCard}`, {
        method: 'PUT',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData
      });

      const updatedItem = await response.json();
      
      console.log('✅ Server response after update:', updatedItem);
      
      const updatedEvents = localEvents.map(item =>
        item._id === editingCard ? updatedItem : item
      );
      setLocalEvents(updatedEvents);
      
      if (onUpdateEvent) {
        onUpdateEvent(updatedItem);
      }
    } catch (err) {
      console.error('❌ Error updating event:', err);
    }
    
    setEditingCard(null);
    setIsPaused(false);
  };

  const handleCancelEdit = (event) => {
    event.stopPropagation();
    setEditingCard(null);
    setIsPaused(false);
  };

  const handleDelete = async (itemId, event) => {
    event.stopPropagation();
    try {
      const token = localStorage.getItem('adminToken') || '';
      
      console.log(`🗑️ Preparing to delete event ID: ${itemId}`);

      const updatedEvents = localEvents.filter(item => item._id !== itemId);
      setLocalEvents(updatedEvents);
      
      if (currentIndex >= updatedEvents.length && updatedEvents.length > 0) {
        setCurrentIndex(updatedEvents.length - 1);
      } else if (updatedEvents.length === 0) {
        setCurrentIndex(0);
      }
      
      await fetch(`${cmsUrl}/api/events/${itemId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      
      console.log(`✅ Delete request sent for event ID: ${itemId}`);
      
      if (onDeleteEvent) {
        onDeleteEvent(itemId);
      }
    } catch (err) {
      console.error('❌ Error deleting event:', err);
    }
  };

  const handleAddNew = () => {
    setEditingCard('new');
    setEditForm({ event_name: '', description: '', image: null });
    setIsPaused(true);
  };

  const handleSaveNew = async (event) => {
    event.stopPropagation();
    try {
      const token = localStorage.getItem('adminToken') || '';
      
      const formData = new FormData();
      formData.append('event_name', editForm.event_name);
      formData.append('description', editForm.description);
      if (editForm.image) {
        formData.append('image', editForm.image);
      }

      console.log('🚀 Preparing to create a new event.');
      console.log('📦 FormData to be sent:');
      for (let [key, value] of formData.entries()) {
        console.log(`  - ${key}:`, value);
      }
  
      const response = await fetch(`${cmsUrl}/api/events`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData
      });
  
      const newEvent = await response.json();

      console.log('✅ Server response after creating new event:', newEvent);

      setLocalEvents([...localEvents, newEvent]);
      
      if (onAddEvent) {
        onAddEvent(newEvent);
      }
      
      // Reset all states
      setEditingCard(null);
      setIsPaused(false);
      setEditForm({ event_name: '', description: '', image: null }); // Reset form
      setCurrentIndex(localEvents.length); // Move to the new card
    } catch (err) {
      console.error('❌ Error creating event:', err);
    }
  };
  
  const getCardPosition = (index) => {
    const totalItems = localEvents.length;
    if (index === currentIndex) return 'center';
    const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
    if (index === prevIndex) return 'left';
    const nextIndex = (currentIndex + 1) % totalItems;
    if (index === nextIndex) return 'right';
    return 'hidden';
  };

  const cardVariants = {
    center: { x: '0%', scale: 1, rotateY: 0, opacity: 1, zIndex: 10, filter: 'grayscale(100%)', z: 0 },
    left: { x: '-90%', scale: 0.8, rotateY: -45, opacity: 0.4, zIndex: 5, filter: 'grayscale(100%)', z: -200 },
    right: { x: '90%', scale: 0.8, rotateY: 45, opacity: 0.4, zIndex: 5, filter: 'grayscale(100%)', z: -200 },
    hidden: { scale: 0.5, opacity: 0, zIndex: 1 }
  };

  const getImageUrl = (imageName) => {
    if (!imageName) return '';
    if (/^https?:\/\//i.test(imageName)) return imageName;
    return `${cmsUrl}/images/${imageName}`;
  };

  return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div 
        style={{ position: 'relative', width: '100%', maxWidth: '95vw', margin: 'auto' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => !editingCard && setIsPaused(false)}
      >
        <div style={{ position: 'relative', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1200px', transformStyle: 'preserve-3d' }}>
          
          <button onClick={prevSlide} style={{ position: 'absolute', left: 'calc(50% - 40vh)', top: '50%', transform: 'translateY(-50%)', zIndex: 30, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', borderRadius: '9999px', padding: '0.5rem', color: '#fff' }}>
            <ChevronLeft size={28} />
          </button>

          <AnimatePresence initial={false}>
            {localEvents.map((item, index) => {
              const position = getCardPosition(index);
              const isEditing = editingCard === item._id;
              
              return (
                <motion.div
                  key={item._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate={position}
                  whileHover={position === 'center' ? { filter: 'grayscale(0%)', scale: 1.05 } : {}}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  onClick={() => !isEditing && setCurrentIndex(index)}
                  onMouseEnter={() => position === 'center' && setIsCenterCardHovered(true)}
                  onMouseLeave={() => position === 'center' && setIsCenterCardHovered(false)}
                  style={{
                    position: 'absolute',
                    width: '85vh',
                    height: '60vh',
                    borderRadius: '0px',
                    overflow: 'hidden',
                    cursor: isEditing ? 'default' : 'pointer',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#111'
                  }}
                >
                  {position === 'center' && !isEditing && (
                    <button
                      onClick={(e) => handleDelete(item._id, e)}
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(220, 38, 38, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        cursor: 'pointer',
                        zIndex: 25,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}

                  <motion.img 
                    src={getImageUrl(item.image)} 
                    alt={item.event_name} 
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    transition={{ duration: 0.4 }}
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
                          width: '100%', maxWidth: '24rem', padding: '1rem', borderRadius: '1rem',
                          backgroundColor: isCenterCardHovered ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center',
                          position: 'relative'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                          {!isEditing ? (
                            <button
                              onClick={(e) => handleEdit(item, e)}
                              style={{
                                background: 'rgba(59, 130, 246, 0.8)',
                                backdropFilter: 'blur(10px)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <Edit size={14} />
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={handleSaveEdit}
                                style={{
                                  background: 'rgba(34,197,94,0.8)', 
                                  border: 'none', 
                                  borderRadius: '50%', 
                                  width: '32px', 
                                  height: '32px', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center', 
                                  color: '#fff', 
                                  cursor: 'pointer' 
                                }}
                              >
                                <Check size={14} />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                style={{
                                  background: 'rgba(239, 68, 68, 0.8)',
                                  backdropFilter: 'blur(10px)',
                                  border: 'none',
                                  borderRadius: '50%',
                                  width: '32px',
                                  height: '32px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#fff',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <X size={14} />
                              </button>
                            </>
                          )}
                        </div>

                        {isEditing ? (
                          <div style={{ paddingTop: '2rem' }}>
                            <input
                              type="text"
                              value={editForm.event_name}
                              onChange={(e) => setEditForm(prev => ({ ...prev, event_name: e.target.value }))}
                              onClick={(e) => e.stopPropagation()}
                              placeholder="Event name"
                              style={{ width: '100%', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '0.5rem', padding: '0.5rem', color: '#fff', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Antonio, sans-serif', textAlign: 'center', marginBottom: '0.5rem' }}
                            />
                            <textarea
                              value={editForm.description}
                              onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                              onClick={(e) => e.stopPropagation()}
                              placeholder="Description"
                              rows={3}
                              style={{ width: '100%', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '0.5rem', padding: '0.5rem', color: '#e5e5e5', fontSize: '0.75rem', fontFamily: 'Bruno Ace SC, monospace', resize: 'none', textAlign: 'center' }}
                            />
                            <input
                              type="file"
                              onChange={(e) => setEditForm(prev => ({ ...prev, image: e.target.files[0] }))}
                              accept="image/*"
                              style={{ width: '100%', color: '#fff', padding: '0.5rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '0.5rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.1)' }}
                            />
                          </div>
                        ) : (
                          <div style={{ paddingTop: '2rem' }}>
                            <h3 style={{ fontFamily: 'Antonio, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#fff', textShadow: '0 2px 5px rgba(0,0,0,0.5)', marginBottom: '0.5rem' }}>
                              {item.event_name}
                            </h3>
                            <p style={{ fontFamily: 'Bruno Ace SC, monospace', fontSize: '0.75rem', color: '#e5e5e5', lineHeight: 1.5, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                              {item.description}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {editingCard === 'new' && (
              <motion.div
                key="new-card"
                variants={cardVariants}
                initial="hidden"
                animate="center"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: '85vh',
                  height: '60vh',
                  borderRadius: '0px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                  backgroundColor: '#111'
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)' }} />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 20 }}
                >
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    style={{ width: '100%', maxWidth: '24rem', padding: '1rem', borderRadius: '1rem', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                    <input
                      type="text"
                      value={editForm.event_name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, event_name: e.target.value }))}
                      placeholder="Event name"
                      style={{ width: '100%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '0.5rem', padding: '0.5rem', color: '#fff', fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '0.5rem' }}
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Description"
                      rows={3}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '0.5rem', padding: '0.5rem', color: '#e5e5e5', fontSize: '0.75rem', resize: 'none', textAlign: 'center', marginBottom: '0.5rem' }}
                    />
                    <input
                      type="file"
                      onChange={(e) => setEditForm(prev => ({ ...prev, image: e.target.files[0] }))}
                      accept="image/*"
                      style={{ width: '100%', color: '#fff', padding: '0.5rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '0.5rem', marginBottom: '0.5rem', background: 'rgba(255,255,255,0.1)' }}
                    />
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveNew(e);
                        }} 
                        style={{ 
                          background: 'rgba(34,197,94,0.8)', 
                          border: 'none', 
                          borderRadius: '50%', 
                          width: '32px', 
                          height: '32px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          color: '#fff', 
                          cursor: 'pointer' 
                        }}
                      >
                        <Check size={14} />
                      </button>
                      <button onClick={() => { setEditingCard(null); setIsPaused(false); }} style={{ background: 'rgba(239,68,68,0.8)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <button onClick={nextSlide} style={{ position: 'absolute', right: 'calc(50% - 40vh)', top: '50%', transform: 'translateY(-50%)', zIndex: 30, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)', borderRadius: '9999px', padding: '0.5rem', color: '#fff' }}>
            <ChevronRight size={28} />
          </button>
        </div>

        <button
          onClick={handleAddNew}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            zIndex: 50,
            transition: 'all 0.3s ease'
          }}
        >
          <Plus size={28} />
        </button>
      </div>
    </div>
  );
};

export default AdminCarousel;