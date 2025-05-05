/**
 * Workout Tips and Motivation Content
 */

export const WORKOUT_TIPS = [
  "Stay hydrated before, during, and after your workout.",
  "Always warm up for 5-10 minutes before starting your main workout.",
  "Cool down with light stretching after your workout to improve recovery.",
  "Focus on proper form rather than lifting heavier weights.",
  "Progress gradually by adding weight or reps over time.",
  "Rest between 30-90 seconds for hypertrophy, 2-5 minutes for strength.",
  "Try to breathe out during the exertion phase of an exercise.",
  "Schedule rest days to allow your muscles to recover and grow.",
  "Keep a workout journal to track your progress.",
  "Vary your routine every 4-6 weeks to prevent plateaus.",
  "Compound exercises like squats and deadlifts give you more bang for your buck.",
  "Don't skip leg day - your lower body contains the largest muscle groups.",
  "Mind-muscle connection is key - focus on the muscles you're working.",
  "Quality reps are better than quantity with poor form.",
  "If you're new to working out, consider hiring a trainer for a few sessions.",
  "Listen to your body - sharp pain is different from muscle fatigue.",
  "For muscle growth, aim to train each muscle group 2-3 times per week.",
  "The last few reps should be challenging but manageable.",
  "Use a spotter when lifting heavy weights, especially on bench press.",
  "Incorporate both pushing and pulling exercises for balanced development."
];

export const NUTRITION_TIPS = [
  "Aim for 1.6-2.2g of protein per kg of bodyweight for muscle growth.",
  "Eat a meal with protein and carbs within 2 hours after your workout.",
  "Complex carbs provide sustained energy for longer workouts.",
  "Healthy fats are essential for hormone production, including testosterone.",
  "Stay hydrated - aim for at least 3-4 liters of water daily.",
  "Avoid processed foods and focus on whole food sources.",
  "Eat plenty of fruits and vegetables for micronutrients and fiber.",
  "Consider a protein shake if you struggle to meet your protein needs.",
  "Creatine monohydrate is one of the most researched and effective supplements.",
  "Plan and prep your meals in advance to maintain a consistent diet.",
  "Don't fear carbs - they're your body's preferred energy source for intense training.",
  "Consuming protein before bed can help with recovery overnight.",
  "Eat a balanced meal 2-3 hours before your workout for optimal performance.",
  "Track your calories if you're trying to gain or lose weight.",
  "Aim for a variety of protein sources: meat, fish, eggs, dairy, and plant-based options.",
  "Stay hydrated! Drink water before, during, and after your workout.",
  "Proper form is more important than lifting heavy. Focus on technique first.",
  "Track your progress to stay motivated and see how far you've come.",
  "Don't skip your warm-up. It prepares your body and helps prevent injuries.",
  "Rest days are essential for muscle recovery and growth.",
  "Consistency beats intensity. A regular moderate workout routine is better than occasional intense sessions.",
  "Keep your core engaged during all exercises for better stability and strength.",
  "Breathe properly: exhale during exertion, inhale during recovery.",
  "Vary your workouts to prevent plateaus and keep things interesting.",
  "Progressive overload is key - gradually increase weight, reps, or sets over time.",
  "Listen to your body. Pain is different from discomfort - know when to stop.",
  "Your diet plays a huge role in your results. You can't out-train a poor diet.",
  "Sleep is when your body builds muscle. Aim for 7-9 hours of quality sleep.",
  "Set specific, measurable goals to stay focused and motivated.",
  "Having a workout buddy can increase accountability and make exercise more fun.",
  "Protein is essential for muscle recovery. Aim for 1.6-2.2g per kg of bodyweight.",
  "Carbs are your body's preferred energy source. Focus on complex carbs around your workouts.",
  "Healthy fats support hormone production. Include sources like avocados, nuts, and olive oil.",
  "Eat within 30-60 minutes after your workout to optimize recovery.",
  "Hydration affects performance. Even mild dehydration can reduce strength and endurance.",
  "Pre-workout meals should include protein and carbs. Avoid excess fat which slows digestion.",
  "Supplements can help, but they can't replace a balanced diet.",
  "Meal prep saves time and helps you make healthier choices throughout the week.",
  "Understand portion sizes to avoid overeating, even with healthy foods.",
  "Vegetables provide crucial micronutrients that support recovery and overall health."
];

export const MOTIVATIONAL_QUOTES = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "Success starts with self-discipline.",
  "Don't wish for it, work for it.",
  "Strength does not come from the physical capacity. It comes from an indomitable will.",
  "The difference between try and triumph is a little umph.",
  "The hard days are what make you stronger.",
  "You don't have to be extreme, just consistent.",
  "It's not about having time, it's about making time.",
  "The only person you should try to be better than is the person you were yesterday.",
  "Dream big. Work hard. Stay focused.",
  "Fall in love with the process and the results will come.",
  "Don't stop when you're tired. Stop when you're done."
];

export const FITNESS_FACTS = [
  "Muscle doesn't turn into fat or vice versa - they're completely different tissues.",
  "Cardio doesn't necessarily burn muscle. When combined with strength training and proper nutrition, it can enhance recovery.",
  "Exercise boosts brain health and can improve memory and cognitive function.",
  "Working out in the morning can boost your metabolism for the rest of the day.",
  "Music can improve workout performance by up to 15%.",
  "It takes about 12 weeks to see significant changes in your body composition.",
  "Rest between sets is crucial - it allows your muscles to recover and prepare for the next set.",
  "Compound exercises that work multiple muscle groups burn more calories than isolation exercises.",
  "Regular exercise can boost your immune system and reduce sick days.",
  "Your body continues to burn calories after exercise through a process called excess post-exercise oxygen consumption (EPOC)."
];

