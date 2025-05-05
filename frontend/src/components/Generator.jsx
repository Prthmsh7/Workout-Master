import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/swoldier'
import Button from './Button'
import { useWorkout } from '../context/WorkoutContext'
import { FaDumbbell, FaRunning, FaHeartbeat } from 'react-icons/fa'
import { BiTargetLock } from 'react-icons/bi'

// Muscle groups organized by category
const muscleGroups = {
    upper: [
        { id: 'biceps', label: 'Biceps' },
        { id: 'triceps', label: 'Triceps' },
        { id: 'chest', label: 'Chest' },
        { id: 'delts', label: 'Shoulders' },
        { id: 'lats', label: 'Back' },
        { id: 'core', label: 'Core' },
    ],
    lower: [
        { id: 'quads', label: 'Quads' },
        { id: 'hamstrings', label: 'Hamstrings' },
        { id: 'glutes', label: 'Glutes' },
        { id: 'calves', label: 'Calves' },
    ],
    other: [
        { id: 'forearms', label: 'Forearms' },
        { id: 'traps', label: 'Traps' },
        { id: 'neck', label: 'Neck' },
    ]
};

// Workout types
const workoutTypes = [
    { id: 'individual', name: 'Individual', icon: <FaDumbbell /> },
    { id: 'bro_split', name: 'Bro Split', icon: <FaDumbbell /> },
    { id: 'bodybuilder_split', name: 'Bodybuilder Split', icon: <FaDumbbell /> },
    { id: 'upper_lower', name: 'Upper/Lower', icon: <FaDumbbell /> },
    { id: 'push_pull_legs', name: 'Push/Pull/Legs', icon: <FaDumbbell /> }
];

// Workout goals
const workoutGoals = [
    { id: 'strength', name: 'Strength & Power', icon: <FaDumbbell />, description: 'Heavy weight, low reps for building maximal strength' },
    { id: 'hypertrophy', name: 'Growth & Hypertrophy', icon: <BiTargetLock />, description: 'Moderate weight, moderate reps for muscle growth' },
    { id: 'endurance', name: 'Endurance', icon: <FaHeartbeat />, description: 'Light to moderate weight, high reps for muscle endurance' }
];

