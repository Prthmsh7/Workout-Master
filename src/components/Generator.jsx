import React, { useState, useEffect } from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/swoldier'
import Button from './Button'

function Header({ index, title, description, isDarkMode }) {
    const indexBg = 'bg-green-600';
    const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
    const descriptionColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
    
    return (
        <div className='flex flex-col gap-4 mb-6'>
            <div className='flex items-center gap-3'>
                <div className={`${indexBg} h-10 w-10 rounded-full flex items-center justify-center text-xl font-bold text-white transform hover:scale-110 transition-transform duration-300`}>
                    {index}
                </div>
                <h4 className={`text-xl sm:text-2xl md:text-3xl font-semibold ${textColor} hover:text-green-600 transition-colors duration-300`}>{title}</h4>
            </div>
            <p className={`text-sm sm:text-base ${descriptionColor} max-w-3xl`}>{description}</p>
        </div>
    )
}

export default function Generator(props) {
    const { muscles, setMuscles, poison, setPoison, goal, setGoal, updateWorkout, isDarkMode } = props
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [animatedSections, setAnimatedSections] = useState({
        workoutType: false,
        muscleGroups: false,
        fitnessGoal: false
    });

    useEffect(() => {
        // Staggered animation for sections
        const timer1 = setTimeout(() => {
            setAnimatedSections(prev => ({ ...prev, workoutType: true }));
        }, 100);
        
        const timer2 = setTimeout(() => {
            setAnimatedSections(prev => ({ ...prev, muscleGroups: true }));
        }, 300);
        
        const timer3 = setTimeout(() => {
            setAnimatedSections(prev => ({ ...prev, fitnessGoal: true }));
        }, 500);
        
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    function toggleModal() {
        if (!showModal) {
            setIsAnimating(true);
            setShowModal(true);
            setTimeout(() => setIsAnimating(false), 300);
        } else {
            setIsAnimating(true);
            setTimeout(() => {
                setShowModal(false);
                setIsAnimating(false);
            }, 300);
        }
    }

    function updateMuscles(muscleGroup) {
        if (muscles.includes(muscleGroup)) {
            setMuscles(muscles.filter(val => val !== muscleGroup))
            return
        }

        if (muscles.length > 2) {
            return
        }

        if (poison !== 'individual') {
            setMuscles([muscleGroup])
            toggleModal();
            return
        }

        setMuscles([...muscles, muscleGroup])
        if (muscles.length === 2) {
            toggleModal();
        }
    }

    function handleGenerateWorkout() {
        if (muscles.length < 1) {
            setError('Please select at least one muscle group');
            return;
        }
        setError('');
        
        // Add animation before generating workout
        setIsAnimating(true);
        setTimeout(() => {
            updateWorkout();
            setIsAnimating(false);
        }, 300);
    }

    // Theme colors
    const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
    const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
    const cardBorder = isDarkMode ? 'border-gray-700' : 'border-gray-200';
    const cardHoverBorder = 'hover:border-green-500';
    const cardSelectedBorder = 'border-green-600';
    const cardSelectedShadow = 'shadow-green-600/20';
    const labelColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
    const infoBg = isDarkMode 
        ? 'bg-green-900 bg-opacity-10 border-green-700 border-opacity-30' 
        : 'bg-green-50 border-green-200';
        
    const muscleGroupBg = isDarkMode 
        ? (muscles.length === 0 ? `${cardBg} border ${cardBorder} ${cardHoverBorder}` : 'bg-green-900 bg-opacity-10 border border-green-600')
        : (muscles.length === 0 ? `${cardBg} border ${cardBorder} ${cardHoverBorder}` : 'bg-green-50 border border-green-500');
    
    const modalBg = isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200';
    const buttonBg = isDarkMode 
        ? (isSelected => isSelected ? `${cardBg} bg-green-900 bg-opacity-20 border ${cardSelectedBorder}` : `${cardBg} border ${cardBorder} ${cardHoverBorder}`)
        : (isSelected => isSelected ? `${cardBg} bg-green-50 border ${cardSelectedBorder}` : `${cardBg} border ${cardBorder} ${cardHoverBorder}`);

    return (
        <SectionWrapper id={'generate'} header={"Build your perfect"} title={"WORKOUT"} isDarkMode={isDarkMode}>
            <div className={`bg-green-600 bg-opacity-10 p-4 rounded-lg border ${infoBg} mb-6 transform transition-all duration-500 hover:scale-[1.01] hover:shadow-lg`}>
                <h3 className={`font-medium text-lg mb-2 ${textColor}`}>How to Create Your Workout</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Follow these steps to build a personalized workout plan tailored to your goals. Select your workout type, target specific muscle groups, and choose your fitness objective.</p>
            </div>
            
            <div className={`transition-opacity duration-500 ease-in-out ${animatedSections.workoutType ? 'opacity-100' : 'opacity-0'}`}>
                <Header 
                    index={'1'} 
                    title={'Choose Your Workout Type'} 
                    description={"Select the workout style that matches your training preferences and goals."} 
                    isDarkMode={isDarkMode}
                />
                
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10'>
                    {Object.keys(WORKOUTS).map((type, typeIndex) => {
                        const descriptions = {
                            individual: 'Focus on specific muscle groups with exercises targeting those areas directly.',
                            bro_split: 'Classic bodybuilding approach dividing workouts into push, pull, and leg days.',
                            bodybuilder_split: 'Comprehensive split targeting specific body parts on different days.',
                            upper_lower: 'Efficient approach alternating between upper body and lower body workouts.'
                        };
                        
                        const isSelected = type === poison;
                        
                        return (
                            <button 
                                onClick={() => {
                                    setMuscles([])
                                    setPoison(type)
                                }} 
                                className={`${cardBg} border-2 p-4 rounded-lg transition-all duration-300 flex flex-col items-center text-center h-full
                                    transform hover:scale-[1.02] hover:shadow-lg
                                    ${isSelected 
                                        ? `${cardSelectedBorder} shadow-lg ${cardSelectedShadow}` 
                                        : `${cardBorder} ${cardHoverBorder}`}`} 
                                key={typeIndex}
                                style={{ transitionDelay: `${typeIndex * 100}ms` }}
                            >
                                <p className={`capitalize font-medium text-lg mb-2 ${textColor}`}>
                                    {type.replaceAll('_', " ")}
                                </p>
                                <p className={`text-sm ${labelColor}`}>
                                    {descriptions[type]}
                                </p>
                            </button>
                        )
                    })}
                </div>
            </div>
            
            <div className={`transition-opacity duration-500 ease-in-out ${animatedSections.muscleGroups ? 'opacity-100' : 'opacity-0'}`}>
                <Header 
                    index={'2'} 
                    title={'Select Target Muscles'} 
                    description={"Choose the muscle groups you want to focus on in your workout."} 
                    isDarkMode={isDarkMode}
                />
                
                <div className='mb-10'>
                    <div 
                        onClick={toggleModal} 
                        className={`relative p-4 flex items-center gap-3 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${muscleGroupBg}`}
                    >
                        {muscles.length === 0 ? (
                            <div className='flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                <p className={textColor}>Select muscle groups</p>
                            </div>
                        ) : (
                            <div className='flex flex-wrap gap-2'>
                                {muscles.map((muscle, idx) => (
                                    <div key={idx} className='bg-green-600 bg-opacity-20 px-3 py-1 rounded-full transform transition-transform hover:scale-105'>
                                        <p className={`capitalize text-sm font-medium ${textColor}`}>{muscle.replaceAll('_', ' ')}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <svg className={`h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 ${textColor} transition-transform duration-300 ${showModal ? 'rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    
                    {showModal && (
                        <div className={`mt-2 p-4 ${modalBg} rounded-lg shadow-lg transition-all duration-300 ${isAnimating ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
                                {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) => {
                                    const isSelected = muscles.includes(muscleGroup);
                                    return (
                                        <button 
                                            onClick={() => updateMuscles(muscleGroup)} 
                                            key={muscleGroupIndex} 
                                            className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md ${buttonBg(isSelected)}`}
                                            style={{ animationDelay: `${muscleGroupIndex * 50}ms` }}
                                        >
                                            <p className={`capitalize text-sm ${textColor}`}>{muscleGroup.replaceAll('_', ' ')}</p>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                    
                    {error && (
                        <p className='mt-2 text-red-500 text-sm animate-pulse'>{error}</p>
                    )}
                </div>
            </div>
            
            <div className={`transition-opacity duration-500 ease-in-out ${animatedSections.fitnessGoal ? 'opacity-100' : 'opacity-0'}`}>
                <Header 
                    index={'3'} 
                    title={'Choose Your Fitness Goal'} 
                    description={"Select your primary objective to tailor the workout intensity and structure."} 
                    isDarkMode={isDarkMode}
                />
                
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10'>
                    {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
                        const descriptions = {
                            strength_power: 'Build maximum strength and power with heavier weights and lower rep ranges.',
                            growth_hypertrophy: 'Focus on muscle growth with moderate weights and higher volume.',
                            cardiovascular_endurance: 'Improve endurance and conditioning with higher reps and shorter rest periods.'
                        };
                        
                        const isSelected = scheme === goal;
                        
                        return (
                            <button 
                                onClick={() => setGoal(scheme)} 
                                className={`${cardBg} border-2 p-4 rounded-lg transition-all duration-300 text-center
                                    transform hover:scale-[1.02] hover:shadow-lg
                                    ${isSelected 
                                        ? `${cardSelectedBorder} shadow-lg ${cardSelectedShadow}` 
                                        : `${cardBorder} ${cardHoverBorder}`}`} 
                                key={schemeIndex}
                                style={{ transitionDelay: `${schemeIndex * 100}ms` }}
                            >
                                <p className={`capitalize font-medium mb-2 ${textColor}`}>{scheme.replaceAll('_', " ")}</p>
                                <p className={`text-sm ${labelColor}`}>{descriptions[scheme]}</p>
                            </button>
                        )
                    })}
                </div>
            </div>
            
            <div className='flex justify-center'>
                <Button 
                    func={handleGenerateWorkout} 
                    text={"Create My Workout"} 
                    className={`text-lg py-5 px-10 transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}
                />
            </div>
        </SectionWrapper>
    )
}
