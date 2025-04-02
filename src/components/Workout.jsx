import React, { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import ExerciseCard from './ExerciseCard'
import Button from './Button'

export default function Workout(props) {
    const { workout, completeWorkout, isDarkMode } = props
    const [completedExercises, setCompletedExercises] = useState({});

    const updateExerciseStatus = (index, completed) => {
        setCompletedExercises({
            ...completedExercises,
            [index]: completed
        });
    };

    const allExercisesCompleted = Object.keys(completedExercises).length === workout.length && 
        Object.values(completedExercises).every(status => status);

    const infoBg = isDarkMode 
        ? 'bg-green-900 bg-opacity-10 border border-green-700 border-opacity-30' 
        : 'bg-green-50 border border-green-200';
    
    const infoTextColor = isDarkMode ? 'text-green-400' : 'text-green-700';

    return (
        <SectionWrapper id={'workout'} header={"YOUR PERSONALIZED"} title={['WORKOUT', 'PLAN']} isDarkMode={isDarkMode}>
            <div className={`mb-6 px-4 py-3 rounded-lg ${infoBg}`}>
                <h3 className="text-xl font-semibold mb-2">Workout Instructions</h3>
                <p>Complete all exercises in order. Track your sets and mark each exercise as complete when finished.</p>
                <p className={`mt-2 ${infoTextColor}`}>Rest adequately between sets and maintain proper form for best results.</p>
            </div>
            
            <div className='flex flex-col gap-4 mb-6'>
                {workout.map((exercise, i) => (
                    <ExerciseCard 
                        i={i} 
                        exercise={exercise} 
                        key={i} 
                        updateStatus={(completed) => updateExerciseStatus(i, completed)}
                        isCompleted={completedExercises[i] || false}
                        isDarkMode={isDarkMode}
                    />
                ))}
            </div>
            
            <div className="flex justify-center mt-6">
                <Button 
                    text={allExercisesCompleted ? "Complete Workout" : "Mark All Exercises as Complete"} 
                    func={allExercisesCompleted ? completeWorkout : () => {
                        workout.forEach((_, i) => {
                            updateExerciseStatus(i, true);
                        });
                    }}
                    className={allExercisesCompleted ? "bg-green-600 hover:bg-green-700" : ""}
                />
            </div>
        </SectionWrapper>
    )
}
