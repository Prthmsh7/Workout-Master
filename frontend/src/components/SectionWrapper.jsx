import React from 'react'

export default function SectionWrapper(props) {
    const { children, header, title, id, isDarkMode } = props
    
    const headerBg = isDarkMode 
        ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800' 
        : 'bg-gradient-to-r from-gray-100 via-white to-gray-100 border-b border-gray-200';
    
    const contentBg = isDarkMode
        ? 'bg-gray-900'
        : 'bg-gray-50';
    
    const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
    const accentColor = isDarkMode ? 'text-green-500' : 'text-green-600';
    const headerTextColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
    const accentBgColor = isDarkMode ? 'bg-green-500' : 'bg-green-600';
    
    // Only render header if title or header props are provided
    const renderHeader = () => {
        if (!header && !title) return null;
        
        return (
            <div className={`${headerBg} py-12 sm:py-16 flex flex-col gap-3 justify-center items-center px-4 shadow-lg transition-colors duration-300`}>
                {header && (
                    <p className={`uppercase font-medium tracking-wider ${accentColor} text-sm sm:text-base`}>{header}</p>
                )}
                {title && (
                    <h2 className={`font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center ${textColor} transition-colors duration-300`}>
                        {Array.isArray(title) ? (
                            <>
                                {title[0]} <span className={accentColor}>{title[1]}</span> {title[2] || ''}
                            </>
                        ) : (
                            title
                        )}
                    </h2>
                )}
                <div className={`w-24 h-1 ${accentBgColor} mt-4 rounded-full transition-colors duration-300`}></div>
            </div>
        );
    };
    
    return (
        <section id={id} className={`min-h-screen flex flex-col ${contentBg} transition-colors duration-300`}>
            {renderHeader()}
            <div className='max-w-[1200px] w-full flex flex-col mx-auto gap-8 p-4 sm:p-6 md:p-8 flex-grow'>
                {children}
            </div>
        </section>
    )
}
