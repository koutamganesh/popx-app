import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './AccountPage.module.css';
import { useNavigate } from 'react-router-dom';
const DEFAULT_AVATAR = 'https://i.pravatar.cc/150?img=47';

const AccountPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const displayName  = state?.name  || 'Marry Doe';
  const displayEmail = state?.email || 'Marry@Gmail.Com';

  const [avatarSrc, setAvatarSrc] = useState(DEFAULT_AVATAR);
  const fileRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setAvatarSrc(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.container}>

  
      <header className={styles.topBar}>
        <h1 className={styles.topBarTitle}>Account Settings</h1>
      </header>

      <hr className={styles.divider} />

      
      <section className={styles.profileCard}>
        
        <div className={styles.avatarWrap}>
          <img
            src={avatarSrc}
            alt={`${displayName} profile`}
            className={styles.avatarImg}
          />

          <button
            className={styles.cameraBtn}
            onClick={() => fileRef.current?.click()}
            aria-label="Change profile photo"
          >
            <CameraIcon />
          </button>

          
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className={styles.fileInput}
          />
        </div>

      
        <div className={styles.profileInfo}>
          <p className={styles.profileName}>{displayName}</p>
          <p className={styles.profileEmail}>{displayEmail}</p>
        </div>
      </section>

      <hr className={styles.divider} />

      
      <div className={styles.bioSection}>
        <p className={styles.bioText}>
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
          Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam
          Erat, Sed Diam
        </p>
      </div>

      <hr className={styles.divider} />
      <div className={styles.logoutSection}>
  <button
    className={styles.logoutBtn}
    onClick={() => navigate('/login')}
  >
    Logout
  </button>
</div>
    </div>
  );
};


const CameraIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

export default AccountPage;
