import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { IoMdLock } from 'react-icons/io';
import styles from './Login.module.css';
import { loginUser } from '../redux/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async values => {
      const { email, password } = values;
      try {
        await dispatch(loginUser({ email, password })).unwrap();
        navigate('/');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  });

  return (
    <div className={styles.appContainer}>
      <form onSubmit={formik.handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            <MdEmail className={styles.icon} />
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...formik.getFieldProps('email')}
              className={styles.formInput}
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>
            <IoMdLock className={styles.icon} />
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...formik.getFieldProps('password')}
              className={styles.formInput}
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </div>

        <div className={styles.formGroup}>
          <Link to="/register" className={styles.registerButton}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
