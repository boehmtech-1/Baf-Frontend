// src/components/ContactPage/ContactPage.jsx
import { useState } from 'react';
import styles from '../../styles/ContactPage.module.css';
import GlossyButton from '../buttons/mirrorbutton';
import axios from 'axios';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear field error when user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validate phone (if provided)
    if (formData.phone) {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        errors.phone = 'Phone number must be at least 10 digits';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      // Prepare data with phone always as string
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '', // Ensure phone is always a string, never null/undefined
        message: formData.message,
        status: 'unread' // Include default status that Payload expects
      };

      // Debug log to see what we're sending
      console.log('🚀 Submitting form data:', submissionData);

      const response = await axios.post('/api/notifications', submissionData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Response from server:', response.data);

      if (response.status === 200 || response.status === 201) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        setFieldErrors({});

        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }
    } catch (error) {
      console.error('❌ Submission error:', error);

      // Better error handling
      if (error.response) {
        // The request was made and the server responded with an error
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);

        setSubmitStatus('error');
        setErrorMessage(
          error.response.data?.message ||
          error.response.data?.errors?.[0]?.message ||
          `Server error: ${error.response.status}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setSubmitStatus('error');
        setErrorMessage('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        console.error('Error setting up request:', error.message);
        setSubmitStatus('error');
        setErrorMessage('An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        {/* Left Side Content */}
        <div className={styles.leftPanel}>
          <div className={styles.headingGroup}>
            <h2 className={styles.heading}>
              Let's Collaborate <span>and Begin the work</span>
            </h2>
          </div>
          <div className={styles.ctaCard}>
            <h4>Prefer to book a call?</h4>
            <div className={styles.ctaButtonWrapper}>
              <GlossyButton href="https://cal.com">Let's Book A Call</GlossyButton>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className={styles.rightPanel}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">NAME</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {fieldErrors.email && (
                  <span className={styles.fieldError}>{fieldErrors.email}</span>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">PHONE NUMBER</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Your Number"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow numbers, spaces, hyphens, parentheses, and plus sign
                  const sanitized = value.replace(/[^0-9\s\-\(\)\+]/g, '');
                  handleChange({
                    target: {
                      name: 'phone',
                      value: sanitized
                    }
                  });
                }}
                disabled={isSubmitting}
              />
              {fieldErrors.phone && (
                <span className={styles.fieldError}>{fieldErrors.phone}</span>
              )}
              {/* Debug info - remove in production */}
              {process.env.NODE_ENV === 'development' && formData.phone && (
                <small style={{ color: '#666', fontSize: '0.8em' }}>
                  Phone value: "{formData.phone}"
                </small>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">MESSAGE</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows="6"
                required
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
              ></textarea>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                ✓ Thank you for your message! We will get back to you within 48 hours.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>
                ✗ {errorMessage || 'Sorry, there was an error submitting your message. Please try again.'}
              </div>
            )}

            {!submitStatus && (
              <p className={styles.subtext}>(We will reach out to you within 48hrs)</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};