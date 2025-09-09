// src/components/ContactPage/ContactPage.jsx
import { useState } from 'react';
import styles from '../../styles/ContactPage.module.css';
import GlossyButton from '../buttons/mirrorbutton'; // Reusing our button!

export const ContactPage = () => {
  // Use a single state object to hold all form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: '',
  });

  // A single handler to update the form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default browser page reload
    console.log('Form Submitted:', formData);
    // Here, you would typically send the formData to your backend API
    // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
    alert('Thank you for your message!');
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        {/* Left Side Content */}
        <div className={styles.leftPanel}>
          <div className={styles.headingGroup}>
            <h2 className={styles.heading}>
              Let’s Collaborate <span>and Begin the work</span>
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
                />
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
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message">MESSAGE</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
            <p className={styles.subtext}>(We will reach out to you within 48hrs)</p>
          </form>
        </div>
      </div>
    </section>
  );
};