import React from 'react';
import styles from './PhoneShell.module.css';

const PhoneShell = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      
      <div className={styles.phone}>
        
        <div className={styles.notch}>
          <span className={styles.camera} />
        </div>

        
        <div className={styles.screen}>
          {children}
        </div>

       
        <div className={styles.homeBar} />
      </div>
    </div>
  );
};

export default PhoneShell;
