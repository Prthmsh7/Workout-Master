import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Auth = ({ isDarkMode, onClose }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { login, register, loading } = useAuth();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      if (mode === 'register') {
        // Validate password match
        if (formData.password !== formData.confirmPassword) {
          setMessage({ type: 'error', text: 'Passwords do not match' });
          return;
        }

        // Register new user
        await register(formData.name, formData.email, formData.password);
        setMessage({ type: 'success', text: 'Registration successful!' });
        onClose();
      } else {
        // Login user
        await login(formData.email, formData.password);
        setMessage({ type: 'success', text: 'Login successful!' });
        onClose();
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || (mode === 'login' ? 'Login failed' : 'Registration failed') 
      });
    }
  };

  // Toggle between login and register modes
  const toggleMode = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setMode(mode === 'login' ? 'register' : 'login');
      setMessage(null);
      setIsAnimating(false);
    }, 300);
  };

  const themeClasses = {
    container: `relative rounded-2xl shadow-xl overflow-hidden ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } transition-all duration-300 transform`,
    header: `py-6 px-8 ${
      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
    }`,
    form: `p-8`,
    inputGroup: `relative mb-6`,
    input: `w-full px-4 py-3 pl-11 rounded-lg ${
      isDarkMode 
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
    } border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`,
    inputIcon: `absolute left-3 top-1/2 transform -translate-y-1/2 ${
      isDarkMode ? 'text-gray-400' : 'text-gray-500'
    }`,
    button: `w-full py-3 px-4 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200 shadow-md hover:shadow-lg`,
    link: `text-green-600 hover:text-green-700 cursor-pointer font-medium transition-colors`,
    closeButton: `absolute top-4 right-4 ${
      isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'
    } transition-colors`
  };

  return (
    <div className={themeClasses.container}>
      {/* Close button */}
      <button 
        onClick={onClose}
        className={themeClasses.closeButton}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <div className={themeClasses.header}>
        <h2 className="text-2xl font-bold text-center">
          {mode === 'login' ? 'Welcome Back!' : 'Join Workout Master'}
        </h2>
        <p className={`text-center mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {mode === 'login' ? 'Log in to access your workouts' : 'Create an account to begin your fitness journey'}
        </p>
      </div>

      <div className={themeClasses.form}>
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            message.type === 'error' 
              ? 'bg-red-100 text-red-700 border border-red-200' 
              : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            <span className="mr-2">
              {message.type === 'error' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            {message.text}
          </div>
        )}

        <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className={themeClasses.inputGroup}>
                <div className={themeClasses.inputIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={themeClasses.input}
                  required
                />
              </div>
            )}

            <div className={themeClasses.inputGroup}>
              <div className={themeClasses.inputIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={themeClasses.input}
                required
              />
            </div>

            <div className={themeClasses.inputGroup}>
              <div className={themeClasses.inputIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={themeClasses.input}
                required
              />
            </div>

            {mode === 'register' && (
              <div className={themeClasses.inputGroup}>
                <div className={themeClasses.inputIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={themeClasses.input}
                  required
                />
              </div>
            )}

            <button 
              type="submit" 
              className={themeClasses.button}
              disabled={loading}
            >
              {loading 
                ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) 
                : mode === 'login' 
                  ? 'Sign In' 
                  : 'Create Account'
              }
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className={`flex-grow h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <span className={`px-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>OR</span>
              <div className={`flex-grow h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            </div>
            
            {mode === 'login' ? (
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Don't have an account?{' '}
                <span onClick={toggleMode} className={themeClasses.link}>
                  Sign up
                </span>
              </p>
            ) : (
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Already have an account?{' '}
                <span onClick={toggleMode} className={themeClasses.link}>
                  Sign in
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth; 