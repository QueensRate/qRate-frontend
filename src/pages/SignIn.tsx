import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth'; // Ensure this path is correct
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import { Button } from '@/components/ui/button'; // Ensure this import is present

const SignIn: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between sign-in and sign-up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For sign-up
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // For sign-up success
  const [showEmailPopup, setShowEmailPopup] = useState(false); // New state for pop-up
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setShowEmailPopup(false); // Reset pop-up state

    // Validate @queensu.ca email
    if (!email.endsWith('@queensu.ca')) {
      setError('Please use a valid @queensu.ca email address.');
      return;
    }

    if (isSignIn) {
      try {
        const response = await fetch('http://localhost:8000/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          login(data.user.email, data.token); 
          navigate('/');
        } else {
          setError(data.error || 'Login failed.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    } else {
      // Sign-up logic
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      try {
        const response = await fetch('http://localhost:8000/api/v1/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          login(data.user.email, data.token); // Log in the user
          setShowEmailPopup(true); // Show pop-up after successful sign-up
          // Delay redirect to allow user to see pop-up
          setTimeout(() => {
            setShowEmailPopup(false);
            navigate('/');
          }, 5000); // 5-second delay before redirect
        } else {
          setError(data.error || 'Sign-up failed.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const closePopup = () => {
    setShowEmailPopup(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-20">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
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
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-yellow-400 text-blue-900 p-2 rounded-md hover:bg-yellow-300 transition"
            >
              {isSignIn ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          {!isSignIn && (
            <div className="mt-6 text-center text-sm text-gray-600">
              <p className="mb-2">
                By signing up, you agree to our <a href="/terms-of-service" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>.
              </p>
              <p>
                <a href="/help" className="text-blue-500 hover:underline">Need help? Visit our Help Center</a>
              </p>
            </div>
          )}
          <p className="mt-4 text-center text-sm">
            {isSignIn ? 'Don’t have an account?' : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignIn(!isSignIn);
                setError('');
                setSuccessMessage('');
                setShowEmailPopup(false); // Reset pop-up state
                setEmail('');
                setPassword('');
                setConfirmPassword('');
              }}
              className="text-yellow-500 hover:underline"
            >
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Email Verification Pop-up */}
        {showEmailPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Email Verification Required</h2>
              <p className="text-gray-600 mb-6">Please check your email (including spam/junk) to verify your account. This link expires in 1 hour.</p>
              <Button
                type="button" // Explicitly set type to avoid form submission
                variant="default" // Add a default variant to satisfy the component
                onClick={closePopup}
                className="w-full bg-blue-900 text-white hover:bg-blue-800 transition"
              >
                OK
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;