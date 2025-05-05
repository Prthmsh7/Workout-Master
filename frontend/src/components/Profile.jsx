import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { getRandomTip, MOTIVATIONAL_QUOTES } from '../utils/workoutTips';
import { useAuth } from '../context/AuthContext';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useWorkout } from '../context/WorkoutContext';

function AchievementBadge({ title, description, icon, unlocked, isDarkMode }) {
  return (
    <div className={`border rounded-xl transition-all duration-300 transform hover:scale-105 ${
      unlocked 
        ? isDarkMode 
          ? 'border-green-700 bg-green-900/30' 
          : 'border-green-300 bg-green-50'
        : isDarkMode 
          ? 'border-gray-700 bg-gray-800/50' 
          : 'border-gray-200 bg-gray-50'
    } p-5`}>
      <div className="flex items-center gap-4 mb-2">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
          unlocked 
            ? isDarkMode 
              ? 'bg-green-600 text-white' 
              : 'bg-green-500 text-white' 
            : isDarkMode 
              ? 'bg-gray-700 text-gray-400' 
              : 'bg-gray-200 text-gray-500'
        }`}>
          {icon}
        </div>
        <h3 className={`font-bold text-lg ${
          unlocked 
            ? isDarkMode 
              ? 'text-green-400' 
              : 'text-green-600' 
            : isDarkMode 
              ? 'text-gray-400' 
              : 'text-gray-500'
        }`}>
          {title}
        </h3>
      </div>
      <p className={`text-sm pl-16 ${
        unlocked 
          ? isDarkMode 
            ? 'text-gray-300' 
            : 'text-gray-700' 
          : isDarkMode 
            ? 'text-gray-500' 
            : 'text-gray-500'
      }`}>{description}</p>
    </div>
  );
}

function ProgressChart({ data, label, timeLabels, isDarkMode }) {
  const max = Math.max(...data, 1); // Prevent division by zero
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</h3>
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Total: {data.reduce((sum, val) => sum + val, 0)}
        </span>
      </div>
      <div className="flex items-end h-32 gap-1">
        {data.map((value, index) => (
          <div 
            key={index} 
            className="flex-1 flex flex-col items-center group"
          >
            <div className="relative w-full h-full flex items-end">
              <div 
                className={`w-full ${
                  value > 0 
                    ? isDarkMode 
                      ? 'bg-gradient-to-t from-green-700 to-green-500' 
                      : 'bg-gradient-to-t from-green-500 to-green-400' 
                    : isDarkMode 
                      ? 'bg-gray-700' 
                      : 'bg-gray-200'
                } transition-all duration-300 rounded-t-md hover:opacity-90`}
                style={{ height: `${(value / max) * 100}%`, minHeight: value > 0 ? '8px' : '2px' }}
              >
                <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white'
                } px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none text-xs font-medium z-10`}>
                  {value}
                </div>
              </div>
            </div>
            <span className={`text-xs mt-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {timeLabels ? timeLabels[index] : index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MuscleDistributionChart({ data, isDarkMode }) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);
  
  const getColor = (muscle, isDark) => {
    const colors = {
      'Chest': isDark ? 'bg-red-700/70' : 'bg-red-500/80',
      'Back': isDark ? 'bg-blue-700/70' : 'bg-blue-500/80',
      'Legs': isDark ? 'bg-purple-700/70' : 'bg-purple-500/80',
      'Arms': isDark ? 'bg-yellow-700/70' : 'bg-yellow-500/80',
      'Shoulders': isDark ? 'bg-green-700/70' : 'bg-green-500/80',
      'Core': isDark ? 'bg-orange-700/70' : 'bg-orange-500/80',
      'default': isDark ? 'bg-gray-700/70' : 'bg-gray-500/80'
    };
    
    return colors[muscle] || colors.default;
  };
  
  return (
    <div className="w-full">
      <h3 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Muscle Group Focus
      </h3>
      <div className="space-y-3">
        {Object.entries(data).map(([muscle, count]) => (
          <div key={muscle} className="w-full">
            <div className="flex justify-between mb-1">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{muscle}</span>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {count} workouts ({Math.round((count / total) * 100)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
              <div 
                className={`h-2.5 rounded-full ${getColor(muscle, isDarkMode)}`}
                style={{ width: `${(count / Math.max(...Object.values(data))) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Profile = ({ isDarkMode }) => {
  // Use clerk user 
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { workoutHistory } = useWorkout();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fitnessLevel: 'Beginner',
    weightUnit: 'kg',
    fitnessGoals: []
  });
  const [message, setMessage] = useState(null);
  const [stats, setStats] = useState({
    workoutsPerWeekday: [0, 0, 0, 0, 0, 0, 0],
    workoutsByMuscle: {},
    achievements: []
  });

  // Calculate workout statistics when workout history changes
  useEffect(() => {
    if (workoutHistory && workoutHistory.length > 0) {
      // Calculate workouts per weekday
      const weekdays = [0, 0, 0, 0, 0, 0, 0]; // Sun-Sat
      
      // Calculate muscle group distribution
      const muscleGroups = {
        'Chest': 0,
        'Back': 0,
        'Legs': 0,
        'Arms': 0,
        'Shoulders': 0,
        'Core': 0
  };

  // Calculate achievements
  const achievements = [
    {
      title: 'First Workout',
      description: 'Complete your first workout',
          icon: '🔥', 
          unlocked: workoutHistory.length > 0
    },
    {
      title: 'Consistency King',
          description: 'Complete at least 5 workouts', 
      icon: '👑',
          unlocked: workoutHistory.length >= 5 
    },
    {
          title: 'Muscle Master', 
          description: 'Target every major muscle group', 
      icon: '💪',
          unlocked: false // Will set based on muscle calculations
        },
        { 
          title: 'Dedication', 
          description: 'Complete 10 workouts', 
          icon: '🏆', 
          unlocked: workoutHistory.length >= 10
        }
      ];
      
      // Process each workout
      workoutHistory.forEach(workout => {
        // Count by weekday
        const date = new Date(workout.date);
        const weekday = date.getDay(); // 0-6
        weekdays[weekday]++;
        
        // Count muscle groups
        if (workout.exercises && Array.isArray(workout.exercises)) {
          const targetedMuscles = new Set();
          
          workout.exercises.forEach(exercise => {
            if (exercise.muscles && Array.isArray(exercise.muscles)) {
              exercise.muscles.forEach(muscle => {
                targetedMuscles.add(muscle);
                
                // Map to our simplified categories
                if (['chest', 'pecs'].includes(muscle.toLowerCase())) {
                  muscleGroups['Chest']++;
                } else if (['back', 'lats', 'traps'].includes(muscle.toLowerCase())) {
                  muscleGroups['Back']++;
                } else if (['quads', 'hamstrings', 'glutes', 'calves', 'legs'].includes(muscle.toLowerCase())) {
                  muscleGroups['Legs']++;
                } else if (['biceps', 'triceps', 'forearms', 'arms'].includes(muscle.toLowerCase())) {
                  muscleGroups['Arms']++;
                } else if (['shoulders', 'delts'].includes(muscle.toLowerCase())) {
                  muscleGroups['Shoulders']++;
                } else if (['abs', 'core'].includes(muscle.toLowerCase())) {
                  muscleGroups['Core']++;
                }
              });
            }
          });
        }
      });
      
      // Check if all major muscle groups have been targeted
      const hasAllMuscleGroups = Object.values(muscleGroups).every(count => count > 0);
      achievements[2].unlocked = hasAllMuscleGroups;
      
      // Update state with calculated stats
      setStats({
        workoutsPerWeekday: weekdays,
        workoutsByMuscle: muscleGroups,
        achievements
      });
    }
  }, [workoutHistory]);

  // Initialize user preferences from local storage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        setFormData(prev => ({
          ...prev,
          ...preferences
        }));
      } catch (error) {
        console.error('Failed to parse user preferences:', error);
      }
    }
  }, []);

  if (!isLoaded) {
    return (
      <SectionWrapper isDarkMode={isDarkMode}>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        </div>
      </SectionWrapper>
    );
  }

  if (!clerkUser) {
    return (
      <SectionWrapper isDarkMode={isDarkMode}>
        <div className="text-center py-16">
          <div className={`max-w-md mx-auto p-8 rounded-xl ${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white shadow-lg border border-gray-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Please log in to view your profile.</p>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        fitnessGoals: [...formData.fitnessGoals, name]
      });
    } else {
      setFormData({
        ...formData,
        fitnessGoals: formData.fitnessGoals.filter(goal => goal !== name)
      });
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing, reset form from saved preferences
      const savedPreferences = localStorage.getItem('userPreferences');
      if (savedPreferences) {
        try {
          setFormData(JSON.parse(savedPreferences));
        } catch (error) {
          console.error('Failed to parse user preferences', error);
        }
      }
      setMessage(null);
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      // Save to localStorage
      localStorage.setItem('userPreferences', JSON.stringify(formData));
      setMessage({ type: 'success', text: 'Preferences saved successfully' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to save preferences' });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to log out' });
    }
  };

  const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get motivational quote
  const motivationalQuote = getRandomTip(MOTIVATIONAL_QUOTES);

      return (
    <SectionWrapper isDarkMode={isDarkMode}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className={`mb-8 p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white shadow-lg border border-gray-100'}`}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0">
              {clerkUser.imageUrl ? (
                <img 
                  src={clerkUser.imageUrl} 
                  alt={clerkUser.fullName || 'User'}
                  className="w-24 h-24 rounded-xl object-cover border-2 border-green-500"
                />
              ) : (
                <div className={`w-24 h-24 rounded-xl flex items-center justify-center text-2xl font-bold bg-green-600 text-white`}>
                  {clerkUser.firstName ? clerkUser.firstName.charAt(0) : '?'}
                </div>
              )}
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                {clerkUser.fullName || clerkUser.username || 'Fitness Enthusiast'}
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
                {clerkUser.primaryEmailAddress?.emailAddress}
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className={`px-3 py-1 text-sm rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  Level: {formData.fitnessLevel}
                </span>
                {formData.fitnessGoals && formData.fitnessGoals.map(goal => (
                  <span key={goal} className={`px-3 py-1 text-sm rounded-full ${isDarkMode ? 'bg-green-900/30 text-green-300 border border-green-800' : 'bg-green-100 text-green-700'}`}>
                    {goal}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handleEditToggle} 
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isEditing 
                    ? isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : isDarkMode 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
              >
                {isEditing ? 'Cancel' : 'Edit Preferences'}
              </button>
              
              <button 
                onClick={handleLogout} 
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-red-700 text-white hover:bg-red-600' 
                    : 'bg-red-600 text-white hover:bg-red-500'
                }`}
              >
                Logout
              </button>
            </div>
          </div>
          
          {/* Motivational Quote */}
          <div className={`mt-6 p-4 rounded-xl ${
            isDarkMode 
              ? 'bg-blue-900/20 border border-blue-900' 
              : 'bg-blue-50 border border-blue-100'
          }`}>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'} flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className={`text-sm italic ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                "{motivationalQuote}"
              </p>
            </div>
          </div>
        </div>
        
        {/* User Preferences Edit Form */}
        {isEditing && (
          <div className={`mb-8 p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white shadow-lg border border-gray-100'}`}>
            <h2 className="text-xl font-bold mb-4">Edit Preferences</h2>
            
            {message && (
              <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
                message.type === 'error' 
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800' 
                  : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {message.type === 'error' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  )}
                </svg>
                <span>{message.text}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                  <label className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Fitness Level
                  </label>
              <select
                    name="fitnessLevel"
                    value={formData.fitnessLevel}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
                  <label className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Weight Unit Preference
                  </label>
              <select
                    name="weightUnit"
                    value={formData.weightUnit}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lbs">Pounds (lbs)</option>
              </select>
            </div>
            </div>

              <div className="mt-6">
                <label className={`block mb-3 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Fitness Goals
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {['Strength', 'Hypertrophy', 'Weight Loss', 'Endurance', 'Health', 'Mobility'].map(goal => (
                    <div key={goal} className="flex items-center">
              <input
                        type="checkbox"
                        id={goal}
                        name={goal}
                        checked={formData.fitnessGoals.includes(goal)}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor={goal} className={`ml-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {goal}
                      </label>
            </div>
                  ))}
            </div>
          </div>
          
              <div className="mt-6 flex justify-end">
            <button
              type="submit"
                  className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-green-600 text-white hover:bg-green-500'
                  }`}
                >
                  Save Preferences
            </button>
          </div>
        </form>
          </div>
        )}
        
        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Workout Distribution */}
          <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white shadow-lg border border-gray-100'}`}>
            <h2 className="text-xl font-bold mb-4">Weekly Activity</h2>
            <ProgressChart 
              data={stats.workoutsPerWeekday} 
              label="Workouts by Day of Week"
              timeLabels={weekdayLabels}
              isDarkMode={isDarkMode} 
            />
          </div>
          
          {/* Muscle Group Distribution */}
          <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white shadow-lg border border-gray-100'}`}>
            <h2 className="text-xl font-bold mb-4">Muscle Focus</h2>
            <MuscleDistributionChart 
              data={stats.workoutsByMuscle}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
        
        {/* Achievements Section */}
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white shadow-lg border border-gray-100'}`}>
          <h2 className="text-xl font-bold mb-6">Your Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.achievements.map((achievement, index) => (
              <AchievementBadge
                key={index}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                unlocked={achievement.unlocked}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Profile; 