import React, { useState } from 'react';
import styles from './SubscribeForm.module.scss';
import Button from '../../components/buttons/Button/Button';

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
      <Button>Subscribe</Button>
    </form>
  );
}

export default SubscribeForm;
