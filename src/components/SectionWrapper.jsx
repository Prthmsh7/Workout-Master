import React from 'react'

export default function SectionWrapper(props) {
    const { children, header, title, id, isDarkMode } = props
    
    const headerBg = isDarkMode 
        ? 'bg-gradient-to-r from-gray-900 to-gray-800' 
        : 'bg-gradient-to-r from-gray-100 to-white';
    
    const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
    const accentColor = 'text-green-600';
    const headerTextColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
    const accentBgColor = 'bg-green-600';
    
    return (
        <section id={id} className='min-h-screen flex flex-col gap-8 py-8'>
            <div className={`${headerBg} py-12 flex flex-col gap-2 justify-center items-center p-4 shadow-lg transition-colors duration-300`}>
                <p className={`uppercase font-medium tracking-wider ${accentColor}`}>{header}</p>
                <h2 className={`font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center ${textColor}`}>
                    {Array.isArray(title) ? (
                        <>
                            {title[0]} <span className={accentColor}>{title[1]}</span> {title[2] || ''}
                        </>
                    ) : (
                        title
                    )}
                </h2>
                <div className={`w-24 h-1 ${accentBgColor} mt-4 rounded-full`}></div>
            </div>
            <div className='max-w-[1100px] w-full flex flex-col mx-auto gap-8 p-4 flex-grow'>
                {children}
            </div>
        </section>
    )
}
