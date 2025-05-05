import { EXERCISES, SCHEMES, TEMPOS, WORKOUTS } from "./swoldier"

// Helper function to flatten the exercise object
const exercisesFlattener = (exercisesObj) => {
    // Create a fallback set of exercises in case the import fails
    const fallbackExercises = {
        bench_press: {
            type: 'compound',
            meta: { environment: 'gym' },
            muscles: ['chest'],
            unit: 'reps',
            description: 'Bench press exercise'
        },
        bicep_curl: {
            type: 'accessory',
            meta: { environment: 'gymhome' },
            muscles: ['biceps'],
            unit: 'reps',
            description: 'Bicep curl exercise'
        },
        squat: {
            type: 'compound',
            meta: { environment: 'gym' },
            muscles: ['quads', 'glutes'],
            unit: 'reps',
            description: 'Squat exercise'
        },
        shoulder_press: {
            type: 'compound',
            meta: { environment: 'gym' },
            muscles: ['shoulders'],
            unit: 'reps',
            description: 'Shoulder press exercise'
        },
        pullup: {
            type: 'compound',
            meta: { environment: 'gymhome' },
            muscles: ['back', 'biceps'],
            unit: 'reps',
            description: 'Pull-up exercise'
        },
        tricep_extension: {
            type: 'accessory',
            meta: { environment: 'gymhome' },
            muscles: ['triceps'],
            unit: 'reps',
            description: 'Tricep extension exercise'
        }
    };

    // If no exercises are provided, use the imported EXERCISES
    if (!exercisesObj) {
        exercisesObj = EXERCISES;
    }

    // Check if we have valid exercises
    if (!exercisesObj || typeof exercisesObj !== 'object' || Object.keys(exercisesObj).length === 0) {
        console.log("Using fallback exercises - no valid exercises found in import");
        return fallbackExercises;
    }

    // Since the EXERCISES structure is now flat, we can simply return it
    return exercisesObj;
};

// Shuffle an array randomly
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Helper function to map UI muscle names to exercise muscle names
const mapMuscleNames = (muscleId) => {
    // Mapping for split types
    if (muscleId === 'push') return ['chest', 'shoulders', 'triceps'];
    if (muscleId === 'pull') return ['back', 'biceps', 'forearms'];
    if (muscleId === 'legs') return ['quads', 'hamstrings', 'glutes', 'calves'];
    if (muscleId === 'upper') return ['chest', 'back', 'shoulders', 'biceps', 'triceps'];
    if (muscleId === 'lower') return ['quads', 'hamstrings', 'glutes', 'calves'];
    if (muscleId === 'arms') return ['biceps', 'triceps', 'forearms'];
    if (muscleId === 'abs') return ['abs', 'core'];
    if (muscleId === 'back') return ['back', 'lats', 'traps'];
    if (muscleId === 'shoulders') return ['shoulders', 'delts'];
    if (muscleId === 'chest') return ['chest'];
    
    // Default return the original id
    return [muscleId];
};

