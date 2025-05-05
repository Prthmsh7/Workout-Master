import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser, useClerk, UserButton } from '@clerk/clerk-react';

export default function Navbar({ isDarkMode, toggleTheme, setShowAuth, isAuthenticated }) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // Get current path for highlighting active nav item
  const currentPath = location.pathname;
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', path: '/', icon: <HomeIcon /> },
    { id: 'generate', label: 'Create Workout', path: '/generate', icon: <DumbbellIcon /> },
    { id: 'history', label: 'History', path: '/history', icon: <HistoryIcon /> },
    { id: 'profile', label: 'Profile', path: '/profile', icon: <ProfileIcon /> }
  ];

  // Modern glass effect navbar
  const bgColor = isDarkMode 
    ? isScrolled 
      ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-800' 
      : 'bg-transparent'
    : isScrolled 
      ? 'bg-white/90 backdrop-blur-md border-b border-gray-200' 
      : 'bg-white';
      
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const accentColor = 'text-green-500';
  const buttonBgColor = 'bg-green-600';
  const buttonHoverColor = 'hover:bg-green-700';
  const navHoverBg = isDarkMode ? 'hover:bg-gray-800/60' : 'hover:bg-gray-100/60';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      if (isMobileMenuOpen) {
        mobileMenu.classList.add('animate-slide-out');
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('animate-slide-out');
        }, 300);
      } else {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('animate-slide-in');
        setTimeout(() => {
          mobileMenu.classList.remove('animate-slide-in');
        }, 300);
      }
    }
  };

  const handleProfileMenuToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleAuthClick = () => {
    setShowAuth('signin');
    setIsMobileMenuOpen(false);
  };

  const handleSignUpClick = () => {
    setShowAuth('signup');
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className={`${bgColor} ${isScrolled ? 'shadow-lg' : ''} sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-3'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl cursor-pointer transform hover:scale-105 transition-transform duration-200">
                <span className={`${textColor} hover:opacity-90 transition-opacity`}>Work</span>
                <span className={`${accentColor} hover:text-green-400 transition-colors`}>Out</span>
                <span className={`${textColor} hover:opacity-90 transition-opacity`}> Master</span>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <Link
                key={item.id}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  currentPath === item.path
                    ? `${buttonBgColor} text-white shadow-md hover:shadow-lg scale-105`
                    : `${textColor} ${navHoverBg} hover:scale-105`
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            
            {/* GitHub Link Button */}
            <a
              href="https://github.com/Prthmsh7/Workout-Master"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${navHoverBg} transition-all duration-200 hover:scale-110 flex items-center justify-center w-9 h-9`}
              aria-label="GitHub Repository"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? "#ffffff" : "#333333"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${navHoverBg} transition-all duration-300 hover:rotate-12 w-9 h-9 flex items-center justify-center`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative ml-3">
                {/* Use Clerk's UserButton for better user management */}
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: '2.25rem',
                        height: '2.25rem',
                      },
                      userButtonBox: {
                        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                      }
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={handleAuthClick}
                  className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-500 transition-colors hover:shadow-lg"
                >
                  Sign In
                </button>
                <button 
                  onClick={handleSignUpClick}
                  className={`px-4 py-2 border ${isDarkMode ? 'border-green-600 text-green-400 hover:bg-gray-800' : 'border-green-600 text-green-600 hover:bg-green-50'} rounded-lg shadow-sm text-sm font-medium transition-colors`}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile theme toggler */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${navHoverBg} transition-all duration-200 flex items-center justify-center w-8 h-8`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            {/* Mobile profile button */}
            {isAuthenticated && (
              <div className="ml-2">
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: '2rem',
                        height: '2rem',
                      },
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            )}
            
            {/* Mobile menu button */}
            <button
              className={`inline-flex items-center justify-center p-2 rounded-md ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} ${navHoverBg} focus:outline-none transform hover:scale-105 transition-transform`}
              onClick={toggleMobileMenu}
            >
              <svg className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="hidden md:hidden transition-all duration-300 overflow-hidden" id="mobile-menu">
        <div className={`px-4 pt-2 pb-4 space-y-3 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          {navItems.map((item, index) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-all duration-200 ${
                currentPath === item.path
                  ? `${buttonBgColor} text-white shadow-md`
                  : `${textColor} ${navHoverBg}`
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          
          <a
            href="https://github.com/Prthmsh7/Workout-Master"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-all duration-200 ${textColor} ${navHoverBg}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            GitHub
          </a>
          
          {!isAuthenticated && (
            <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-800">
              <button 
                onClick={handleAuthClick}
                className="w-full mb-2 px-4 py-3 rounded-lg text-base font-medium text-white bg-green-600 hover:bg-green-700 transition-colors text-center"
              >
                Sign In
              </button>
              <button 
                onClick={handleSignUpClick}
                className={`w-full px-4 py-3 rounded-lg text-base font-medium border ${isDarkMode ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'} hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center`}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// Icon components for navigation
function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function DumbbellIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V6a2 2 0 012-2h2m4 0h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2m-4 0H6a2 2 0 01-2-2v-2" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
} 