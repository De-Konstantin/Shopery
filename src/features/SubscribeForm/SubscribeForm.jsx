import React, { useState } from 'react';
import styles from './SubscribeForm.module.css';

function SubscribeForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки email
    console.log('Subscribed email:', email);
    setEmail('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Subscribe
      </button>
    </form>
  );
}

export default SubscribeForm;
