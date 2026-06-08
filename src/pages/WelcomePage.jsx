import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WelcomePage.module.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to PopX</h1>
        <p className={styles.subtitle}>
          Lorem ipsum dolor sit amet,{'\n'}consectetur adipiscing elit,
        </p>

        <div className={styles.actions}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => navigate('/register')}
          >
            Create Account
          </button>

          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => navigate('/login')}
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
