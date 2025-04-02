import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import Button from './Button';
import { getRandomTip, MOTIVATIONAL_QUOTES } from '../utils/workoutTips';

function AchievementBadge({ title, description, icon, unlocked, isDarkMode }) {
  const bgColor = unlocked 
    ? 'bg-green-600' 
    : isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
  
  const textColor = unlocked 
    ? 'text-white' 
    : isDarkMode ? 'text-gray-400' : 'text-gray-500';
  
  const borderColor = unlocked 
    ? 'border-green-500' 
    : isDarkMode ? 'border-gray-600' : 'border-gray-300';
  
  return (
    <div className={`border ${borderColor} rounded-lg p-4 transition-all duration-300 transform hover:scale-105 ${unlocked ? 'hover:shadow-md' : ''}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <h3 className={`font-semibold ${unlocked ? (isDarkMode ? 'text-white' : 'text-gray-800') : textColor}`}>
          {title}
        </h3>
      </div>
      <p className={`text-sm ${textColor}`}>{description}</p>
    </div>
  );
}

function ProgressChart({ data, label, isDarkMode }) {
  const max = Math.max(...data);
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const labelColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  
  return (
    <div className="w-full">
      <h3 className={`${labelColor} mb-2 text-sm`}>{label}</h3>
      <div className="flex items-end h-20 gap-1">
        {data.map((value, index) => (
          <div 
            key={index} 
            className="flex-1 flex flex-col items-center group"
          >
            <div className="relative w-full">
              <div 
                className={`w-full bg-green-600 hover:bg-green-500 transition-all duration-300 rounded-t-sm`}
                style={{ height: `${(value / max) * 100}%`, minHeight: '4px' }}
              >
                <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 ${textColor} text-xs bg-gray-800 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none`}>
                  {value}
                </div>
              </div>
            </div>
            <span className={`text-xs mt-1 ${labelColor}`}>{String.fromCharCode(65 + index)}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <span className={`text-xs ${labelColor}`}>This Week</span>
        <span className={`text-xs ${labelColor}`}>Last Week</span>
      </div>
    </div>
  );
}

