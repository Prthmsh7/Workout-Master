import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { 
  SignedIn, 
  SignedOut, 
  SignIn, 
  SignUp, 
  UserButton, 
  useUser, 
  useClerk,
  useAuth as useClerkAuth
} from '@clerk/clerk-react'
import Hero from './components/Hero'
import Generator from './components/Generator'
import Workout from './components/Workout'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import WorkoutHistory from './components/WorkoutHistory'
import { useWorkout } from './context/WorkoutContext'

// Custom styles for Clerk components
const ClerkStyles = ({ isDarkMode }) => {
  const styles = `
    .clerk-auth-container .cl-card {
      border-radius: 0.75rem;
      ${isDarkMode ? 'background-color: #1f2937; color: white;' : ''}
    }
    
    .clerk-auth-container .cl-socialButtonsIconButton {
      ${isDarkMode ? 'background-color: #374151; border-color: #4b5563;' : ''}
    }
    
    .clerk-auth-container .cl-dividerText {
      ${isDarkMode ? 'color: #9ca3af;' : ''}
    }
    
    .clerk-auth-container .cl-dividerLine {
      ${isDarkMode ? 'background-color: #4b5563;' : ''}
    }
    
    .clerk-auth-container .cl-formFieldLabel {
      ${isDarkMode ? 'color: #e5e7eb;' : ''}
    }
    
    .clerk-auth-container .cl-formFieldInput {
      ${isDarkMode ? 'background-color: #374151; border-color: #4b5563; color: white;' : ''}
    }
    
    .clerk-auth-container .cl-footerActionText {
      ${isDarkMode ? 'color: #9ca3af;' : ''}
    }
  `;

  return <style>{styles}</style>;
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();
  
  if (!isLoaded) {
    // Show loading state while Clerk loads
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  if (!isSignedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return children;
};

function App() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useClerkAuth();
  const { currentWorkout, saveWorkout, markWorkoutComplete } = useWorkout();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  // Check system preference for dark mode
  useEffect(() => {
    const savedThemePreference = localStorage.getItem('themePreference');
    
    if (savedThemePreference) {
      setIsDarkMode(JSON.parse(savedThemePreference));
    } else {
      // Default to dark mode
      setIsDarkMode(true);
    }
  }, []);

  // Save theme preference when it changes
  useEffect(() => {
    localStorage.setItem('themePreference', JSON.stringify(isDarkMode));
    
    // Apply the appropriate theme class to the document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Store Clerk token in localStorage for API use
  useEffect(() => {
    const storeClerkToken = async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          localStorage.setItem('clerk-token', token);
        } catch (error) {
          console.error('Failed to get Clerk token:', error);
        }
      } else {
        localStorage.removeItem('clerk-token');
      }
    };

    if (isLoaded) {
      storeClerkToken();
    }
  }, [isSignedIn, isLoaded, getToken]);

  // Handle workout completion with backend integration
  const completeWorkout = async () => {
    try {
      // First save the workout if it doesn't have an ID yet
      let workoutId = currentWorkout._id;
      
      if (!workoutId) {
        const savedWorkout = await saveWorkout();
        workoutId = savedWorkout._id;
      }
      
      // Mark the workout as complete
      await markWorkoutComplete(workoutId);
      
      // Navigate back to home
      navigate('/');
    } catch (error) {
      console.error('Error completing workout:', error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClass = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-white text-gray-900';

  // Clerk Auth Modal with improved appearance
  const ClerkAuthModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
        <div className="w-full max-w-md m-4 transform transition-all duration-300 animate-slideIn relative">
          <button 
            onClick={() => setShowAuth(false)}
            className="absolute top-2 right-2 z-10 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white rounded-full bg-white dark:bg-gray-800 p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className={`rounded-2xl shadow-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6 pb-0">
              <h2 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {showAuth === 'signin' ? 'Welcome Back!' : 'Join Workout Master'}
              </h2>
              <p className={`text-center mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {showAuth === 'signin' 
                  ? 'Sign in to access your workouts' 
                  : 'Create an account to begin your fitness journey'}
              </p>
            </div>
            
            <div className="clerk-auth-container">
              {showAuth === 'signin' ? (
                <SignIn 
                  routing="path" 
                  path="/" 
                  signUpUrl="#" 
                  afterSignInUrl="/"
                  appearance={{
                    elements: {
                      formButtonPrimary: 'bg-green-600 hover:bg-green-700',
                      footerActionLink: 'text-green-600 hover:text-green-700',
                    },
                  }}
                />
              ) : (
                <SignUp 
                  routing="path" 
                  path="/" 
                  signInUrl="#" 
                  afterSignUpUrl="/"
                  appearance={{
                    elements: {
                      formButtonPrimary: 'bg-green-600 hover:bg-green-700',
                      footerActionLink: 'text-green-600 hover:text-green-700',
                    },
                  }}
                />
              )}
              
              <div className="py-4 px-6 text-center">
                {showAuth === 'signin' ? (
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setShowAuth('signup')}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Already have an account?{' '}
                    <button 
                      onClick={() => setShowAuth('signin')}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeClass} transition-colors duration-500 text-sm sm:text-base`}>
      <Navbar 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        setShowAuth={setShowAuth}
        isAuthenticated={isSignedIn}
      />
      
      <div className="flex-grow relative overflow-hidden">
        <Routes>
          <Route path="/" element={<Hero isDarkMode={isDarkMode} />} />
          <Route path="/generate" element={
            <ProtectedRoute>
              <Generator isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } />
          <Route path="/workout" element={
            <ProtectedRoute>
              {currentWorkout ? (
                <Workout 
                  completeWorkout={completeWorkout}
                  isDarkMode={isDarkMode} 
                />
              ) : (
                <Navigate to="/generate" replace />
              )}
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute>
              <WorkoutHistory isDarkMode={isDarkMode} />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      
      {/* Clerk Auth Modal */}
      {showAuth && <ClerkAuthModal />}

      {/* Clerk custom styles */}
      <ClerkStyles isDarkMode={isDarkMode} />
    </div>
  )
}

export default App
