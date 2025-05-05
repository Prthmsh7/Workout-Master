import { createContext, useState, useEffect, useContext } from 'react';
import { createWorkout, getWorkouts, completeWorkout, deleteWorkout } from '../utils/api';
import { useUser } from '@clerk/clerk-react';
import { generateWorkout } from '../utils/functions';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Workout creation settings
  const [poison, setPoison] = useState('individual');
  const [muscles, setMuscles] = useState([]);
  const [goal, setGoal] = useState('strength_power');

  // Fetch workout history when authenticated
  useEffect(() => {
    if (isSignedIn && isLoaded) {
      loadWorkoutHistory();
    } else if (isLoaded && !isSignedIn) {
      // Clear workout history when signed out
      setWorkoutHistory([]);
    }
  }, [isSignedIn, isLoaded]);

  // Load workout history from API
  const loadWorkoutHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getWorkouts();
      if (response.success) {
        setWorkoutHistory(response.data);
      } else {
        setError(response.message || 'Failed to load workout history');
      }
    } catch (error) {
      setError(error.message || 'Failed to load workout history');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Generate a new workout (locally)
  const generateNewWorkout = () => {
    try {
      setError(null);
      setLoading(true);
      
      console.log("Generating workout with:", { poison, muscles, goal });
      
      // Ensure muscles array exists and has values
      if (!muscles || !Array.isArray(muscles) || muscles.length === 0) {
          console.error("No muscles selected for workout generation");
          setError("Please select at least one muscle group");
          setLoading(false);
          return false;
      }
      
      // Map goal to the expected format if needed
      const mappedGoal = goal.includes('_') ? goal : 
                        (goal === 'strength' ? 'strength_power' : 
                        goal === 'hypertrophy' ? 'growth_hypertrophy' : 
                        goal === 'endurance' ? 'cardiovascular_endurance' : goal);
      
      // Generate the workout
      const newWorkout = generateWorkout({
          muscleGroups: muscles,
          workoutType: poison,
          goal: mappedGoal
      });
      
      console.log("Generated workout:", newWorkout);
      
      if (!newWorkout) {
          setError("Failed to generate workout. Please try again.");
          setLoading(false);
          return false;
      }
      
      if (!newWorkout.exercises || newWorkout.exercises.length === 0) {
          console.error("No exercises found in generated workout");
          setError("No exercises found matching the selected muscle groups. Please try different selections.");
          setLoading(false);
          return false;
      }
      
      // Set the new workout in state
      setCurrentWorkout(newWorkout);
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Error generating workout:", error);
      setError(error.message || "Failed to generate workout");
      setLoading(false);
      return false;
    }
  };

  // Save workout to database
  const saveWorkout = async () => {
    if (!currentWorkout) {
      setError('No workout to save');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      const workoutData = {
        name: currentWorkout.name || `${goal} ${poison} Workout`,
        type: currentWorkout.type || poison,
        goal: currentWorkout.goal || goal,
        exercises: currentWorkout.exercises || [],
        completed: false,
        date: currentWorkout.date || new Date().toISOString()
      };
      
      console.log("Saving workout:", workoutData);
      const response = await createWorkout(workoutData);
      
      if (response.success) {
        // Update the workout history
        await loadWorkoutHistory();
        
        // Add the workout ID to the current workout
        setCurrentWorkout((prev) => ({
          ...prev,
          _id: response.data._id
        }));
        return response.data;
      } else {
        setError(response.message || 'Failed to save workout');
        return null;
      }
    } catch (error) {
      setError(error.message || 'Failed to save workout');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mark workout as completed
  const markWorkoutComplete = async (workoutId) => {
    if (!workoutId) {
      setError('No workout ID provided');
      return null;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await completeWorkout(workoutId);
      
      if (response.success) {
        // Update workout history
        await loadWorkoutHistory();
        setCurrentWorkout(null);
        return response;
      } else {
        setError(response.message || 'Failed to complete workout');
        return null;
      }
    } catch (error) {
      setError(error.message || 'Failed to complete workout');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete a workout
  const removeWorkout = async (workoutId) => {
    if (!workoutId) {
      setError('No workout ID provided');
      return null;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await deleteWorkout(workoutId);
      
      if (response.success) {
        setWorkoutHistory(workoutHistory.filter(workout => workout._id !== workoutId));
        return response;
      } else {
        setError(response.message || 'Failed to delete workout');
        return null;
      }
    } catch (error) {
      setError(error.message || 'Failed to delete workout');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Clear the current error message
  const clearError = () => setError(null);
  
  // Reset workout state (useful for starting fresh)
  const resetWorkout = () => {
    setCurrentWorkout(null);
    setError(null);
  };

  return (
    <WorkoutContext.Provider
      value={{
        currentWorkout,
        setCurrentWorkout,
        workoutHistory,
        loading,
        error,
        setError,
        poison,
        setPoison,
        muscles,
        setMuscles,
        goal,
        setGoal,
        generateNewWorkout,
        saveWorkout,
        markWorkoutComplete,
        removeWorkout,
        clearError,
        resetWorkout
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

// Custom hook to use the workout context
export const useWorkout = () => useContext(WorkoutContext);