export default function Profile({ userProfile, setUserProfile, isDarkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: userProfile.name,
    level: userProfile.level,
    goal: userProfile.goal || 'strength',
    weight: userProfile.weight || '',
    height: userProfile.height || '',
    age: userProfile.age || '',
  });

  // Sample data for the analytics section
  const weeklyProgress = [3, 2, 4, 1, 5, 2, 3]; // Workouts per week
  const strengthProgress = [120, 125, 130, 135, 140]; // Simulated strength progress
  const quoteTip = getRandomTip(MOTIVATIONAL_QUOTES);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProfile({
      ...userProfile,
      name: formData.name,
      level: formData.level,
      goal: formData.goal,
      weight: formData.weight,
      height: formData.height,
      age: formData.age
    });
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Calculate achievements
  const achievements = [
    {
      title: 'First Workout',
      description: 'Complete your first workout',
      icon: '🏆',
      unlocked: userProfile.workoutsCompleted >= 1
    },
    {
      title: 'Consistency King',
      description: 'Complete 5 workouts',
      icon: '👑',
      unlocked: userProfile.workoutsCompleted >= 5
    },
    {
      title: 'Double Digits',
      description: 'Complete 10 workouts',
      icon: '💪',
      unlocked: userProfile.workoutsCompleted >= 10
    },
    {
      title: 'Dedicated Athlete',
      description: 'Complete 25 workouts',
      icon: '🔥',
      unlocked: userProfile.workoutsCompleted >= 25
    },
    {
      title: 'Streak Master',
      description: 'Maintain a 7-day streak',
      icon: '⚡',
      unlocked: userProfile.streak >= 7
    },
    {
      title: 'Fitness Fanatic',
      description: 'Maintain a 14-day streak',
      icon: '🌟',
      unlocked: userProfile.streak >= 14
    }
  ];

  // Theme colors
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const cardBorderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const secondaryTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const inputBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-50';
  const inputBorder = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const statsBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
  const buttonHoverBg = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
  const tabActiveBg = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const tabInactiveBg = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';

  const renderProfileContent = () => {
    if (isEditing) {
      return (
        <form onSubmit={handleSubmit} className={`${cardBg} rounded-lg p-6 shadow-lg border ${cardBorderColor}`}>
          <h2 className={`text-xl font-semibold mb-4 ${textColor}`}>Edit Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={`block ${secondaryTextColor} mb-2`} htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 rounded ${inputBg} border ${inputBorder} ${textColor} focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
                required
              />
            </div>
            
            <div>
              <label className={`block ${secondaryTextColor} mb-2`} htmlFor="level">Fitness Level</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className={`w-full p-2 rounded ${inputBg} border ${inputBorder} ${textColor} focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className={`block ${secondaryTextColor} mb-2`} htmlFor="goal">Primary Goal</label>
              <select
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className={`w-full p-2 rounded ${inputBg} border ${inputBorder} ${textColor} focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
              >
                <option value="strength">Strength</option>
                <option value="hypertrophy">Muscle Growth</option>
                <option value="endurance">Endurance</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="general">General Fitness</option>
              </select>
            </div>

            <div>
              <label className={`block ${secondaryTextColor} mb-2`} htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                min="13"
                max="120"
                value={formData.age}
                onChange={handleChange}
                className={`w-full p-2 rounded ${inputBg} border ${inputBorder} ${textColor} focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
              />
            </div>

            <div>
              <label className={`block ${secondaryTextColor} mb-2`} htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                min="20"
                max="300"
                value={formData.weight}
                onChange={handleChange}
                className={`w-full p-2 rounded ${inputBg} border ${inputBorder} ${textColor} focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
              />
            </div>

            <div>
              <label className={`block ${secondaryTextColor} mb-2`} htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                name="height"
                min="100"
                max="250"
                value={formData.height}
                onChange={handleChange}
                className={`w-full p-2 rounded ${inputBg} border ${inputBorder} ${textColor} focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className={`px-4 py-2 rounded ${inputBg} ${buttonHoverBg} transition-colors ${textColor}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition-colors text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      );
    }

    return (
      <div className={`${cardBg} rounded-lg overflow-hidden shadow-lg border ${cardBorderColor}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-green-600 flex items-center justify-center text-2xl font-bold text-white transform hover:scale-110 transition-transform duration-300">
                {userProfile.name[0]}
              </div>
              <div>
                <h2 className={`text-2xl font-semibold ${textColor} hover:text-green-600 transition-colors duration-300`}>{userProfile.name}</h2>
                <p className={secondaryTextColor}>{userProfile.level} • {userProfile.goal ? userProfile.goal.replace('_', ' ') : 'General Fitness'}</p>
                {userProfile.age && userProfile.weight && userProfile.height && (
                  <p className={`${secondaryTextColor} text-sm mt-1`}>
                    {userProfile.age} years • {userProfile.weight} kg • {userProfile.height} cm
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className={`p-2 rounded-md ${buttonHoverBg} transition-colors hover:scale-110 transform duration-300`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>
          
          {/* Motivational Quote */}
          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} p-4 rounded-lg mb-6 border ${isDarkMode ? 'border-gray-600' : 'border-green-100'}`}>
            <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-600'} text-sm italic`}>"{quoteTip}"</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${statsBg} p-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md`}>
              <h3 className={`${secondaryTextColor} mb-1 text-sm`}>Workouts Completed</h3>
              <p className={`text-3xl font-semibold ${textColor}`}>{userProfile.workoutsCompleted}</p>
            </div>
            
            <div className={`${statsBg} p-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md`}>
              <h3 className={`${secondaryTextColor} mb-1 text-sm`}>Current Streak</h3>
              <div className="flex items-end gap-1">
                <p className={`text-3xl font-semibold ${textColor}`}>{userProfile.streak}</p>
                <p className={`${secondaryTextColor} mb-1 text-sm`}>days</p>
              </div>
            </div>
            
            <div className={`${statsBg} p-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md`}>
              <h3 className={`${secondaryTextColor} mb-1 text-sm`}>Last Workout</h3>
              <p className={`text-xl ${textColor}`}>{formatDate(userProfile.lastWorkout)}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>Weekly Activity</h3>
            <ProgressChart data={weeklyProgress} label="Workouts" isDarkMode={isDarkMode} />
          </div>
        </div>
        
        <div className={`border-t ${cardBorderColor} p-6`}>
          <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>Account Actions</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              text="Reset Progress" 
              func={() => {
                if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
                  setUserProfile({
                    ...userProfile,
                    workoutsCompleted: 0,
                    streak: 0,
                    lastWorkout: null
                  });
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderAchievementsContent = () => {
    return (
      <div className={`${cardBg} rounded-lg overflow-hidden shadow-lg border ${cardBorderColor}`}>
        <div className="p-6">
          <h2 className={`text-xl font-semibold mb-6 ${textColor}`}>Your Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
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
          
          <div className="mt-8">
            <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>Progress Toward Next Achievement</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 mb-2">
              <div 
                className="bg-green-600 h-4 rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min((userProfile.workoutsCompleted % 5) / 5 * 100, 100)}%` }}
              ></div>
            </div>
            <p className={`text-sm ${secondaryTextColor}`}>
              {5 - (userProfile.workoutsCompleted % 5)} more workouts until your next milestone
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderAnalyticsContent = () => {
    return (
      <div className={`${cardBg} rounded-lg overflow-hidden shadow-lg border ${cardBorderColor}`}>
        <div className="p-6">
          <h2 className={`text-xl font-semibold mb-6 ${textColor}`}>Fitness Analytics</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
              <h3 className={`${textColor} font-medium mb-4`}>Strength Progress</h3>
              <ProgressChart data={strengthProgress} label="Weight (kg)" isDarkMode={isDarkMode} />
            </div>
            
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
              <h3 className={`${textColor} font-medium mb-4`}>Workout Frequency</h3>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${secondaryTextColor}`}>Target: 4 workouts/week</span>
                <span className={`text-sm ${secondaryTextColor}`}>Current: {weeklyProgress.reduce((a, b) => a + b, 0)/7} workouts/week</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
                <div 
                  className="bg-green-600 h-4 rounded-full"
                  style={{ width: `${Math.min((weeklyProgress.reduce((a, b) => a + b, 0)/7) / 4 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg lg:col-span-2`}>
              <h3 className={`${textColor} font-medium mb-2`}>Body Composition</h3>
              <p className={`${secondaryTextColor} text-sm mb-4`}>Track your progress over time. Enter your measurements in the profile section.</p>
              
              {userProfile.weight && userProfile.height ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className={`${cardBg} p-3 rounded-lg`}>
                    <h4 className={`${secondaryTextColor} text-xs mb-1`}>BMI</h4>
                    <p className={`${textColor} text-xl font-semibold`}>
                      {(userProfile.weight / ((userProfile.height/100) * (userProfile.height/100))).toFixed(1)}
                    </p>
                  </div>
                  <div className={`${cardBg} p-3 rounded-lg`}>
                    <h4 className={`${secondaryTextColor} text-xs mb-1`}>Ideal Weight Range</h4>
                    <p className={`${textColor} text-lg font-semibold`}>
                      {(18.5 * ((userProfile.height/100) * (userProfile.height/100))).toFixed(1)} - {(24.9 * ((userProfile.height/100) * (userProfile.height/100))).toFixed(1)} kg
                    </p>
                  </div>
                </div>
              ) : (
                <div className={`${cardBg} p-4 rounded-lg text-center`}>
                  <p className={secondaryTextColor}>Enter your height and weight in the profile section to see body composition metrics.</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Update Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <SectionWrapper header="USER" title={["PROFILE"]} isDarkMode={isDarkMode}>
      <div className="max-w-4xl mx-auto w-full">
        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`py-3 px-6 font-medium relative ${activeTab === 'profile' ? textColor : secondaryTextColor} transition-colors duration-300`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
            {activeTab === 'profile' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform transition-all duration-300"></span>
            )}
          </button>
          <button
            className={`py-3 px-6 font-medium relative ${activeTab === 'achievements' ? textColor : secondaryTextColor} transition-colors duration-300`}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
            {activeTab === 'achievements' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform transition-all duration-300"></span>
            )}
          </button>
          <button
            className={`py-3 px-6 font-medium relative ${activeTab === 'analytics' ? textColor : secondaryTextColor} transition-colors duration-300`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
            {activeTab === 'analytics' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform transition-all duration-300"></span>
            )}
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === 'profile' && renderProfileContent()}
          {activeTab === 'achievements' && renderAchievementsContent()}
          {activeTab === 'analytics' && renderAnalyticsContent()}
        </div>
      </div>
    </SectionWrapper>
  );
} 