export const generateWorkout = ({ muscleGroups, workoutType, goal }) => {
    console.log("generateWorkout called with:", { muscleGroups, workoutType, goal });
    
    // Validate input parameters
    if (!muscleGroups || muscleGroups.length === 0) {
        throw new Error("No muscle groups provided");
    }
    
    if (!workoutType) {
        throw new Error("No workout type provided");
    }
    
    if (!goal) {
        throw new Error("No workout goal provided");
    }
    
    // Get all exercises
    const allExercises = exercisesFlattener();
    console.log(`Total available exercises: ${Object.keys(allExercises).length}`);
    
    // Map selected muscles to exercise muscles
    const mappedMuscles = muscleGroups.flatMap(muscle => mapMuscleNames(muscle));
    console.log("Mapped muscles:", mappedMuscles);
    
    // Filter exercises by selected muscles
    let matchingExercises = [];
    
    Object.entries(allExercises).forEach(([exerciseName, exerciseData]) => {
        // Check if exercise has muscle data
        if (!exerciseData.muscles || exerciseData.muscles.length === 0) {
            console.log(`Skipping exercise ${exerciseName} - no muscle data`);
            return;
        }
        
        // Check if exercise targets any of the selected muscles
        const matchesMuscle = exerciseData.muscles.some(muscle => 
            mappedMuscles.includes(muscle.toLowerCase()));
        
        if (matchesMuscle) {
            matchingExercises.push({
                name: exerciseName,
                ...exerciseData
            });
        }
    });
    
    console.log(`Found ${matchingExercises.length} exercises matching the selected muscles`);
    
    // If no matching exercises, use fallback exercises
    if (matchingExercises.length === 0) {
        console.error("No exercises found matching the selected muscles:", mappedMuscles);
        // Rather than throwing an error, let's create a generic workout with fallback exercises
        matchingExercises = Object.entries(fallbackExercises).map(([name, data]) => ({
            name: name,
            ...data
        }));
        console.log(`Using ${matchingExercises.length} fallback exercises instead`);
    }
    
    // Shuffle the matching exercises for variety
    matchingExercises = shuffleArray(matchingExercises);
    
    // Determine workout structure based on type and goal
    let numExercises, numSets, repRange;
    
    // Map the goal string to the appropriate format if needed
    const mappedGoal = goal.includes('_') ? goal : 
                      (goal === 'strength' ? 'strength_power' : 
                       goal === 'hypertrophy' ? 'growth_hypertrophy' : 
                       goal === 'endurance' ? 'cardiovascular_endurance' : goal);
    
    // Sets and reps based on goal
    switch (mappedGoal.toLowerCase()) {
        case 'strength_power':
            numSets = 5;
            repRange = { min: 3, max: 6 };
            break;
        case 'growth_hypertrophy':
            numSets = 4;
            repRange = { min: 8, max: 12 };
            break;
        case 'cardiovascular_endurance':
            numSets = 3;
            repRange = { min: 12, max: 20 };
            break;
        default:
            numSets = 3;
            repRange = { min: 8, max: 12 };
    }
    
    // Number of exercises based on workout type
    switch (workoutType.toLowerCase()) {
        case 'full_body':
            numExercises = 6;
            break;
        case 'upper_lower':
            numExercises = 5;
            break;
        case 'push_pull_legs':
            numExercises = 4;
            break;
        case 'bodybuilder_split':
            numExercises = 4;
            break;
        case 'bro_split':
            numExercises = 5;
            break;
        case 'individual':
            numExercises = Math.min(mappedMuscles.length + 2, 8);
            break;
        default:
            numExercises = 5;
    }
    
    // Limit the exercises to the selected number
    let selectedExercises = matchingExercises.slice(0, numExercises);
    
    // If not enough exercises, use what we have
    if (selectedExercises.length < numExercises) {
        console.warn(`Only ${selectedExercises.length} exercises found, using all available`);
    }
    
    // Create the workout structure
    const workoutName = `${mappedGoal} ${workoutType} Workout`;
    
    // Create workout sets for each exercise
    const exercises = selectedExercises.map(exercise => {
        const sets = Array(numSets).fill().map(() => ({
            reps: Math.floor(Math.random() * (repRange.max - repRange.min + 1)) + repRange.min,
            weight: 0,
            completed: false
        }));
        
        return {
            name: exercise.name,
            type: exercise.type || 'weighted',
            description: exercise.description || '',
            muscles: exercise.muscles || [],
            sets: sets,
            rest: Math.floor(Math.random() * 30) + 60 // Random rest time between 60-90 seconds
        };
    });
    
    console.log(`Generated workout with ${exercises.length} exercises`);
    
    return {
        name: workoutName,
        type: workoutType,
        goal: mappedGoal,
        exercises: exercises,
        date: new Date().toISOString(),
        completed: false,
        muscles: mappedMuscles
    };
};

// Export helper functions for testability
export { exercisesFlattener, shuffleArray };