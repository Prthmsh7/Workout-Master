// Exercise data organized by muscle groups
export const EXERCISES_DATA = {
    // Chest exercises
    bench_press: {
        type: 'compound',
        meta: { environment: 'gym' },
        muscles: ['chest', 'triceps', 'shoulders'],
        unit: 'reps',
        description: 'Lie on a bench and push a barbell up from your chest'
    },
    incline_bench_press: {
        type: 'compound',
        meta: { environment: 'gym' },
        muscles: ['chest', 'shoulders', 'triceps'],
        unit: 'reps',
        description: 'Bench press on an inclined bench to focus on upper chest'
    },
    decline_bench_press: {
        type: 'compound',
        meta: { environment: 'gym' },
        muscles: ['chest', 'triceps'],
        unit: 'reps',
        description: 'Bench press on a declined bench to focus on lower chest'
    },
    dumbbell_fly: {
        type: 'accessory',
        meta: { environment: 'gymhome' },
        muscles: ['chest'],
        unit: 'reps',
        description: 'Lie on a bench and open your arms with dumbbells'
    },
    cable_crossover: {
        type: 'accessory',
        meta: { environment: 'gym' },
        muscles: ['chest'],
        unit: 'reps',
        description: 'Stand between cable machines and bring handles together in front of you'
    },
    push_up: {
        type: 'compound',
        meta: { environment: 'gymhome' },
        muscles: ['chest', 'triceps', 'shoulders'],
        unit: 'reps',
        description: 'Standard push-up from the floor'
    },
    
    // Back exercises
    pullup: {
        type: 'compound',
        meta: { environment: 'gymhome' },
        muscles: ['back', 'biceps'],
        unit: 'reps',
        description: 'Pull yourself up to a bar until your chin is over it'
    },
    lat_pulldown: {
        type: 'compound',
        meta: { environment: 'gym' },
        muscles: ['back', 'biceps'],
        unit: 'reps',
        description: 'Pull a bar down to your chest while seated'
    },
    bent_over_row: {
        type: 'compound',
        meta: { environment: 'gymhome' },
        muscles: ['back', 'biceps', 'shoulders'],
        unit: 'reps',
        description: 'Bend over and pull a weight to your abdomen'
    },
    seated_cable_row: {
        type: 'compound',
        meta: { environment: 'gym' },
        muscles: ['back', 'biceps'],
        unit: 'reps',
        description: 'Sit at a cable machine and pull the handle to your abdomen'
    },
    t_bar_row: {
        type: 'compound',
        meta: { environment: 'gym' },
        muscles: ['back', 'biceps'],
        unit: 'reps',
        description: 'Row a bar loaded on one end'
    },
    deadlift: {
        type: 'compound',
        meta: { environment: 'gym' },
        muscles: ['back', 'hamstrings', 'glutes'],
        unit: 'reps',
        description: 'Lift a barbell from the floor to standing position'
    },
    
    // Legs exercises
    squat: {
        type: 'compound',
        meta: { environment: 'gym' },
        muscles: ['quads', 'glutes', 'hamstrings'],
        unit: 'reps',
        description: 'Lower your body by bending your knees with weight on your shoulders'
    },
    leg_press: {
        type: 'compound',
        meta: { environment: 'gym' },
        muscles: ['quads', 'glutes', 'hamstrings'],
        unit: 'reps',
        description: 'Push weight away using your legs on a machine'
    },
    leg_extension: {
        type: 'isolation',
        meta: { environment: 'gym' },
        muscles: ['quads'],
        unit: 'reps',
        description: 'Extend your legs against resistance while seated'
    },
    leg_curl: {
        type: 'isolation',
        meta: { environment: 'gym' },
        muscles: ['hamstrings'],
        unit: 'reps',
        description: 'Curl your legs against resistance'
    },
    calf_raise: {
        type: 'isolation',
        meta: { environment: 'gymhome' },
        muscles: ['calves'],
        unit: 'reps',
        description: 'Raise your heels off the ground'
    },
    lunges: {
        type: 'compound',
        meta: { environment: 'gymhome' },
        muscles: ['quads', 'glutes', 'hamstrings'],
        unit: 'reps',
        description: 'Step forward and lower your body by bending both knees'
    },
    
    // Shoulder exercises
    shoulder_press: {
        type: 'compound',
        meta: { environment: 'gymhome' },
        muscles: ['shoulders', 'triceps'],
        unit: 'reps',
        description: 'Press weight overhead'
    },
    lateral_raise: {
        type: 'isolation',
        meta: { environment: 'gymhome' },
        muscles: ['shoulders'],
        unit: 'reps',
        description: 'Raise weights to the sides until arms are parallel to the floor'
    },
    front_raise: {
        type: 'isolation',
        meta: { environment: 'gymhome' },
        muscles: ['shoulders'],
        unit: 'reps',
        description: 'Raise weights in front of you'
    },
    reverse_fly: {
        type: 'isolation',
        meta: { environment: 'gymhome' },
        muscles: ['shoulders', 'back'],
        unit: 'reps',
        description: 'Bend over and raise weights to the sides'
    },
    shrugs: {
        type: 'isolation',
        meta: { environment: 'gymhome' },
        muscles: ['traps', 'shoulders'],
        unit: 'reps',
        description: 'Lift your shoulders toward your ears'
    },
    
    // Arms exercises
    bicep_curl: {
        type: 'isolation',
        meta: { environment: 'gymhome' },
        muscles: ['biceps'],
        unit: 'reps',
        description: 'Curl weight toward your shoulders'
    },
    hammer_curl: {
        type: 'isolation',
        meta: { environment: 'gymhome' },
        muscles: ['biceps', 'forearms'],
        unit: 'reps',
        description: 'Curl weight with a neutral grip (palms facing each other)'
    },
    tricep_extension: {
        type: 'isolation',
        meta: { environment: 'gymhome' },
        muscles: ['triceps'],
        unit: 'reps',
        description: 'Extend your arms against resistance'
    },
    tricep_pushdown: {
        type: 'isolation',
        meta: { environment: 'gym' },
        muscles: ['triceps'],
        unit: 'reps',
        description: 'Push a cable attachment down with your arms'
    },
    skullcrusher: {
        type: 'isolation',
        meta: { environment: 'gymhome' },
        muscles: ['triceps'],
        unit: 'reps',
        description: 'Lower weight to your forehead while lying down'
    },
    dips: {
        type: 'compound',
        meta: { environment: 'gymhome' },
        muscles: ['triceps', 'chest', 'shoulders'],
        unit: 'reps',
        description: 'Lower and raise your body between parallel bars'
    },
    
    // Core exercises
    crunch: {
        type: 'isolation',
        meta: { environment: 'gymhome' },
        muscles: ['abs'],
        unit: 'reps',
        description: 'Lift your shoulders off the ground'
    },
    plank: {
        type: 'isometric',
        meta: { environment: 'gymhome' },
        muscles: ['abs', 'core'],
        unit: 'time',
        description: 'Hold your body in a straight line from head to heels'
    },
    russian_twist: {
        type: 'isolation',
        meta: { environment: 'gymhome' },
        muscles: ['abs', 'obliques'],
        unit: 'reps',
        description: 'Twist your torso from side to side while seated'
    },
    leg_raise: {
        type: 'isolation',
        meta: { environment: 'gymhome' },
        muscles: ['abs', 'hip flexors'],
        unit: 'reps',
        description: 'Raise your legs while lying on your back'
    },
    mountain_climber: {
        type: 'cardio',
        meta: { environment: 'gymhome' },
        muscles: ['abs', 'core', 'shoulders'],
        unit: 'reps',
        description: 'Alternate bringing your knees to your chest in a plank position'
    }
}; 