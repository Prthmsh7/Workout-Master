import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionWrapper from './SectionWrapper';
import { useWorkout } from '../context/WorkoutContext';

// Timer component for workout rest periods
const Timer = ({ seconds, onComplete, isDarkMode }) => {
  const [timeLeft, setTimeLeft] = useState(seconds || 60);
  const [isActive, setIsActive] = useState(true);
  
  useEffect(() => {
    // Update timeLeft if seconds prop changes
    setTimeLeft(seconds || 60);
  }, [seconds]);
  
  useEffect(() => {
    if (!isActive) return;
    
    if (timeLeft === 0) {
      onComplete();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, isActive, onComplete]);
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setTimeLeft(seconds || 60);
    setIsActive(true);
  };
  
  // Format time as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const progressPercent = (timeLeft / (seconds || 60)) * 100;
  
  // Determine color based on time left percentage
  const getProgressColor = () => {
    if (progressPercent > 60) return 'bg-green-600 dark:bg-green-500';
    if (progressPercent > 30) return 'bg-yellow-500 dark:bg-yellow-500';
    return 'bg-red-500 dark:bg-red-500';
  };
  
  return (
    <div className={`mt-4 p-4 rounded-xl ${isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
      <div className="text-center mb-3">
        <h3 className={`text-xl font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Rest Time</h3>
        <p className={`text-3xl font-bold ${getProgressColor().includes('red') ? 'text-red-500' : isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {formatTime(timeLeft)}
        </p>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
        <div 
          className={`${getProgressColor()} h-3 rounded-full transition-all duration-1000`}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      
      <div className="flex justify-center space-x-3">
        <button 
          onClick={toggleTimer} 
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
            ${isActive 
              ? (isDarkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200') 
              : (isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-600 text-white hover:bg-blue-500')
            }`}
        >
          {isActive ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Resume
            </>
          )}
        </button>
        <button 
          onClick={resetTimer} 
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
            ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
      </div>
    </div>
  );
};

