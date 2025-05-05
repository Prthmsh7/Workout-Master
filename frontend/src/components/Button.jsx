import React from 'react'

export default function Button(props) {
    const { text, func, className = '' } = props
    return (
        <button 
            onClick={func} 
            className={`px-8 mx-auto py-4 rounded-md font-medium transition-all duration-300 
            bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl
            transform hover:-translate-y-1 active:translate-y-0 active:shadow-md
            hover:scale-105 active:scale-95 relative overflow-hidden group ${className}`}
        >
            <span className="relative z-10">{text}</span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-md"></span>
        </button>
    )
}
