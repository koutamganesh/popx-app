import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import styles from './RegisterPage.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-()\u00a0]{7,15}$/;

const validate = (form) => {
  const errors = {};
  if (!form.fullName.trim())               errors.fullName = 'Full name is required.';
  if (!form.phone.trim())                  errors.phone    = 'Phone number is required.';
  else if (!PHONE_RE.test(form.phone))     errors.phone    = 'Enter a valid phone number.';
  if (!form.email.trim())                  errors.email    = 'Email address is required.';
  else if (!EMAIL_RE.test(form.email))     errors.email    = 'Enter a valid email address.';
  if (!form.password.trim())               errors.password = 'Password is required.';
  else if (form.password.length < 6)       errors.password = 'Minimum 6 characters required.';
  return errors;
};

const INITIAL_FORM = {
  fullName:    '',
  phone:       '',
  email:       '',
  password:    '',
  companyName: '',
  isAgency:    'yes',
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form,    setForm]    = useState(INITIAL_FORM);
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);

  const isFilled =
    form.fullName.trim() &&
    form.phone.trim()    &&
    form.email.trim()    &&
    form.password.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev)   => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = () => {
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/account', {
        state: { name: form.fullName, email: form.email },
      });
    }, 1000);
  };

  return (
    <div className={`${styles.container} screen-scroll`}>
      {/* ── Header ── */}
      <h1 className={styles.title}>
        Create your<br />PopX account
      </h1>

      {/* ── Form fields ── */}
      <div className={styles.form}>
        <InputField
          label="Full Name*"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Marry Doe"
          error={errors.fullName}
          autoComplete="name"
        />

        <InputField
          label="Phone number*"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="Marry Doe"
          error={errors.phone}
          autoComplete="tel"
        />

        <InputField
          label="Email address*"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Marry Doe"
          error={errors.email}
          autoComplete="email"
        />

        <InputField
          label="Password *"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Marry Doe"
          error={errors.password}
          autoComplete="new-password"
        />

        <InputField
          label="Company name"
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          placeholder="Marry Doe"
          autoComplete="organization"
        />

        {/* ── Agency radio ── */}
        <div className={styles.agencyGroup}>
          <p className={styles.agencyQuestion}>Are you an Agency?*</p>

          <div className={styles.radioRow}>
            {['yes', 'no'].map((option) => (
              <label key={option} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="isAgency"
                  value={option}
                  checked={form.isAgency === option}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                <span
                  className={`${styles.radioCustom} ${
                    form.isAgency === option ? styles.radioChecked : ''
                  }`}
                />
                <span className={styles.radioText}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ── Submit button ── */}
      <div className={styles.footer}>
        <button
          className={`${styles.submitBtn} ${isFilled ? styles.active : styles.disabled}`}
          onClick={handleSubmit}
          disabled={loading || !isFilled}
        >
          {loading ? <span className={styles.spinner} /> : 'Create Account'}
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
