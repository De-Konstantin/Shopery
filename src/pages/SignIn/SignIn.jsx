import React, { useState } from 'react';
import styles from './SignIn.module.scss';
import { Link } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    // Тут твоя логика входа
  };

  return (
    <page className={`${styles.signIn__container} _container`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />

        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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

        <div className={styles.options}>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
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
    </page>
  );
}

export default SignIn;