export const getRandomTip = (array) => {
  // Check if array is valid and has items
  if (!array || !Array.isArray(array) || array.length === 0) {
    return "Stay consistent with your workouts for the best results!";
  }
  
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const getMultipleRandomTips = (array, count = 3) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const GOAL_DESCRIPTIONS = {
  strength_power: {
    title: "Strength & Power",
    description: "Focus on building maximum strength and explosive power with heavier weights and lower rep ranges. This training style emphasizes neural adaptations and increases in muscle fiber recruitment.",
    benefits: [
      "Increased maximal strength",
      "Improved power output",
      "Enhanced neuromuscular efficiency",
      "Better bone density",
      "Improved athletic performance"
    ],
    tips: [
      "Focus on proper form, especially with heavier weights",
      "Take sufficient rest between sets (2-5 minutes)",
      "Include compound movements as the foundation of your training",
      "Track your progress by recording weights and reps",
      "Prioritize quality over quantity in your repetitions"
    ]
  },
  growth_hypertrophy: {
    title: "Muscle Growth",
    description: "Target muscle growth (hypertrophy) through moderate weights and higher volume training. This approach creates metabolic stress and mechanical tension to stimulate muscle fiber growth.",
    benefits: [
      "Increased muscle size",
      "Enhanced body composition",
      "Improved metabolic rate",
      "Stronger connective tissues",
      "Better overall physique"
    ],
    tips: [
      "Focus on the mind-muscle connection during exercises",
      "Keep rest periods shorter (60-90 seconds)",
      "Ensure adequate protein intake (1.6-2.2g/kg of bodyweight)",
      "Train each muscle group 2-3 times per week",
      "Incorporate both compound and isolation exercises"
    ]
  },
  cardiovascular_endurance: {
    title: "Endurance & Conditioning",
    description: "Improve cardiovascular health and muscular endurance with higher repetitions and shorter rest periods. This training style enhances your body's ability to sustain effort over time.",
    benefits: [
      "Improved heart health",
      "Enhanced recovery between sets",
      "Better oxygen utilization",
      "Increased calorie burn",
      "Greater exercise tolerance"
    ],
    tips: [
      "Keep rest periods short (30-60 seconds)",
      "Focus on maintaining form even when fatigued",
      "Use circuit training to maximize efficiency",
      "Monitor your heart rate during training",
      "Gradually increase workout duration over time"
    ]
  },
  fat_loss: {
    title: "Fat Loss",
    description: "Focus on maximizing calorie burn and metabolic rate through high-intensity workouts with minimal rest. This training style combines resistance training with cardio elements for optimal fat burning.",
    benefits: [
      "Increased calorie expenditure",
      "Improved metabolic rate",
      "Enhanced fat oxidation",
      "Preservation of lean muscle mass",
      "Better overall body composition"
    ],
    tips: [
      "Keep rest periods very short (15-30 seconds)",
      "Use supersets and circuit training to maximize efficiency",
      "Include both resistance training and cardiovascular elements",
      "Focus on compound movements that work multiple muscle groups",
      "Maintain high intensity throughout the workout"
    ]
  }
};

export const WORKOUT_TYPE_INFO = {
  individual: {
    title: "Individual Muscle Focus",
    description: "Target specific muscle groups with exercises that directly stimulate those areas. This approach allows for maximum concentration on developing particular muscles.",
    benefits: [
      "Precise targeting of specific muscle groups",
      "Great for addressing muscular imbalances",
      "Can focus on lagging body parts",
      "More control over recovery of individual muscles",
      "Excellent for bodybuilding-style training"
    ]
  },
  bro_split: {
    title: "Push/Pull/Legs Split",
    description: "Divide your training into push movements (chest, shoulders, triceps), pull movements (back, biceps), and leg exercises. This training split balances volume and recovery effectively.",
    benefits: [
      "Logical grouping of movements that work together",
      "Allows for adequate recovery between sessions",
      "Can train with higher volume per muscle group",
      "Flexible schedule options (3-6 days per week)",
      "Good balance of strength and hypertrophy"
    ]
  },
  push_pull_legs: {
    title: "Push/Pull/Legs Split",
    description: "Divide your training into push movements (chest, shoulders, triceps), pull movements (back, biceps), and leg exercises. This training split balances volume and recovery effectively.",
    benefits: [
      "Logical grouping of movements that work together",
      "Allows for adequate recovery between sessions",
      "Can train with higher volume per muscle group",
      "Flexible schedule options (3-6 days per week)",
      "Good balance of strength and hypertrophy"
    ]
  },
  bodybuilder_split: {
    title: "Bodybuilder Split",
    description: "Train different body parts on separate days, similar to professional bodybuilders. This approach allows for high volume and frequency while managing recovery.",
    benefits: [
      "High training volume for each muscle group",
      "Great for those who enjoy longer, focused workouts",
      "Ideal for intermediate and advanced lifters",
      "Can customize days based on priorities",
      "Excellent for developing specific muscle groups"
    ]
  },
  upper_lower: {
    title: "Upper/Lower Split",
    description: "Divide training into upper body days and lower body days. This approach provides a good balance of frequency, volume, and recovery for most individuals.",
    benefits: [
      "Train each muscle group 2x per week for optimal growth",
      "Efficient time management (typically 4 days/week)",
      "Good balance of recovery and frequency",
      "Flexible and adaptable to different goals",
      "Suitable for beginners through advanced lifters"
    ]
  }
}; 