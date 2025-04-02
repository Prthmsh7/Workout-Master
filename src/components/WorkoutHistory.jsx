import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { getRandomTip, FITNESS_FACTS } from '../utils/workoutTips';

function WorkoutHistoryStats({ history, isDarkMode }) {
  const [mostFrequentMuscles, setMostFrequentMuscles] = useState([]);
  const [mostFrequentGoal, setMostFrequentGoal] = useState('');
  const [totalTime, setTotalTime] = useState(0);
  
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const cardBorderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const secondaryTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const statBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
  
  useEffect(() => {
    // Calculate stats from history
    if (history.length > 0) {
      // Find most frequent muscles
      const muscleCount = {};
      history.forEach(workout => {
        workout.muscles.forEach(muscle => {
          muscleCount[muscle] = (muscleCount[muscle] || 0) + 1;
        });
      });
      
      // Sort muscles by frequency
      const sortedMuscles = Object.entries(muscleCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([muscle]) => muscle);
        
      setMostFrequentMuscles(sortedMuscles);
      
      // Find most frequent goal
      const goalCount = {};
      history.forEach(workout => {
        goalCount[workout.goal] = (goalCount[workout.goal] || 0) + 1;
      });
      
      const sortedGoals = Object.entries(goalCount).sort((a, b) => b[1] - a[1]);
      if (sortedGoals.length > 0) {
        setMostFrequentGoal(sortedGoals[0][0]);
      }
      
      // Estimate total workout time (assuming 45 mins per workout)
      setTotalTime(history.length * 45);
    }
  }, [history]);
  
  if (history.length === 0) return null;
  
  return (
    <div className={`${cardBg} rounded-lg p-6 border ${cardBorderColor} mb-8`}>
      <h2 className={`text-xl font-semibold mb-4 ${textColor}`}>Your Workout Summary</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`${statBg} p-4 rounded-lg text-center`}>
          <h3 className={`text-sm ${secondaryTextColor} mb-1`}>Total Workouts</h3>
          <p className={`text-2xl font-bold ${textColor}`}>{history.length}</p>
        </div>
        
        <div className={`${statBg} p-4 rounded-lg text-center`}>
          <h3 className={`text-sm ${secondaryTextColor} mb-1`}>Time Spent</h3>
          <p className={`text-2xl font-bold ${textColor}`}>{totalTime} mins</p>
        </div>
        
        <div className={`${statBg} p-4 rounded-lg text-center`}>
          <h3 className={`text-sm ${secondaryTextColor} mb-1`}>Favorite Goal</h3>
          <p className={`text-lg font-bold capitalize ${textColor}`}>
            {mostFrequentGoal.replaceAll('_', ' ')}
          </p>
        </div>
        
        <div className={`${statBg} p-4 rounded-lg`}>
          <h3 className={`text-sm ${secondaryTextColor} mb-1 text-center`}>Top Muscles</h3>
          <div className="flex flex-wrap justify-center gap-1 mt-1">
            {mostFrequentMuscles.map((muscle, index) => (
              <span 
                key={index} 
                className={`${isDarkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-100'} px-2 py-1 rounded text-xs capitalize text-green-600`}
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} mt-4 p-3 rounded-lg text-sm italic border ${isDarkMode ? 'border-gray-600' : 'border-green-100'}`}>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          {getRandomTip(FITNESS_FACTS)}
        </p>
      </div>
    </div>
  );
}

export default function WorkoutHistory({ history, isDarkMode }) {
  const [expandedWorkout, setExpandedWorkout] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHistory, setFilteredHistory] = useState(history);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    let filtered = [...history];
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(workout => 
        workout.muscles.some(muscle => 
          muscle.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        workout.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.goal.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply filter
    if (filter !== 'all') {
      filtered = filtered.filter(workout => workout.goal === filter);
    }
    
    setFilteredHistory(filtered);
  }, [history, searchTerm, filter]);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Group workouts by month
  const groupedWorkouts = filteredHistory.reduce((acc, workout) => {
    const date = new Date(workout.date);
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    
    acc[monthYear].push(workout);
    return acc;
  }, {});

  // Theme colors
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const cardBorderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const headerBg = 'bg-green-600';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const secondaryTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const accentColor = 'text-green-600';
  const dividerColor = isDarkMode ? 'divide-gray-700' : 'divide-gray-200';
  const exerciseBg = isDarkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-100';
  const hoverBg = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
  const tagBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
  const iconBg = isDarkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-100';
  const inputBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
  const inputBorderColor = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const inputTextColor = isDarkMode ? 'text-gray-200' : 'text-gray-700';
  const buttonBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
  const activeButtonBg = 'bg-green-600';
  const buttonTextColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const activeButtonTextColor = 'text-white';
  const detailBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-50';

  return (
    <SectionWrapper header="WORKOUT" title={["HISTORY"]} isDarkMode={isDarkMode}>
      <div className="max-w-4xl mx-auto w-full">
        {history.length === 0 ? (
          <div className={`${cardBg} rounded-lg p-8 text-center border ${cardBorderColor}`}>
            <h2 className={`text-xl font-semibold mb-2 ${textColor}`}>No Workouts Yet</h2>
            <p className={secondaryTextColor}>
              Complete your first workout to start tracking your progress!
            </p>
          </div>
        ) : (
          <>
            <WorkoutHistoryStats history={history} isDarkMode={isDarkMode} />
            
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search workouts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full p-2 pl-10 rounded-lg ${inputBg} border ${inputBorderColor} ${inputTextColor} focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${secondaryTextColor} absolute left-3 top-2.5`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'all' ? activeButtonBg : buttonBg} ${filter === 'all' ? activeButtonTextColor : buttonTextColor}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('strength_power')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'strength_power' ? activeButtonBg : buttonBg} ${filter === 'strength_power' ? activeButtonTextColor : buttonTextColor}`}
                >
                  Strength
                </button>
                <button
                  onClick={() => setFilter('growth_hypertrophy')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'growth_hypertrophy' ? activeButtonBg : buttonBg} ${filter === 'growth_hypertrophy' ? activeButtonTextColor : buttonTextColor}`}
                >
                  Hypertrophy
                </button>
                <button
                  onClick={() => setFilter('cardiovascular_endurance')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'cardiovascular_endurance' ? activeButtonBg : buttonBg} ${filter === 'cardiovascular_endurance' ? activeButtonTextColor : buttonTextColor}`}
                >
                  Endurance
                </button>
              </div>
            </div>
            
            {filteredHistory.length === 0 ? (
              <div className={`${cardBg} rounded-lg p-6 text-center border ${cardBorderColor}`}>
                <p className={secondaryTextColor}>No workouts match your search criteria.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedWorkouts).map(([monthYear, workouts]) => (
                  <div key={monthYear} className={`${cardBg} rounded-lg overflow-hidden shadow-lg border ${cardBorderColor}`}>
                    <div className={`${headerBg} px-6 py-3`}>
                      <h2 className="text-xl font-semibold text-white">{monthYear}</h2>
                    </div>
                    <div className={`divide-y ${dividerColor}`}>
                      {workouts.map((workout, index) => (
                        <div key={index} className={`transition-all duration-300 overflow-hidden`}>
                          <div 
                            className={`p-4 ${hoverBg} transition-colors cursor-pointer`}
                            onClick={() => setExpandedWorkout(expandedWorkout === index ? null : index)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className={`h-10 w-10 rounded-full ${iconBg} flex items-center justify-center transform transition-transform duration-300 ${expandedWorkout === index ? 'rotate-180' : ''}`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${accentColor}`} viewBox="0 0 20 20" fill="currentColor">
                                    {expandedWorkout === index ? (
                                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                    ) : (
                                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    )}
                                  </svg>
                                </div>
                                <div>
                                  <h3 className={`font-medium capitalize ${textColor}`}>
                                    {workout.type.replaceAll('_', ' ')} Workout
                                    {workout.muscles && workout.muscles.length > 0 && (
                                      <span className={accentColor}> • {workout.muscles.join(', ')}</span>
                                    )}
                                  </h3>
                                  <p className={`text-sm ${secondaryTextColor}`}>
                                    {formatDate(workout.date)} • {workout.goal.replaceAll('_', ' ')}
                                  </p>
                                </div>
                              </div>
                              <div className={`${tagBg} rounded-full px-3 py-1 text-sm ${textColor} transition-transform duration-300 transform hover:scale-105`}>
                                {workout.exercises.length} exercises
                              </div>
                            </div>
                            
                            <div className={`${exerciseBg} p-3 rounded-lg mt-2`}>
                              <div className="text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {workout.exercises.slice(0, 4).map((exercise, i) => (
                                  <div key={i} className={`${secondaryTextColor} capitalize`}>
                                    • {exercise.name.replaceAll('_', ' ')}
                                  </div>
                                ))}
                                {workout.exercises.length > 4 && (
                                  <div className={`${accentColor} flex items-center gap-1`}>
                                    +{workout.exercises.length - 4} more exercises
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Expanded Details */}
                          {expandedWorkout === index && (
                            <div className={`${detailBg} p-4 border-t ${cardBorderColor} animate-in slide-in-from-bottom duration-300`}>
                              <h4 className={`font-medium ${textColor} mb-3`}>All Exercises</h4>
                              <div className="space-y-3">
                                {workout.exercises.map((exercise, i) => (
                                  <div key={i} className={`${cardBg} p-3 rounded-lg border ${cardBorderColor} transition-transform duration-300 transform hover:scale-[1.01] hover:shadow-md`}>
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h5 className={`font-medium capitalize ${textColor}`}>{exercise.name.replaceAll('_', ' ')}</h5>
                                        <p className={`text-xs ${secondaryTextColor} capitalize`}>{exercise.muscles.join(' & ')} • {exercise.type}</p>
                                      </div>
                                      <div className={`${iconBg} p-1.5 rounded-md`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${accentColor}`} viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-xs">
                                      {['reps', 'sets', 'rest', 'tempo'].map(info => (
                                        <div key={info} className={`${exerciseBg} p-2 rounded`}>
                                          <span className={`${secondaryTextColor} capitalize`}>{info}: </span>
                                          <span className={textColor}>{exercise[info] || 'N/A'}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </SectionWrapper>
  );
} 