function StepIndicator({ currentStep, totalSteps, isDarkMode }) {
    return (
        <div className="flex items-center justify-center space-x-4 mb-10">
            {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-medium text-sm transition-all duration-300 ${
                            i + 1 === currentStep
                                ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-600/30 dark:shadow-green-900/40 scale-110'
                                : i + 1 < currentStep
                                    ? 'bg-gradient-to-r from-green-400 to-green-300 text-green-800 dark:from-green-600 dark:to-green-700 dark:text-green-100'
                                    : isDarkMode 
                                        ? 'bg-gray-800 text-gray-400 border border-gray-700 shadow-inner shadow-black/20' 
                                        : 'bg-gray-100 text-gray-500 border border-gray-200 shadow-inner shadow-black/5'
                        }`}
                    >
                        {i + 1}
                    </div>
                    {i < totalSteps - 1 && (
                        <div 
                            className={`h-1.5 w-16 mt-5 rounded-full -ml-8 transition-all duration-500 ${
                                i + 1 < currentStep
                                    ? 'bg-gradient-to-r from-green-600 to-green-400'
                                    : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                            }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

const Generator = ({ isDarkMode }) => {
    const navigate = useNavigate();
    const { 
        setPoison, 
        setMuscles, 
        setGoal, 
        generateNewWorkout, 
        error, 
        setError,
        clearError 
    } = useWorkout();
    
    const [localError, setLocalError] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedWorkoutType, setSelectedWorkoutType] = useState(null);
    const [selectedMuscles, setSelectedMuscles] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeCategory, setActiveCategory] = useState('upper');

    // Clear local errors when changing steps
    useEffect(() => {
        setLocalError(null);
        clearError?.();
    }, [currentStep, clearError]);

    // Display errors from context
    useEffect(() => {
        if (error) {
            setLocalError(error);
        }
    }, [error]);

    const handleWorkoutTypeSelect = (type) => {
        setSelectedWorkoutType(type);
        
        // Reset muscles when changing workout type
        setSelectedMuscles([]);
        
        // If not individual workout, show appropriate options in step 2
        if (type !== 'individual') {
            // For push_pull_legs and bro_split, we'll handle this in the UI
            if (type === 'push_pull_legs') {
                setSelectedMuscles(['push']); // Default to push
            }
        }
    };

    const handleMuscleSelect = (muscle) => {
        if (selectedWorkoutType === 'individual') {
            // For individual, allow multiple muscle selection
            setSelectedMuscles((prev) => {
                if (prev.includes(muscle)) {
                    return prev.filter((m) => m !== muscle);
                } else {
                    return [...prev, muscle];
                }
            });
        } else {
            // For other workout types, only allow one selection
            setSelectedMuscles([muscle]);
        }
    };

    const handleGoalSelect = (goal) => {
        setSelectedGoal(goal);
    };

    const handleNextStep = () => {
        // Validate current step before proceeding
        if (currentStep === 1) {
            if (!selectedWorkoutType) {
                setLocalError('Please select a workout type');
                return;
            }
        } else if (currentStep === 2) {
            if (selectedMuscles.length === 0) {
                setLocalError('Please select at least one muscle group');
                return;
            }
        }

        setCurrentStep((prev) => Math.min(prev + 1, 3));
    };

    const handlePrevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleGenerateWorkout = async () => {
        // Validate selections
        if (!selectedWorkoutType) {
            setLocalError('Please select a workout type');
            return;
        }

        if (selectedMuscles.length === 0) {
            setLocalError('Please select at least one muscle group');
            return;
        }

        if (!selectedGoal) {
            setLocalError('Please select a workout goal');
            return;
        }

        try {
            // Prevent double clicks
            if (isGenerating) {
                return;
            }
            
            setIsGenerating(true);
            setLocalError(null);
            clearError?.();
            
            console.log('Setting context values:', {
                workout: selectedWorkoutType,
                muscles: selectedMuscles,
                goal: selectedGoal
            });
            
            // First update all the context values
            setPoison(selectedWorkoutType);
            setMuscles(selectedMuscles);
            setGoal(selectedGoal);

            // Wait for state updates to be processed
            await new Promise(resolve => setTimeout(resolve, 100));
            
            console.log('Generating workout...');
            
            // Instead of using another Promise, directly call generateNewWorkout
            // after ensuring the context is updated
            const success = generateNewWorkout();
            console.log('Workout generation result:', success);
            
            if (success) {
                // Add a small delay for better UX before navigating
                setTimeout(() => {
                    console.log('Navigating to workout page');
                    navigate('/workout');
                }, 800);
            } else {
                console.error('Failed to generate workout');
                setLocalError(error || 'Failed to generate workout. Please try different selections.');
                setIsGenerating(false);
            }
        } catch (err) {
            console.error('Error generating workout:', err);
            setLocalError(err.message || 'An unexpected error occurred');
            setIsGenerating(false);
        }
    };

    // Render appropriate muscle selection UI based on workout type
    const renderMuscleSelection = () => {
        if (selectedWorkoutType === 'individual') {
            // For individual workout type, show all muscle groups
            return (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {muscleGroups[activeCategory].map((muscle) => (
                        <div
                            key={muscle.id}
                            onClick={() => handleMuscleSelect(muscle.id)}
                            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 capitalize flex items-center justify-between
                                ${
                                    selectedMuscles.includes(muscle.id)
                                        ? isDarkMode 
                                            ? 'bg-green-900/40 border-2 border-green-600 shadow-lg shadow-green-900/20' 
                                            : 'bg-green-50 border-2 border-green-500 shadow-md'
                                        : isDarkMode 
                                            ? 'bg-gray-800 border-2 border-transparent hover:border-green-700 hover:bg-gray-700/50' 
                                            : 'bg-white border-2 border-transparent hover:border-green-300 hover:bg-gray-50 shadow-sm'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    selectedMuscles.includes(muscle.id)
                                        ? isDarkMode 
                                            ? 'bg-green-700 text-green-200' 
                                            : 'bg-green-200 text-green-700'
                                        : isDarkMode 
                                            ? 'bg-gray-700 text-gray-400' 
                                            : 'bg-gray-100 text-gray-500'
                                }`}>
                                    <span className="text-sm font-bold">{muscle.label.charAt(0)}</span>
                                </div>
                                <span className="font-medium">{muscle.label}</span>
                            </div>
                            {selectedMuscles.includes(muscle.id) && (
                                <div className="text-green-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            );
        } else if (selectedWorkoutType === 'push_pull_legs' || selectedWorkoutType === 'bro_split') {
            // For PPL or bro split, show push/pull/legs options
            const options = [
                { id: 'push', label: 'Push (Chest, Shoulders, Triceps)' },
                { id: 'pull', label: 'Pull (Back, Biceps)' },
                { id: 'legs', label: 'Legs (Quads, Hamstrings, Glutes, Calves)' }
            ];
                        
                        return (
                <div className="space-y-4">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleMuscleSelect(option.id)}
                            className={`p-6 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between
                                ${
                                    selectedMuscles.includes(option.id)
                                        ? isDarkMode 
                                            ? 'bg-green-900/40 border-2 border-green-600 shadow-lg shadow-green-900/20' 
                                            : 'bg-green-50 border-2 border-green-500 shadow-md'
                                        : isDarkMode 
                                            ? 'bg-gray-800 border-2 border-transparent hover:border-green-700 hover:bg-gray-700/50' 
                                            : 'bg-white border-2 border-transparent hover:border-green-300 hover:bg-gray-50 shadow-sm'
                                }`}
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        selectedMuscles.includes(option.id)
                                            ? isDarkMode 
                                                ? 'bg-green-700 text-green-200' 
                                                : 'bg-green-200 text-green-700'
                                            : isDarkMode 
                                                ? 'bg-gray-700 text-gray-400' 
                                                : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        <span className="text-lg font-bold">{option.id.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <h4 className="font-bold capitalize text-lg">{option.id}</h4>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 ml-13">
                                    {option.label.split('(')[1]?.replace(')', '')}
                                </p>
                            </div>
                            {selectedMuscles.includes(option.id) && (
                                <div className="text-green-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            );
        } else if (selectedWorkoutType === 'upper_lower') {
            // For Upper/Lower split
            const options = [
                { id: 'upper', label: 'Upper Body (Chest, Back, Shoulders, Arms)' },
                { id: 'lower', label: 'Lower Body (Quads, Hamstrings, Glutes, Calves)' }
            ];
            
            return (
                <div className="space-y-4">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleMuscleSelect(option.id)}
                            className={`p-5 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between
                                ${
                                    selectedMuscles.includes(option.id)
                                        ? isDarkMode 
                                            ? 'bg-green-900/40 border-2 border-green-500 shadow-lg shadow-green-900/20' 
                                            : 'bg-green-50 border-2 border-green-500 shadow-md'
                                        : isDarkMode 
                                            ? 'bg-gray-800 border-2 border-transparent hover:border-green-600 hover:bg-gray-700/50' 
                                            : 'bg-white border-2 border-transparent hover:border-green-300 hover:bg-gray-50 shadow-sm'
                                }`}
                        >
                            <div>
                                <h4 className="font-medium capitalize text-lg">{option.label}</h4>
                            </div>
                            {selectedMuscles.includes(option.id) && (
                                <div className="text-green-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            );
        } else if (selectedWorkoutType === 'bodybuilder_split') {
            // For bodybuilder split
            const options = [
                { id: 'chest', label: 'Chest' },
                { id: 'back', label: 'Back' },
                { id: 'shoulders', label: 'Shoulders' },
                { id: 'arms', label: 'Arms (Biceps, Triceps)' },
                { id: 'legs', label: 'Legs (Quads, Hamstrings, Glutes, Calves)' },
                { id: 'abs', label: 'Abs/Core' }
            ];
            
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleMuscleSelect(option.id)}
                            className={`p-5 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between
                                ${
                                    selectedMuscles.includes(option.id)
                                        ? isDarkMode 
                                            ? 'bg-green-900/40 border-2 border-green-500 shadow-lg shadow-green-900/20' 
                                            : 'bg-green-50 border-2 border-green-500 shadow-md'
                                        : isDarkMode 
                                            ? 'bg-gray-800 border-2 border-transparent hover:border-green-600 hover:bg-gray-700/50' 
                                            : 'bg-white border-2 border-transparent hover:border-green-300 hover:bg-gray-50 shadow-sm'
                                }`}
                        >
                            <div>
                                <h4 className="font-medium capitalize text-lg">{option.label}</h4>
                            </div>
                            {selectedMuscles.includes(option.id) && (
                                <div className="text-green-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            );
        }
        
        // Default empty state
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-lg">Please select a workout type first</p>
            </div>
        );
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <h3 className="text-2xl font-bold mb-3">Choose Workout Type</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            Select the type of workout you want to do
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {workoutTypes.map((type) => (
                                <div
                                    key={type.id}
                                    onClick={() => handleWorkoutTypeSelect(type.id)}
                                    className={`p-5 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                                        selectedWorkoutType === type.id
                                            ? isDarkMode
                                                ? 'bg-green-900/40 border-green-600 shadow-lg shadow-green-900/20' 
                                                : 'bg-green-50 border-green-500 shadow-lg shadow-green-100'
                                            : isDarkMode 
                                                ? 'bg-gray-800/70 border-gray-700 hover:border-green-800 hover:bg-gray-700/50' 
                                                : 'bg-white border-gray-200 hover:border-green-300 hover:bg-gray-50/80'
                                    }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`text-2xl p-3 rounded-xl ${
                                            selectedWorkoutType === type.id
                                                ? isDarkMode
                                                    ? 'bg-green-800 text-green-300' 
                                                    : 'bg-green-200 text-green-700'
                                                : isDarkMode
                                                    ? 'bg-gray-700 text-gray-300' 
                                                    : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {type.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg">{type.name}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                {getWorkoutTypeDescription(type.id)}
                                            </p>
                                        </div>
                                        {selectedWorkoutType === type.id && (
                                            <div className="ml-auto text-green-600 dark:text-green-400">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3 className="text-2xl font-bold mb-3">Select Muscle Groups</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {selectedWorkoutType === 'individual' 
                                ? 'Choose the muscle groups you want to target' 
                                : 'Choose which split you want to train today'}
                        </p>
                        
                        {/* Category tabs - enhanced design */}
                        {selectedWorkoutType === 'individual' && (
                            <div className="flex mb-8 space-x-3 justify-center overflow-x-auto pb-2">
                                {Object.keys(muscleGroups).map(category => (
                                    <button 
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                                            activeCategory === category 
                                                ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md shadow-green-500/30 transform scale-105' 
                                                : isDarkMode 
                                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700' 
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                                        }`}
                                    >
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </button>
                                ))}
                            </div>
                        )}
                        
                        {renderMuscleSelection()}
                        
                        {/* Selected muscles count - enhanced */}
                        <div className="mt-8 flex justify-center">
                            <div className={`px-5 py-2 rounded-xl font-medium text-sm ${
                                selectedMuscles.length > 0
                                    ? isDarkMode
                                        ? 'bg-green-900/30 text-green-400 border border-green-800'
                                        : 'bg-green-100 text-green-800 border border-green-200'
                                    : isDarkMode
                                        ? 'bg-gray-800 text-gray-400 border border-gray-700'
                                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                            }`}>
                                <span className="flex items-center gap-2">
                                    {selectedMuscles.length > 0 ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                                    )}
                                    Selected: {selectedMuscles.length} {selectedWorkoutType === 'individual' ? 'muscle group' : 'option'}{selectedMuscles.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h3 className="text-2xl font-bold mb-3">Select Workout Goal</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            Choose the primary goal for your workout
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {workoutGoals.map((goal) => (
                                <div
                                    key={goal.id}
                                    onClick={() => handleGoalSelect(goal.id)}
                                    className={`p-5 rounded-xl cursor-pointer transition-all duration-300 border-2 h-full ${
                                        selectedGoal === goal.id
                                            ? isDarkMode
                                                ? 'bg-green-900/40 border-green-600 shadow-lg shadow-green-900/20' 
                                                : 'bg-green-50 border-green-500 shadow-lg shadow-green-100'
                                            : isDarkMode 
                                                ? 'bg-gray-800/70 border-gray-700 hover:border-green-800 hover:bg-gray-700/50' 
                                                : 'bg-white border-gray-200 hover:border-green-300 hover:bg-gray-50/80'
                                    }`}
                                >
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className={`text-4xl p-4 rounded-full mb-4 ${
                                            selectedGoal === goal.id
                                                ? isDarkMode
                                                    ? 'bg-green-800 text-green-300' 
                                                    : 'bg-green-200 text-green-700'
                                                : isDarkMode
                                                    ? 'bg-gray-700 text-gray-300' 
                                                    : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {goal.icon}
                                        </div>
                                        <h4 className="font-bold text-xl mb-2">{goal.name}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {goal.description}
                                        </p>
                                        
                                        {selectedGoal === goal.id && (
                                            <div className="mt-4 text-green-600 dark:text-green-400">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 mx-auto"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Success message when all selections are complete */}
                        {selectedGoal && (
                            <div className={`mt-8 p-4 rounded-xl border ${
                                isDarkMode 
                                    ? 'bg-blue-900/20 border-blue-800 text-blue-300' 
                                    : 'bg-blue-50 border-blue-200 text-blue-700'
                            }`}>
                                <div className="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-medium">Ready to generate your workout!</p>
                                        <p className="text-sm mt-1 opacity-80">
                                            You've selected a {selectedWorkoutType.replace('_', ' ')} workout 
                                            targeting {selectedMuscles.join(', ')} 
                                            with a focus on {selectedGoal}.
                                        </p>
                                    </div>
                            </div>
                        </div>
                    )}
                    </div>
                );
            default:
                return null;
        }
    };

    // Helper function to get workout type description
    const getWorkoutTypeDescription = (type) => {
        switch (type) {
            case 'individual':
                return 'Focus on specific muscle groups';
            case 'bro_split':
                return 'Classic bodybuilding split';
            case 'bodybuilder_split':
                return 'Comprehensive full-body rotation';
            case 'upper_lower':
                return 'Alternate between upper and lower body';
            case 'push_pull_legs':
                return 'Separate pushing, pulling, and leg movements';
            default:
                return '';
        }
    };

    return (
        <SectionWrapper isDarkMode={isDarkMode}>
            <div className="max-w-5xl mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold mb-2 text-center">Create Your Perfect Workout</h2>
                <p className="text-center mb-8 text-gray-600 dark:text-gray-400">Customize your workout using our intelligent workout generator</p>
                
                <StepIndicator currentStep={currentStep} totalSteps={3} isDarkMode={isDarkMode} />
                    
                {localError && (
                    <div className="mb-8 p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl dark:bg-red-900/30 dark:border-red-800 dark:text-red-300 flex items-center gap-3 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="font-medium">{localError}</span>
                    </div>
                )}
                
                <div className={`rounded-2xl shadow-xl p-8 mb-8 backdrop-blur-sm transition-all duration-300 ${
                    isDarkMode 
                        ? 'bg-gray-800/60 border border-gray-700 shadow-gray-900/50' 
                        : 'bg-white/90 border border-gray-100 shadow-gray-200/70'
                }`}>
                    {renderStepContent()}
                </div>
                
                <div className="flex justify-between">
                    {currentStep > 1 ? (
                        <button
                            onClick={handlePrevStep}
                            className={`px-6 py-3 rounded-xl flex items-center gap-2 font-medium text-base transition-all duration-200 shadow-md ${
                                isDarkMode 
                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 shadow-gray-900/30' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-gray-300/30'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                    ) : (
                        <div></div>
                    )}
                    
                    {currentStep < 3 ? (
                        <button
                            onClick={handleNextStep}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium flex items-center gap-2 hover:from-blue-500 hover:to-blue-400 transition-all duration-200 shadow-lg shadow-blue-500/20"
                        >
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    ) : (
                            <button 
                            onClick={handleGenerateWorkout}
                            disabled={isGenerating}
                            className={`px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-200 shadow-lg ${
                                isGenerating
                                    ? 'bg-gray-400 cursor-not-allowed text-white'
                                    : 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400 shadow-green-500/30'
                            }`}
                        >
                            {isGenerating ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    Generate Workout
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </>
                            )}
                            </button>
                    )}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Generator;