const Workout = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const { 
    currentWorkout, 
    setCurrentWorkout,
    saveWorkout, 
    markWorkoutComplete, 
    error, 
    setError 
  } = useWorkout();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [workoutId, setWorkoutId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [sets, setSets] = useState([]);

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  // Update sets state when current exercise changes
  useEffect(() => {
    if (currentWorkout && currentWorkout.exercises && currentWorkout.exercises[currentExerciseIndex]) {
      const exerciseSets = currentWorkout.exercises[currentExerciseIndex].sets || [];
      setSets(exerciseSets);
    }
  }, [currentWorkout, currentExerciseIndex]);

  // Check if workout has been saved and get the ID
  useEffect(() => {
    const saveCurrentWorkout = async () => {
      if (currentWorkout && !currentWorkout._id && !workoutId && !isSaving) {
        try {
          setIsSaving(true);
          const savedWorkout = await saveWorkout();
          if (savedWorkout && savedWorkout._id) {
            setWorkoutId(savedWorkout._id);
          }
        } catch (err) {
          setLocalError('Failed to save workout. Your progress may not be saved.');
        } finally {
          setIsSaving(false);
        }
      }
    };

    saveCurrentWorkout();
  }, [currentWorkout, workoutId, saveWorkout, isSaving]);

  if (!currentWorkout || !currentWorkout.exercises || currentWorkout.exercises.length === 0) {
    return (
      <SectionWrapper isDarkMode={isDarkMode}>
        <div className="text-center py-16">
          <div className={`max-w-md mx-auto p-8 rounded-xl ${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white shadow-lg border border-gray-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <h2 className="text-2xl font-bold mb-4">No Active Workout</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Time to build those muscles! Create a new workout to get started.</p>
            <button
              onClick={() => navigate('/generate')}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-all duration-200 font-medium shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Create Workout
            </button>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  // Access the exercises array from the workout object
  const exercises = currentWorkout.exercises || [];
  const currentExercise = exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === exercises.length - 1;

  // Safety check - if no current exercise exists, show an error
  if (!currentExercise) {
    return (
      <SectionWrapper isDarkMode={isDarkMode}>
        <div className="text-center py-16">
          <div className={`max-w-md mx-auto p-8 rounded-xl ${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white shadow-lg border border-gray-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-2xl font-bold mb-4">Exercise Not Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">There was a problem loading this exercise. Let's start fresh!</p>
            <button
              onClick={() => navigate('/generate')}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-all duration-200 font-medium shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Create New Workout
            </button>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setShowTimer(true);
    }
  };

  const handlePrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setShowTimer(false);
    }
  };

  const handleTimerComplete = () => {
    setShowTimer(false);
  };

  const handleSetCompleted = (setIndex, isCompleted) => {
    const updatedSets = [...sets];
    updatedSets[setIndex] = {
      ...updatedSets[setIndex],
      completed: isCompleted
    };
    setSets(updatedSets);
    
    // Update the current workout exercise sets
    if (currentWorkout && currentWorkout.exercises) {
      const updatedWorkout = {
        ...currentWorkout,
        exercises: currentWorkout.exercises.map((exercise, idx) => {
          if (idx === currentExerciseIndex) {
            return {
              ...exercise,
              sets: updatedSets
            };
          }
          return exercise;
        })
      };
      // Update workout context
      setCurrentWorkout(updatedWorkout);
    }
  };

  const handleCompleteWorkout = async () => {
    if (isCompleting) return;
    
    try {
      setIsCompleting(true);
      setLocalError(null);
      
      let id = workoutId || (currentWorkout._id ? currentWorkout._id : null);
      
      if (!id) {
        // Try to save the workout first
        const savedWorkout = await saveWorkout();
        if (savedWorkout) {
          id = savedWorkout._id;
        } else {
          throw new Error('Failed to save workout');
        }
      }
      
      await markWorkoutComplete(id);
      
      // Navigate to history page after completion
      navigate('/history');
    } catch (err) {
      setLocalError('Failed to complete workout: ' + (err.message || 'Unknown error'));
    } finally {
      setIsCompleting(false);
    }
  };

  // Get rest time from exercise, default to 60 seconds
  const restTime = currentExercise.rest || 60;

    return (
    <SectionWrapper isDarkMode={isDarkMode}>
      {localError && (
        <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl dark:bg-red-900/30 dark:border-red-800 dark:text-red-300 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{localError}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row mb-6 items-start gap-6">
        {/* Exercise Progress Indicator */}
        <div className={`w-full md:w-1/3 p-5 rounded-xl ${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white shadow-lg border border-gray-100'}`}>
          <h2 className="text-xl font-bold mb-4">Workout Progress</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Exercise</span>
            <span className="text-sm font-medium">{currentExerciseIndex + 1} of {exercises.length}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
            ></div>
            </div>
            
          <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
            {exercises.map((exercise, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg flex items-center gap-2 transition-all duration-200
                  ${index === currentExerciseIndex 
                    ? (isDarkMode ? 'bg-blue-900/40 border border-blue-700' : 'bg-blue-50 border border-blue-200')
                    : index < currentExerciseIndex
                      ? (isDarkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200')
                      : (isDarkMode ? 'bg-gray-700/50 border border-gray-700' : 'bg-gray-100 border border-gray-200')
                  }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                  ${index === currentExerciseIndex 
                    ? 'bg-blue-600 text-white'
                    : index < currentExerciseIndex
                      ? 'bg-green-600 text-white'
                      : (isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-600')
                  }`}
                >
                  {index + 1}
                </div>
                <span className="font-medium truncate">{exercise.name}</span>
              </div>
                ))}
            </div>
        </div>

        {/* Current Exercise */}
        <div className={`w-full md:w-2/3 p-5 rounded-xl ${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white shadow-lg border border-gray-100'}`}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-1">{currentExercise.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{currentExercise.description || 'Perform this exercise with proper form'}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">Target Muscles</span>
                <span className="font-medium capitalize">{Array.isArray(currentExercise.muscles) ? currentExercise.muscles.join(', ') : currentExercise.muscles || 'Multiple'}</span>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">Equipment</span>
                <span className="font-medium capitalize">{currentExercise.equipment || currentExercise.type || 'None'}</span>
              </div>
            </div>
          </div>
          
          {/* Sets */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Sets</h3>
            <div className="space-y-3">
              {sets.map((set, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg flex justify-between items-center transition-all duration-200
                    ${set.completed
                      ? (isDarkMode ? 'bg-green-900/30 border border-green-800' : 'bg-green-50 border border-green-200')
                      : (isDarkMode ? 'bg-gray-700/50 border border-gray-700' : 'bg-gray-100 border border-gray-200')
                    }`}
                >
                  <div>
                    <span className="font-medium text-sm">Set {index + 1}</span>
                    <div className="flex gap-4 mt-1">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">Reps</span>
                        <span className="font-medium">{set.reps}</span>
                      </div>
                      {set.weight && (
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">Weight</span>
                          <span className="font-medium">{set.weight} {set.unit || 'lbs'}</span>
                        </div>
                      )}
                      {set.duration && (
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">Duration</span>
                          <span className="font-medium">{set.duration}s</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleSetCompleted(index, !set.completed)}
                      className={`p-2 rounded-lg transition-all duration-200
                        ${set.completed
                          ? (isDarkMode ? 'bg-green-800 text-green-200 hover:bg-green-700' : 'bg-green-500 text-white hover:bg-green-600')
                          : (isDarkMode ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-600 hover:bg-gray-300')
                        }`}
                    >
                      {set.completed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Timer - Show only when timer is active */}
          {showTimer && (
            <Timer seconds={restTime} onComplete={handleTimerComplete} isDarkMode={isDarkMode} />
          )}
        </div>
      </div>

      {/* Navigation and Complete Buttons */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-3">
          <button
            onClick={handlePrevExercise}
            disabled={currentExerciseIndex === 0}
            className={`px-5 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-200
              ${currentExerciseIndex === 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500' 
                : isDarkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          {!isLastExercise && (
            <button
              onClick={handleNextExercise}
              className={`px-5 py-3 rounded-xl bg-blue-600 text-white font-medium flex items-center gap-2 hover:bg-blue-500 transition-all duration-200 shadow-md shadow-blue-600/20`}
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
        
        <button
          onClick={handleCompleteWorkout}
          disabled={isCompleting}
          className={`px-6 py-3 rounded-xl text-white font-medium flex items-center gap-2 transition-all duration-200 shadow-lg
            ${isCompleting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-500 shadow-green-600/20'
            }`}
        >
          {isCompleting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Completing...
            </>
          ) : (
            <>
              Complete Workout
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </>
          )}
        </button>
            </div>
        </SectionWrapper>
  );
};

export default Workout;
