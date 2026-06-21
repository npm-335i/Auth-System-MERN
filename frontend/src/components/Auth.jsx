import React, { useState } from 'react';
import api from '../api/axios';
import '../styles/auth.css';

export default function Auth({ authMode, setAuthMode, onLogin }) {
  const isLogin = authMode === 'login';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        setLoading(false);
        return;
      }
      if (!formData.email) {
        setError('Email is required');
        setLoading(false);
        return;
      }
    }

    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }
    }

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName || '',
            lastName: formData.lastName || '',
          };

      console.log(`Sending ${isLogin ? 'login' : 'registration'} request...`);

      const response = await api.post(endpoint, payload);

      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      if (!isLogin) {
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => {
          setAuthMode('login');
          setSuccess('');
        }, 1500);
      }

      if (isLogin && response.data.user) {
        console.log('Login successful for:', response.data.user.email);
        onLogin(response.data.user);
      }

      if (!isLogin) {
        setFormData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          confirmPassword: '',
        });
      }

    } catch (error) {
      console.error('Auth error:', error);
      setError(error.response?.data?.error || error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow" />

      <div className="auth-card">
        <div className="auth-info">
          <h2>Welcome to NexAuth</h2>
          <p>
            Secure Authentication System for Information Security course
            demonstration.
          </p>

          <div className="auth-switch">
            <button
              className={isLogin ? 'active' : ''}
              onClick={() => {
                setAuthMode('login');
                setError('');
                setSuccess('');
              }}
            >
              Login
            </button>

            <button
              className={!isLogin ? 'active' : ''}
              onClick={() => {
                setAuthMode('signup');
                setError('');
                setSuccess('');
              }}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="auth-form">
          <form onSubmit={handleSubmit}>
            {isLogin ? (
              <>
                <h3>Login</h3>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <button type="submit" className="primary-btn" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="small-text">
                  Don't have an account?{' '}
                  <span 
                    onClick={() => {
                      setAuthMode('signup');
                      setError('');
                      setSuccess('');
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    Sign up
                  </span>
                </p>
              </>
            ) : (
              <>
                <h3>Create Account</h3>

                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={loading}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={loading}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 8 chars)"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <button type="submit" className="primary-btn" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <p className="small-text">
                  Already have an account?{' '}
                  <span 
                    onClick={() => {
                      setAuthMode('login');
                      setError('');
                      setSuccess('');
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    Login
                  </span>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}