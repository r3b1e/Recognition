import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    // Basic required validation
    if (!email || !password) {
      setError('❌ Please enter both Email ID and Password.');
      return;
    }

    // Simple email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('❌ Please enter a valid Email ID.');
      return;
    }

    // No API call – just pretend login is successful
    alert(`🎉 Login successful for ${email}!`);

    // Clear fields
    setEmail('');
    setPassword('');
  };

  return (
    <div
      className="login-container"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--dark-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <form
        className="login-form"
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '1rem',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          color: 'var(--text)',
        }}
      >
        {/* Avatar */}
        <div
          className="avatar-icon"
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '999px',
            margin: '0 auto 1rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'linear-gradient(135deg, var(--accent), var(--accent-hover))',
            boxShadow: '0 10px 25px rgba(24,239,199,0.3)',
          }}
        >
          <svg height="32" width="32" viewBox="0 0 24 24" fill="var(--dark-bg)">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.76 4 17 6.24 17 9C17 11.76 14.76 14 12 14C9.24 14 7 11.76 7 9C7 6.24 9.24 4 12 4ZM12 16C9.33 16 4.84 17.26 4.34 18.06C4.1 18.42 4 19.16 4 20H20C20 19.16 19.9 18.42 19.66 18.06C19.16 17.26 14.67 16 12 16Z" />
          </svg>
        </div>

        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>

        {/* Error Message */}
        {error && (
          <p
            className="error-message"
            style={{
              color: 'var(--decreasing)',
              backgroundColor: 'rgba(255,71,87,0.1)',
              borderRadius: '0.5rem',
              padding: '0.5rem 0.75rem',
              fontSize: '0.9rem',
              marginBottom: '1rem',
            }}
          >
            {error}
          </p>
        )}

        {/* Email */}
        <div className="input-group" style={{ marginBottom: '1rem' }}>
          <label style={{ marginBottom: '0.35rem', display: 'block' }}>
            Email ID
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--darker-bg)',
              borderRadius: '0.5rem',
              padding: '0.5rem 0.75rem',
            }}
          >
            <span style={{ marginRight: '0.5rem', color: 'var(--accent)' }}>
              📧
            </span>
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: 'var(--text)',
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ marginBottom: '0.35rem', display: 'block' }}>
            Password
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--darker-bg)',
              borderRadius: '0.5rem',
              padding: '0.5rem 0.75rem',
            }}
          >
            <span style={{ marginRight: '0.5rem', color: 'var(--accent)' }}>
              🔒
            </span>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: 'var(--text)',
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            background:
              'linear-gradient(135deg, var(--accent), var(--accent-hover))',
            border: 'none',
            borderRadius: '0.5rem',
            color: 'var(--dark-bg)',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: '0.2s',
          }}
        >
          Login
        </button>

        {/* Links */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '1rem',
            color: 'var(--text-secondary)',
          }}
        >
          Don’t have an account?{' '}
          <a href="/register" style={{ color: 'var(--accent)' }}>
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
