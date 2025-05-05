import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { getRandomTip, FITNESS_FACTS } from '../utils/workoutTips';
import { useWorkout } from '../context/WorkoutContext';

function WorkoutHistoryStats({ history, isDarkMode }) {
  const [mostFrequentMuscles, setMostFrequentMuscles] = useState([]);
  const [mostFrequentGoal, setMostFrequentGoal] = useState('');
  const [totalTime, setTotalTime] = useState(0);
  const [totalSets, setTotalSets] = useState(0);
  
  useEffect(() => {
    // Calculate stats from history
    if (history.length > 0) {
      // Find most frequent muscles
      const muscleCount = {};
      let setsTotal = 0;
      
      history.forEach(workout => {
        // Handle both old and new workout structures
        const muscleList = Array.isArray(workout.muscles) ? workout.muscles : [];
        
        // Also extract muscles from exercises
        if (workout.exercises && Array.isArray(workout.exercises)) {
          workout.exercises.forEach(exercise => {
            if (exercise.muscles && Array.isArray(exercise.muscles)) {
              exercise.muscles.forEach(muscle => {
                muscleCount[muscle] = (muscleCount[muscle] || 0) + 1;
              });
            }
            
            // Count sets for each exercise
            if (exercise.sets && Array.isArray(exercise.sets)) {
              setsTotal += exercise.sets.length;
            }
          });
        }
        
        // Add muscles from the workout.muscles array if it exists
        muscleList.forEach(muscle => {
          muscleCount[muscle] = (muscleCount[muscle] || 0) + 1;
        });
      });
      
      setTotalSets(setsTotal);
      
      // Sort muscles by frequency
      const sortedMuscles = Object.entries(muscleCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([muscle]) => muscle);
        
      setMostFrequentMuscles(sortedMuscles);
      
      // Find most frequent goal
      const goalCount = {};
      history.forEach(workout => {
        if (workout.goal) {
        goalCount[workout.goal] = (goalCount[workout.goal] || 0) + 1;
        }
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
    <div className={`rounded-xl ${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white shadow-lg border border-gray-100'} p-6 mb-8`}>
      <h2 className="text-2xl font-bold mb-6">Your Workout Summary</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`${isDarkMode ? 'bg-gray-700/70 border border-gray-600' : 'bg-gray-50 border border-gray-200'} p-4 rounded-xl text-center transition-transform duration-300 hover:scale-105`}>
          <div className="flex justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Total Workouts</h3>
          <p className="text-2xl font-bold">{history.length}</p>
        </div>
        
        <div className={`${isDarkMode ? 'bg-gray-700/70 border border-gray-600' : 'bg-gray-50 border border-gray-200'} p-4 rounded-xl text-center transition-transform duration-300 hover:scale-105`}>
          <div className="flex justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Time Spent</h3>
          <p className="text-2xl font-bold">{totalTime} mins</p>
        </div>
        
        <div className={`${isDarkMode ? 'bg-gray-700/70 border border-gray-600' : 'bg-gray-50 border border-gray-200'} p-4 rounded-xl text-center transition-transform duration-300 hover:scale-105`}>
          <div className="flex justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Total Sets</h3>
          <p className="text-2xl font-bold">{totalSets}</p>
        </div>
        
        <div className={`${isDarkMode ? 'bg-gray-700/70 border border-gray-600' : 'bg-gray-50 border border-gray-200'} p-4 rounded-xl text-center transition-transform duration-300 hover:scale-105`}>
          <div className="flex justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Favorite Goal</h3>
          <p className="text-lg font-bold capitalize">
            {mostFrequentGoal ? mostFrequentGoal.replaceAll('_', ' ') : 'None'}
          </p>
        </div>
        </div>
        
      <div className="mt-6">
        <h3 className="text-sm uppercase tracking-wider font-medium mb-3">Top Targeted Muscles</h3>
        <div className="flex flex-wrap gap-2">
            {mostFrequentMuscles.map((muscle, index) => (
              <span 
                key={index} 
              className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${
                isDarkMode 
                  ? 'bg-green-900/30 text-green-300 border border-green-800' 
                  : 'bg-green-100 text-green-700 border border-green-200'
              }`}
              >
                {muscle}
              </span>
            ))}
        </div>
      </div>
      
      <div className={`mt-6 p-4 rounded-xl ${
        isDarkMode 
          ? 'bg-blue-900/20 border border-blue-900' 
          : 'bg-blue-50 border border-blue-100'
      }`}>
        <div className="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'} mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          {getRandomTip(FITNESS_FACTS)}
        </p>
        </div>
      </div>
    </div>
  );
}

const WorkoutHistory = ({ isDarkMode }) => {
  const { workoutHistory, loading, removeWorkout } = useWorkout();
  const [activeWorkout, setActiveWorkout] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDeleteWorkout = async (id, e) => {
    e.stopPropagation(); // Prevent opening the workout details
    
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await removeWorkout(id);
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    }
  };

  if (loading) {
  return (
      <SectionWrapper isDarkMode={isDarkMode}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
          </div>
      </SectionWrapper>
    );
  }

  if (workoutHistory.length === 0) {
    return (
      <SectionWrapper isDarkMode={isDarkMode}>
        <div className="text-center py-16">
          <div className={`max-w-md mx-auto p-8 rounded-xl ${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white shadow-lg border border-gray-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
            <h2 className="text-2xl font-bold mb-4">No Workout History</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't completed any workouts yet. Get started with a new workout!</p>
                </div>
              </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper isDarkMode={isDarkMode}>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Workout Journey</h1>
        
        <WorkoutHistoryStats history={workoutHistory} isDarkMode={isDarkMode} />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Workout List */}
          <div className={`lg:w-2/5 rounded-xl ${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white shadow-lg border border-gray-100'}`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">Workout History</h2>
            </div>
            <div className="max-h-[600px] overflow-y-auto p-2">
              {workoutHistory.map((workout) => (
                <div 
                  key={workout._id}
                  className={`mb-2 p-4 cursor-pointer rounded-lg transition-all duration-200 ${
                    activeWorkout === workout._id 
                      ? isDarkMode
                          ? 'bg-blue-900/40 border border-blue-800' 
                          : 'bg-blue-50 border border-blue-200'
                      : isDarkMode
                          ? 'hover:bg-gray-700/80 border border-gray-700' 
                          : 'hover:bg-gray-50 border border-gray-200'
                  }`}
                  onClick={() => setActiveWorkout(workout._id === activeWorkout ? null : workout._id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-lg">{formatDate(workout.date)}</div>
                      <div className="flex gap-2 items-center mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          workout.completed 
                            ? isDarkMode
                                ? 'bg-green-900/50 text-green-300 border border-green-800' 
                                : 'bg-green-100 text-green-700 border border-green-200'
                            : isDarkMode
                                ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-800' 
                                : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        }`}>
                          {workout.completed ? 'Completed' : 'In Progress'}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {workout.type || 'Custom'} Workout
                        </span>
                      </div>
                      <div className="text-sm mt-2">
                        <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Goal: </span>
                        <span className="capitalize">{workout.goal ? workout.goal.replace(/_/g, ' ') : 'General Fitness'}</span>
                      </div>
                      {workout.exercises && (
                        <div className="text-sm mt-1">
                          <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Exercises: </span>
                          <span>{workout.exercises.length}</span>
                        </div>
                      )}
                    </div>
                    <div>
                <button
                        onClick={(e) => handleDeleteWorkout(workout._id, e)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode 
                            ? 'text-gray-400 hover:bg-red-900/30 hover:text-red-300' 
                            : 'text-gray-500 hover:bg-red-100 hover:text-red-500'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                </button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
            
          {/* Workout Detail View */}
          <div className={`lg:w-3/5 rounded-xl ${
            isDarkMode 
              ? 'bg-gray-800/80 border border-gray-700' 
              : 'bg-white shadow-lg border border-gray-100'
          }`}>
            {activeWorkout ? (
              <div className="p-6">
                {workoutHistory
                  .filter(workout => workout._id === activeWorkout)
                  .map(workout => (
                    <div key={workout._id}>
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-1">
                          Workout on {formatDate(workout.date)}
                        </h2>
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 text-sm rounded-full ${
                            workout.completed 
                              ? isDarkMode
                                  ? 'bg-green-900/50 text-green-300 border border-green-800' 
                                  : 'bg-green-100 text-green-700 border border-green-200'
                              : isDarkMode
                                  ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-800' 
                                  : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                          }`}>
                            {workout.completed ? 'Completed' : 'In Progress'}
                          </span>
                          <span className="text-sm capitalize text-gray-500 dark:text-gray-400">
                            {workout.type || 'Custom'} • {workout.goal ? workout.goal.replace(/_/g, ' ') : 'General Fitness'}
                          </span>
              </div>
                    </div>
                      
                      {workout.exercises && workout.exercises.length > 0 ? (
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Exercises</h3>
                          <div className="space-y-4">
                            {workout.exercises.map((exercise, index) => (
                              <div 
                                key={index} 
                                className={`p-4 rounded-lg ${
                                  isDarkMode 
                                    ? 'bg-gray-700/50 border border-gray-600' 
                                    : 'bg-gray-50 border border-gray-200'
                                }`}
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h4 className="font-medium text-lg">{exercise.name}</h4>
                                    {exercise.muscles && exercise.muscles.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {exercise.muscles.map((muscle, idx) => (
                                          <span 
                                            key={idx} 
                                            className={`px-2 py-0.5 text-xs rounded-full capitalize ${
                                              isDarkMode 
                                                ? 'bg-blue-900/30 text-blue-300 border border-blue-800' 
                                                : 'bg-blue-50 text-blue-700 border border-blue-100'
                                            }`}
                                          >
                                            {muscle}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                </div>
                                  {exercise.type && (
                                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                                      isDarkMode 
                                        ? 'bg-purple-900/30 text-purple-300 border border-purple-800' 
                                        : 'bg-purple-50 text-purple-700 border border-purple-100'
                                    }`}>
                                      {exercise.type}
                                    </span>
                                  )}
                            </div>
                            
                                {exercise.sets && exercise.sets.length > 0 && (
                                  <div>
                                    <h5 className="text-sm font-medium mb-2">Sets</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                      {exercise.sets.map((set, setIdx) => (
                                        <div 
                                          key={setIdx} 
                                          className={`p-2 rounded flex justify-between items-center ${
                                            set.completed
                                              ? isDarkMode
                                                  ? 'bg-green-900/20 border border-green-800' 
                                                  : 'bg-green-50 border border-green-200'
                                              : isDarkMode
                                                  ? 'bg-gray-800 border border-gray-700' 
                                                  : 'bg-white border border-gray-200'
                                          }`}
                                        >
                                          <div className="flex gap-3">
                                            <div>
                                              <span className="text-xs text-gray-500 dark:text-gray-400 block">Reps</span>
                                              <span className="font-medium">{set.reps}</span>
                                  </div>
                                            {set.weight !== undefined && (
                                              <div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 block">Weight</span>
                                                <span className="font-medium">{set.weight} {set.unit || 'lbs'}</span>
                                  </div>
                                )}
                              </div>
                                          {set.completed !== undefined && (
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                              set.completed
                                                ? isDarkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
                                                : isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-white'
                                            }`}>
                                              {set.completed && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                              )}
                                      </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className={`p-6 rounded-lg ${
                          isDarkMode 
                            ? 'bg-gray-700/50 border border-gray-600' 
                            : 'bg-gray-50 border border-gray-200'
                        }`}>
                          <p className="text-center text-gray-500 dark:text-gray-400">
                            No detailed exercise information available for this workout.
                          </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
            ) : (
              <div className="p-6 flex flex-col items-center justify-center h-full text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <h3 className="text-xl font-medium mb-2">Select a Workout</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Choose a workout from the list to view its details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default WorkoutHistory; 