import React, { useState } from 'react';
import styles from './SignIn.module.scss';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert('Login successfully!');
  };

  //   const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  //   const [rememberMe, setRememberMe] = useState(false);

  return (
    <section className={`${styles.signIn__container} _container`}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          className={styles.input}
        />
        <p className={styles.error}>{errors.email?.message}</p>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password')}
            className={styles.input}
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

        <button type="submit" className={styles.button}>
          Login
        </button>

        <p className={styles.register}>
          Don’t have account? <Link to="/register">Register</Link>
        </p>
      </form>
    </section>
  );
}

export default SignIn;
