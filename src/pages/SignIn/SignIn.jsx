import React, { useState } from 'react';
import styles from './SignIn.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useAuth } from '../../contexts/AuthContext';

// ✅ Определяем схему валидации
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';
  const demoCredentials = {
    user: {
      email:
        import.meta.env.VITE_DEMO_USER_EMAIL || 'demo@shopery.dev',
      password:
        import.meta.env.VITE_DEMO_USER_PASSWORD || 'demo12345',
    },
    admin: {
      email:
        import.meta.env.VITE_DEMO_ADMIN_EMAIL || 'admin@shopery.dev',
      password:
        import.meta.env.VITE_DEMO_ADMIN_PASSWORD || 'admin12345',
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAuth = async (credentials) => {
    setIsSubmitting(true);
    setAuthError('');
    const result = await login(credentials);

    if (result.success) {
      navigate('/');
    } else {
      setAuthError(result.error || 'Unable to sign in.');
    }

    setIsSubmitting(false);
  };

  const onSubmit = (data) => {
    handleAuth({ email: data.email, password: data.password });
  };

  const handleDemoLogin = (type) => {
    handleAuth(demoCredentials[type]);
  };

  return (
    <>
      <Breadcrumbs />
      <section className={`${styles.signIn__container} _container`}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className={styles.title}>Sign In</h2>

          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={styles.input}
            disabled={isSubmitting}
          />
          <p className={styles.error}>{errors.email?.message}</p>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password')}
              className={styles.input}
              disabled={isSubmitting}
            />
            <button
              type="button"
              className={styles.showPassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="icon-eye"></span>
            </button>
          </div>
          <p className={styles.error}>{errors.password?.message}</p>
          <div className={styles.options}>
            <label>
              <input
                type="checkbox"
                //   checked={rememberMe}
                {...register('rememberMe')}
                //   onChange={() => setRememberMe(!rememberMe)}
              />{' '}
              Remember me
            </label>
            <a href="#" className={styles.forgot}>
              Forget Password
            </a>
          </div>

          {authError && <p className={styles.error}>{authError}</p>}

          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>

          {demoMode && (
            <div className={styles.demoBlock}>
              <p>Quick demo access:</p>
              <div className={styles.demoButtons}>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('user')}
                  disabled={isSubmitting}
                >
                  Demo User
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('admin')}
                  disabled={isSubmitting}
                >
                  Demo Admin
                </button>
              </div>
            </div>
          )}

          <p className={styles.register}>
            Don’t have account? <Link to="/register">Register</Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default SignIn;
