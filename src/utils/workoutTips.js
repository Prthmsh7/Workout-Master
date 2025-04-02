/**
 * Workout Tips and Motivation Content
 */

export const WORKOUT_TIPS = [
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
  "Having a workout buddy can increase accountability and make exercise more fun."
];

export const NUTRITION_TIPS = [
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