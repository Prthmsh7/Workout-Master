import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Generator from './components/Generator'
import Workout from './components/Workout'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import WorkoutHistory from './components/WorkoutHistory'
import { generateWorkout } from './utils/functions'

function App() {
  const [workout, setWorkout] = useState(null)
  const [poison, setPoison] = useState('individual')
  const [muscles, setMuscles] = useState([])
  const [goal, setGoal] = useState('strength_power')
  const [workoutHistory, setWorkoutHistory] = useState([])
  const [currentView, setCurrentView] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: 'User',
    level: 'Beginner',
    workoutsCompleted: 0,
    streak: 0,
    lastWorkout: null
  })

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedWorkoutHistory = localStorage.getItem('workoutHistory');
    const savedUserProfile = localStorage.getItem('userProfile');
    const savedThemePreference = localStorage.getItem('themePreference');
    
    if (savedWorkoutHistory) {
      setWorkoutHistory(JSON.parse(savedWorkoutHistory));
    }
    
    if (savedUserProfile) {
      setUserProfile(JSON.parse(savedUserProfile));
    }

    if (savedThemePreference) {
      setIsDarkMode(JSON.parse(savedThemePreference));
    } else {
      // Check if user's system prefers dark mode
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkMode);
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [workoutHistory, userProfile]);

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

  function updateWorkout() {
    if (muscles.length < 1) {
      return
    }
    let newWorkout = generateWorkout({ poison, muscles, goal })
    setWorkout(newWorkout)
    handleViewChange('workout')
  }

  function completeWorkout() {
    const completedWorkout = {
      date: new Date().toISOString(),
      type: poison,
      muscles: muscles,
      goal: goal,
      exercises: workout
    }

    setWorkoutHistory([completedWorkout, ...workoutHistory])
    setUserProfile({
      ...userProfile,
      workoutsCompleted: userProfile.workoutsCompleted + 1,
      streak: userProfile.streak + 1,
      lastWorkout: new Date().toISOString()
    })

    setWorkout(null)
    handleViewChange('home')
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleViewChange = (view) => {
    setIsAnimating(true);
    
    // Short delay to allow exit animation
    setTimeout(() => {
      setCurrentView(view);
      // Allow time for enter animation
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  const themeClass = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-white text-gray-900';

  return (
    <div className={`min-h-screen flex flex-col ${themeClass} transition-colors duration-500 text-sm sm:text-base`}>
      <Navbar 
        currentView={currentView} 
        setCurrentView={handleViewChange} 
        userProfile={userProfile}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <div className="flex-grow relative overflow-hidden">
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
          {currentView === 'home' && (
            <Hero isDarkMode={isDarkMode} setCurrentView={handleViewChange} />
          )}
          
          {currentView === 'generate' && (
            <Generator
              poison={poison}
              setPoison={setPoison}
              muscles={muscles}
              setMuscles={setMuscles}
              goal={goal}
              setGoal={setGoal}
              updateWorkout={updateWorkout}
              isDarkMode={isDarkMode}
            />
          )}
          
          {currentView === 'workout' && workout && (
            <Workout 
              workout={workout} 
              completeWorkout={completeWorkout}
              isDarkMode={isDarkMode} 
            />
          )}
          
          {currentView === 'profile' && (
            <Profile 
              userProfile={userProfile} 
              setUserProfile={setUserProfile}
              isDarkMode={isDarkMode}
            />
          )}
          
          {currentView === 'history' && (
            <WorkoutHistory 
              history={workoutHistory}
              isDarkMode={isDarkMode} 
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
