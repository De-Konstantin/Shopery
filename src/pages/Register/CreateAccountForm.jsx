import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './CreateAccountForm.module.scss';

// ✅ Определяем схему валидации
const schema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  acceptTerms: Yup.boolean().oneOf(
    [true],
    'You must accept the terms',
  ),
});

function CreateAccountForm() {
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
    alert('Account created successfully!');
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <page className={`${styles.createAccount__container} _container`}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Create Account</h2>
        <input
          type="text"
          placeholder="First Name"
          {...register('firstName')}
          className={styles.input}
        />
        <p className={styles.error}>{errors.firstName?.message}</p>
        <input
          type="text"
          placeholder="Last Name"
          {...register('lastName')}
          className={styles.input}
        />
        <p className={styles.error}>{errors.lastName?.message}</p>
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          className={styles.input}
        />
        <p className={styles.error}>{errors.email?.message}</p>
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
          className={styles.input}
        />
        <p className={styles.error}>{errors.password?.message}</p>
        <div className={styles.passwordWrapper}>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
            className={styles.input}
          />
          <button
            type="button"
            className={styles.showPassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            <span className="icon-eye"></span>
          </button>{' '}
        </div>
        <p className={styles.error}>
          {errors.confirmPassword?.message}
        </p>{' '}
        <div className={styles.options}>
          <label>
            <input type="checkbox" {...register('acceptTerms')} />{' '}
            Accept all terms & Conditions
          </label>
        </div>
        <p className={styles.error}>{errors.acceptTerms?.message}</p>
        <button type="submit" className={styles.button}>
          Create Account
        </button>
        <p className={styles.login}>
          Already have an account? <a href="#">Login</a>
        </p>
      </form>
    </page>
  );
}

export default CreateAccountForm;
