import React from 'react';
import styles from './adress.module.scss';

function Adress() {
  const addressText = 'Lincoln 344, Illinois, Chicago, USA';
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;

  return (
    <address className={styles.storeAddress}>
      <span className="icon-map-pin"></span>
      <p>Store Location: </p>
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {addressText}
      </a>
    </address>
  );
}

export default Adress;
