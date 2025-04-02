import React, { useState } from 'react'

export default function ExerciseCard(props) {
    const { exercise, i, updateStatus, isCompleted, isDarkMode } = props
    const [setsCompleted, setSetsComplete] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [showCompletedAnimation, setShowCompletedAnimation] = useState(false)

    function handleSetIncrement() {
        const newSetsCompleted = (setsCompleted + 1) % 6;
        setSetsComplete(newSetsCompleted)
        
        // If all sets are completed, notify the parent component and show animation
        if (newSetsCompleted === 5 && !isCompleted) {
            setShowCompletedAnimation(true)
            setTimeout(() => {
                updateStatus(true);
                setTimeout(() => {
                    setShowCompletedAnimation(false);
                }, 1000);
            }, 300);
        } else if (isCompleted) {
            updateStatus(false);
        }
    }

    const cardBg = isDarkMode 
        ? (isCompleted ? 'bg-green-900 bg-opacity-20 border border-green-600' : 'bg-gray-800 border border-gray-700 hover:border-green-600')
        : (isCompleted ? 'bg-green-50 border border-green-500' : 'bg-white border border-gray-200 hover:border-green-500');
    
    const indexColor = isDarkMode ? 'text-gray-500' : 'text-gray-400';
    const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
    const labelColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
    const descBg = isDarkMode ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-50';
    const statsBg = isDarkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-100';
    const progressTrackBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-300';
    const progressBarBg = 'bg-green-600';
    const setsBtnBg = isDarkMode 
        ? (setsCompleted === 5 ? 'bg-green-900 bg-opacity-20 border border-green-600' : 'bg-gray-700 bg-opacity-50 border border-gray-600 hover:border-green-500')
        : (setsCompleted === 5 ? 'bg-green-50 border border-green-500' : 'bg-gray-100 border border-gray-300 hover:border-green-500');

    return (
        <div 
            className={`p-4 rounded-md flex flex-col gap-4 transition-all duration-300 ${cardBg} ${
                isHovered ? 'shadow-lg transform -translate-y-1' : ''
            } ${showCompletedAnimation ? 'animate-pulse' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='flex items-center gap-4'>
                <h4 className={`text-3xl font-semibold ${indexColor} w-10 transition-all duration-300 ${
                    isHovered ? 'transform scale-110' : ''
                }`}>
                    {String(i + 1).padStart(2, '0')}
                </h4>
                <div className='flex-1'>
                    <h2 className={`capitalize text-lg sm:text-xl font-medium ${textColor}`}>
                        {exercise.name.replaceAll("_", " ")}
                    </h2>
                    <p className={`text-sm ${labelColor} capitalize`}>{exercise.muscles.join(' & ')} • {exercise.type}</p>
                </div>
                {isCompleted && (
                    <div className='h-8 w-8 rounded-full bg-green-600 flex items-center justify-center animate-in fade-in duration-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white animate-in zoom-in-50 duration-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
            </div>

            <div className={`flex flex-col ${descBg} rounded-lg p-3 gap-2 transition-all duration-300 ${
                isHovered ? 'shadow-inner' : ''
            }`}>
                {exercise.description.split('___').map((val, idx) => (
                    <div key={idx} className={`text-sm ${textColor} ${
                        idx > 0 ? 'animate-in slide-in-from-right duration-300 delay-200' : ''
                    }`}>
                        {idx > 0 && <span className='font-semibold text-green-600 mr-2'>Tip:</span>}
                        {val}
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                {['reps', 'rest', 'tempo'].map((info, idx) => (
                    <div 
                        key={info} 
                        className={`flex flex-col p-2 rounded-lg ${statsBg} w-full transition-all duration-300 ${
                            isHovered ? 'transform scale-105' : ''
                        }`}
                        style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                        <h3 className={`capitalize ${labelColor} text-sm`}>{info === 'reps' ? `${exercise.unit}` : info}</h3>
                        <p className={`font-medium ${textColor}`}>{exercise[info]}</p>
                    </div>
                ))}
                <button 
                    onClick={handleSetIncrement} 
                    className={`flex flex-col p-2 rounded-lg transition-all duration-300 w-full ${setsBtnBg} ${
                        isHovered ? 'transform scale-105 shadow-md' : ''
                    } hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50`}
                >
                    <h3 className={`${textColor} text-sm capitalize`}>Sets completed</h3>
                    <div className='flex items-center gap-1 mt-1'>
                        {[...Array(5)].map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`h-2 w-full rounded-full transition-all duration-300 ${
                                    idx < setsCompleted ? progressBarBg : progressTrackBg
                                }`}
                                style={{ transitionDelay: `${idx * 100}ms` }}
                            />
                        ))}
                    </div>
                </button>
            </div>
            
            {showCompletedAnimation && (
                <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-md flex items-center justify-center animate-in fade-in slide-in-from-bottom duration-300">
                    <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    )
}
