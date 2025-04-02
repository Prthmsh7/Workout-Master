import React, { useState, useEffect } from 'react'
import Button from './Button'

function FeatureCard({ icon, title, description, isDarkMode, delay }) {
    const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
    const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
    const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
    
    return (
        <div 
            className={`${cardBg} border ${borderColor} p-6 rounded-lg shadow-md transition-all duration-500 transform hover:scale-105 hover:shadow-lg`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white">{icon}</span>
            </div>
            <h3 className={`${textColor} text-xl font-semibold mb-2`}>{title}</h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{description}</p>
        </div>
    );
}

function TestimonialCard({ name, role, quote, avatar, isDarkMode, delay }) {
    const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
    const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
    const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
    
    return (
        <div 
            className={`${cardBg} border ${borderColor} p-6 rounded-lg shadow-md transition-all duration-500 transform hover:rotate-1`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="flex items-start mb-4">
                <div className={`w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3`}>
                    <span className="text-green-600 font-semibold text-lg">{avatar}</span>
                </div>
                <div>
                    <h4 className={`${textColor} font-semibold`}>{name}</h4>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs`}>{role}</p>
                </div>
            </div>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm italic`}>"{quote}"</p>
        </div>
    );
}

export default function Hero({ isDarkMode, setCurrentView }) {
    const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
    const accentColor = 'text-green-600';
    const secondaryTextColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
    const sectionBg = isDarkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-50';
    const statsBg = isDarkMode ? 'bg-gray-700' : 'bg-white';
    const statsBorder = isDarkMode ? 'border-gray-600' : 'border-gray-200';
    
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Set loaded after a short delay to trigger animations
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);
    
    const features = [
        {
            icon: "📊",
            title: "Smart Planning",
            description: "AI-powered workout plans customized to your specific fitness goals and experience level."
        },
        {
            icon: "🔄",
            title: "Adaptive Training",
            description: "Workouts that evolve as you progress, ensuring continuous improvement and preventing plateaus."
        },
        {
            icon: "📱",
            title: "Progress Tracking",
            description: "Comprehensive tracking of your workout history and achievements to stay motivated."
        },
        {
            icon: "🏆",
            title: "Goal-focused",
            description: "Specialized training approaches for strength, hypertrophy, or endurance based on your objectives."
        }
    ];
    
    const testimonials = [
        {
            name: "Alex Chen",
            role: "Fitness Enthusiast",
            quote: "WorkOut Master transformed my training routine. I've gained 10lbs of muscle in just 3 months!",
            avatar: "AC"
        },
        {
            name: "Sarah Miller",
            role: "Marathon Runner",
            quote: "The endurance programs helped me shave 15 minutes off my marathon time. Absolutely incredible!",
            avatar: "SM"
        },
        {
            name: "James Wilson",
            role: "Beginner Lifter",
            quote: "As someone new to lifting, this app made it easy to get started with confidence. Love the form tips!",
            avatar: "JW"
        }
    ];
    
    const stats = [
        { number: "500+", label: "Workout Plans" },
        { number: "12k+", label: "Active Users" },
        { number: "98%", label: "Success Rate" },
        { number: "24/7", label: "Expert Support" }
    ];
    
    return (
        <div className='flex flex-col w-full'>
            {/* Hero Section */}
            <div className='min-h-[90vh] flex flex-col gap-10 items-center justify-center text-center max-w-[900px] w-full mx-auto p-4 relative'>
                <div className='flex flex-col gap-4 z-10'>
                    <p className={`${accentColor} font-medium uppercase tracking-widest transition-all duration-700 transform ${
                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>TRANSFORM YOUR FITNESS JOURNEY</p>
                    <h1 className={`uppercase font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${textColor} transition-all duration-700 delay-200 transform ${
                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                        Work<span className={`${accentColor} relative group`}>
                            <span className="absolute -inset-1 bg-green-500 opacity-20 rounded-lg blur-sm group-hover:opacity-30 transition-opacity duration-300"></span>
                            <span className="relative">Out</span>
                        </span> Master
                    </h1>
                </div>
                <p className={`text-sm md:text-base font-light max-w-[600px] ${secondaryTextColor} transition-all duration-700 delay-400 transform ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                    Get customized workouts tailored to your goals, track your progress, and achieve the results you've always wanted. Our scientifically-backed approach helps you optimize every session for maximum efficiency and results.
                </p>
                <div className={`transition-all duration-700 delay-600 transform ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                    <Button func={() => {
                        setCurrentView('generate');
                    }} text={"Create Your Workout"} className="bg-green-600 hover:bg-green-700"></Button>
                </div>
                
                {/* Stats Section */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-10 transition-all duration-700 delay-800 transform ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                    {stats.map((stat, index) => (
                        <div key={index} className={`${statsBg} border ${statsBorder} rounded-lg p-4 flex flex-col items-center justify-center shadow-sm transform hover:scale-105 transition-transform duration-300`}>
                            <p className={`text-green-600 font-bold text-2xl md:text-3xl`}>{stat.number}</p>
                            <p className={`${secondaryTextColor} text-xs md:text-sm`}>{stat.label}</p>
                        </div>
                    ))}
                </div>
                
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <div 
                            key={i}
                            className={`absolute rounded-full bg-green-500 opacity-10 ${isDarkMode ? 'bg-opacity-20' : 'bg-opacity-30'}`}
                            style={{
                                width: `${Math.random() * 200 + 50}px`,
                                height: `${Math.random() * 200 + 50}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `float ${Math.random() * 20 + 30}s linear infinite`,
                                animationDelay: `${Math.random() * 20}s`,
                                transform: `translate(-50%, -50%) scale(${Math.random() * 0.5 + 0.5})`,
                            }}
                        />
                    ))}
                </div>
            </div>
            
            {/* Features Section */}
            <div className={`${sectionBg} py-16 px-4 w-full`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl font-bold mb-4 ${textColor}`}>Why Choose WorkOut Master?</h2>
                        <p className={`${secondaryTextColor} max-w-2xl mx-auto`}>Our platform offers scientifically-backed training methods to help you achieve your fitness goals faster and more efficiently.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <FeatureCard 
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                isDarkMode={isDarkMode}
                                delay={index * 100}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Testimonials Section */}
            <div className="py-16 px-4 w-full">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl font-bold mb-4 ${textColor}`}>What Our Users Say</h2>
                        <p className={`${secondaryTextColor} max-w-2xl mx-auto`}>Join thousands of satisfied users who have transformed their fitness journey with WorkOut Master.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard 
                                key={index}
                                name={testimonial.name}
                                role={testimonial.role}
                                quote={testimonial.quote}
                                avatar={testimonial.avatar}
                                isDarkMode={isDarkMode}
                                delay={index * 100}
                            />
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <Button 
                            func={() => { setCurrentView('generate'); }} 
                            text="Start Your Fitness Journey" 
                            className="bg-green-600 hover:bg-green-700"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
