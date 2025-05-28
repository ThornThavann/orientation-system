import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // <-- new state
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!validatePassword(value)) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}api/auth/login`, {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        // Show password-specific error if available, else generic error
        if (data.message && data.message.toLowerCase().includes('password')) {
          setPasswordError(data.message);
          setError(''); // clear general error
        } else {
          setError(data.message || 'wrong email or password');
          setPasswordError('wrong password'); // set generic password error
        }
      }
    } catch (error) {
      setError('Network error: ' + error.message);
    }
  };

  const isFormInvalid = !email || !password || emailError || passwordError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="you@example.com"
          required
          className={`mb-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            emailError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
          }`}
        />
        {emailError && <p className="text-red-500 text-sm mb-3">{emailError}</p>}

        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative mb-1">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="********"
            required
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              passwordError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}

        <button
          type="submit"
          disabled={isFormInvalid}
          className={`w-full py-2 rounded-md font-semibold transition-colors ${
            isFormInvalid
              ? 'bg-blue-300 cursor-not-allowed text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
