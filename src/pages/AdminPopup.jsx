import React, { useState } from 'react';
import axios from 'axios';
import GlossyButton from '../components/buttons/mirrorbutton.jsx';

const AdminPopup = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // This instance will now use the Vite proxy for requests starting with /api
  const instance = axios.create({
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const loginData = {
      email: username, // Payload CMS expects 'email' by default for login
      password: password
    };

    try {
      // Use the proxied API endpoint for logging in.
      const response = await instance.post('/api/admins/login', loginData);
      console.log('Response:', response.data);

      // Check if token and user are present in response
      if (response.data.token && response.data.user) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.user));
        //setIsLoggedIn(true);

        setTimeout(() => {
          onClose();
          // Redirect to admin home page
          window.location.href = '/admin';
        }, 1500);
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);

      if (err.response) {
        setError(err.response.data.message || `Server error: ${err.response.status}`);
      } else if (err.request) {
        setError('Unable to connect to server. Please check your connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // if (isLoggedIn) {
  //   return (
  //     <div 
  //       className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
  //       onClick={handleOverlayClick}
  //     >
  //       <div className="bg-black/70 backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/10 max-w-md w-full">
  //         <div className="text-center">
  //           <div className="text-green-400 text-6xl mb-4">✓</div>
  //           <h2 className="text-2xl font-bold text-white mb-4">Login Successful!</h2>
  //           <p className="text-gray-300">Redirecting to admin dashboard...</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-black/70 backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/10 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-wide">BAF</h1>
          <h2 className="text-2xl font-medium text-gray-400">Admin Panel</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent backdrop-blur-sm"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent backdrop-blur-sm"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex justify-center">
            <div className="w-3/4">
              <GlossyButton
                type="submit"
                disabled={isLoading}
                className={`w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </GlossyButton>
            </div>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm italic">
            Enter your admin credentials to access the CMS
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPopup;