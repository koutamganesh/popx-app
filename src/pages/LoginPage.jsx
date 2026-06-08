import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import styles from './LoginPage.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = ({ email, password }) => {
  const errors = {};
  if (!email.trim())              errors.email    = 'Email address is required.';
  else if (!EMAIL_RE.test(email)) errors.email    = 'Please enter a valid email address.';
  if (!password.trim())           errors.password = 'Password is required.';
  else if (password.length < 6)   errors.password = 'Password must be at least 6 characters.';
  return errors;
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [form,    setForm]    = useState({ email: '', password: '' });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);

  const isFilled = form.email.trim() && form.password.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev)   => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleLogin = () => {
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/account', {
        state: { email: form.email, name: 'Marry Doe' },
      });
    }, 1000);
  };

  return (
    <div className={styles.container}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          Signin to your<br />PopX account
        </h1>
        <p className={styles.subtitle}>
          Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit,
        </p>
      </div>

      <div className={styles.form}>
        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email address"
          error={errors.email}
          autoComplete="email"
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          error={errors.password}
          autoComplete="current-password"
        />

        <button
          className={`${styles.loginBtn} ${isFilled ? styles.active : styles.disabled}`}
          onClick={handleLogin}
          disabled={loading || !isFilled}
        >
          {loading ? <span className={styles.spinner} /> : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
