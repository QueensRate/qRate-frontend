import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between sign-in and sign-up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For sign-up
  const [error, setError] = useState('');
  const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  // Validate @queensu.ca email
  if (!email.endsWith('@queensu.ca')) {
    setError('Please use a valid @queensu.ca email address.');
    return;
  }

  if (isSignIn) {
    // Sign-in logic
    try {
      const response = await fetch('http://qrate-backend.azurewebsites.net/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/'); // Redirect to frontend home page[](http://localhost:8080/)
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  } else {
    // Sign-up logic (placeholder, to be implemented)
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      console.log('Attempting sign-up with:', { email, password });
      // Replace with /api/v1/auth/register call later
      setIsSignIn(true); // Switch to sign-in after sign-up
    } catch (err) {
      setError('Sign-up failed. Please try again.');
    }
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="yourname@queensu.ca"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {!isSignIn && (
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isSignIn ? 'Don’t have an account?' : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => {
              setIsSignIn(!isSignIn);
              setError('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
            }}
            className="text-blue-500 hover:underline"
          >
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;