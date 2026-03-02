import React from 'react';
import styles from './Contact.module.scss';

const contactCards = [
  {
    title: 'Head Office',
    value: '125 Green Avenue, New York, NY 10012',
    note: 'Mon–Fri, 09:00–18:00',
    icon: '🏢',
  },
  {
    title: 'Customer Support',
    value: '+1 (219) 555-0147',
    note: 'Daily, 08:00–22:00',
    icon: '📞',
  },
  {
    title: 'Email',
    value: 'support@ecobazar.demo',
    note: 'Average reply: within 2 hours',
    icon: '✉️',
  },
  {
    title: 'For Business',
    value: 'partners@ecobazar.demo',
    note: 'Wholesale and B2B requests',
    icon: '🤝',
  },
];

const storeLocations = [
  {
    city: 'New York',
    address: '125 Green Avenue, NY 10012',
    phone: '+1 (212) 555-0133',
  },
  {
    city: 'Chicago',
    address: '58 Lake Street, IL 60601',
    phone: '+1 (312) 555-0185',
  },
  {
    city: 'Los Angeles',
    address: '700 Sunset Blvd, CA 90028',
    phone: '+1 (323) 555-0110',
  },
];

function Contact() {
  return (
    <section className={styles.contactPage}>
      <div className={`${styles.container} _container`}>
        <header className={styles.hero}>
          <p className={styles.kicker}>Contact Us</p>
          <h1 className={styles.title}>We’d Love to Hear From You</h1>
          <p className={styles.subtitle}>
            Need help with your order, delivery, or account? Our team
            is here to support you every day.
          </p>
        </header>

        <div className={styles.cardsGrid}>
          {contactCards.map((item) => (
            <article key={item.title} className={styles.card}>
              <div className={styles.cardIcon}>{item.icon}</div>
              <h2 className={styles.cardTitle}>{item.title}</h2>
              <p className={styles.cardValue}>{item.value}</p>
              <p className={styles.cardNote}>{item.note}</p>
            </article>
          ))}
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.infoPanel}>
            <h3>Store Locations</h3>
            <ul className={styles.locationsList}>
              {storeLocations.map((location) => (
                <li
                  key={location.city}
                  className={styles.locationItem}
                >
                  <p className={styles.locationCity}>
                    {location.city}
                  </p>
                  <p>{location.address}</p>
                  <p>{location.phone}</p>
                </li>
              ))}
            </ul>

            <div className={styles.socialBlock}>
              <p className={styles.socialTitle}>Follow us</p>
              <div className={styles.socialLinks}>
                <a href="#" aria-label="Instagram">
                  Instagram
                </a>
                <a href="#" aria-label="Facebook">
                  Facebook
                </a>
                <a href="#" aria-label="X">
                  X
                </a>
                <a href="#" aria-label="YouTube">
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <form className={styles.formPanel}>
            <h3>Send a Message</h3>
            <p className={styles.formHint}>
              This is demo content for UI preview.
            </p>

            <div className={styles.formRow}>
              <input type="text" placeholder="Full name" />
              <input type="email" placeholder="Email address" />
            </div>
            <input
              type="text"
              placeholder="Order number (optional)"
            />
            <textarea rows="6" placeholder="Write your message..." />
            <button type="button">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
