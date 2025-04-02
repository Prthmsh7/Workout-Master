import React, { useState, useEffect } from 'react';

export default function Navbar({ currentView, setCurrentView, userProfile, isDarkMode, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'generate', label: 'Create Workout' },
    { id: 'history', label: 'History' },
    { id: 'profile', label: 'Profile' }
  ];

  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white border-b border-gray-200';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const accentColor = 'text-green-600';
  const buttonBgColor = 'bg-green-600';
  const buttonHoverColor = 'hover:bg-green-700';
  const navHoverBg = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';

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

  return (
    <nav className={`${bgColor} ${isScrolled ? 'shadow-md' : 'shadow-lg'} sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl cursor-pointer transform hover:scale-105 transition-transform duration-200" onClick={() => setCurrentView('home')}>
                <span className={`${textColor} hover:opacity-90 transition-opacity`}>Work</span>
                <span className={`${accentColor} hover:text-green-700 transition-colors`}>Out</span>
                <span className={`${textColor} hover:opacity-90 transition-opacity`}> Master</span>
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                  currentView === item.id
                    ? `${buttonBgColor} text-white shadow-md hover:shadow-lg`
                    : `${textColor} ${navHoverBg}`
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.label}
              </button>
            ))}
            
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-md ${navHoverBg} transition-all duration-200 hover:rotate-12`}
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
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <span className={`${textColor} text-sm font-medium opacity-90 hover:opacity-100 transition-opacity`}>{userProfile.name}</span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-xs ml-2`}>
                  {userProfile.workoutsCompleted} workouts
                </span>
              </div>
              <div 
                className={`h-8 w-8 rounded-full ${buttonBgColor} flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform hover:shadow-md`}
                onClick={() => setCurrentView('profile')}
              >
                <span className="text-white font-medium">{userProfile.name[0]}</span>
              </div>
              
              <button
                onClick={toggleTheme}
                className={`md:hidden p-2 rounded-md ${navHoverBg} transition-all duration-200 hover:rotate-12`}
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
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className={`inline-flex items-center justify-center p-2 rounded-md ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ${navHoverBg} focus:outline-none transform hover:scale-105 transition-transform`}
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
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                toggleMobileMenu();
              }}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 ${
                currentView === item.id
                  ? `${buttonBgColor} text-white shadow-md`
                  : `${textColor} ${navHoverBg}`
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
} 