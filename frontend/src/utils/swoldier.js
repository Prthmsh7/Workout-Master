// Import the exercise data from the dedicated file
import { EXERCISES_DATA } from './exercisesData';

// Export the exercise data directly
export const EXERCISES = EXERCISES_DATA;

// Workout schemes
export const SCHEMES = {
    strength: {
        sets: 5,
        reps: { min: 3, max: 6 },
        rest: 180,
        description: 'Heavy weight, low reps for building maximal strength'
    },
    hypertrophy: {
        sets: 4,
        reps: { min: 8, max: 12 },
        rest: 120,
        description: 'Moderate weight, moderate reps for muscle growth'
    },
    endurance: {
        sets: 3,
        reps: { min: 12, max: 20 },
        rest: 60,
        description: 'Light to moderate weight, high reps for muscle endurance'
    }
};

// Lifting tempos
export const TEMPOS = {
    regular: {
        eccentric: 2,
        pause: 0,
        concentric: 1,
        description: 'Standard tempo (2-0-1)'
    },
    explosive: {
        eccentric: 3,
        pause: 0,
        concentric: 'X',
        description: 'Explosive concentric movement (3-0-X)'
    },
    controlled: {
        eccentric: 3,
        pause: 1,
        concentric: 3,
        description: 'Controlled movement with pause (3-1-3)'
    }
};

// Pre-defined workout templates
export const WORKOUTS = {
    beginner_full_body: {
        name: 'Beginner Full Body',
        exercises: [
            'squat',
            'bench_press',
            'bent_over_row',
            'shoulder_press',
            'bicep_curl',
            'tricep_extension'
        ],
        scheme: 'hypertrophy',
        tempo: 'regular',
        description: 'A balanced full body workout ideal for beginners'
    },
    
    upper_body_focus: {
        name: 'Upper Body Focus',
        exercises: [
            'bench_press',
            'bent_over_row',
            'shoulder_press',
            'lat_pulldown',
            'bicep_curl',
            'tricep_extension'
        ],
        scheme: 'hypertrophy',
        tempo: 'regular',
        description: 'Targets all major upper body muscle groups'
    },
    
    lower_body_focus: {
        name: 'Lower Body Focus',
        exercises: [
            'squat',
            'deadlift',
            'leg_press',
            'leg_extension',
            'leg_curl',
            'calf_raise'
        ],
        scheme: 'hypertrophy',
        tempo: 'regular',
        description: 'Comprehensive workout for legs and lower body'
    }
};

// Simple flat exercise data structure
export const EXERCISES_SIMPLE = {
    barbell_bench_press: {
        type: 'compound',
        meta: {
            environment: 'gym',
            level: [0, 1, 2],
            equipment: ['barbell']
        },
        unit: 'reps',
        muscles: ['chest'],
        description: 'Ensure your scapula are retracted when performing the bench press.'
    },
    pushup: {
        type: 'accessory',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: []
        },
        unit: 'reps',
        muscles: ['chest'],
        description: 'In a plank position, with hands slightly further than shoulder width apart, slowly lower your chest to the ground.'
    },
    dips: {
        type: 'compound',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: []
        },
        unit: 'reps',
        muscles: ['chest', 'triceps'],
        description: 'When in the dip position, ensure you are leaning forward over your hands and slowly lower your body.'
    },
    pullup: {
        type: 'compound',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: []
        },
        unit: 'reps',
        muscles: ['back', 'biceps'],
        description: 'Hands approximately shoulder width or slightly wider apart, start by retracting your scapula down and back.'
    },
    lat_pulldown: {
        type: 'compound',
        meta: {
            environment: 'gym',
            level: [0, 1, 2],
            equipment: []
        },
        unit: 'reps',
        muscles: ['back'],
        description: 'Hands approximately shoulder width or slightly wider apart, start by retracting your scapula down and back.'
    },
    back_squats: {
        type: 'compound',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: ['barbell']
        },
        unit: 'reps',
        muscles: ['quads', 'glutes'],
        description: 'Stand with your feet slightly wider than shoulder width, toes facing 15 degrees out from forward.'
    },
    romanian_deadlifts: {
        type: 'compound',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: []
        },
        unit: 'reps',
        muscles: ['hamstrings', 'glutes'],
        description: 'Stand holding a bar or dumbbells hanging at your waist, hands shoulder width apart.'
    },
    dumbbell_curls: {
        type: 'compound',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: ['dumbbells', 'bands']
        },
        unit: 'reps',
        muscles: ['biceps', 'forearms'],
        description: 'Perform this exercise seated or standing with dumbbells in either hand by your sides.'
    },
    tricep_pushdown: {
        type: 'accessory',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: ['bands']
        },
        unit: 'reps',
        muscles: ['triceps'],
        description: 'Adjust the cable to maximum elevation. Keeping your elbows just in-front of your sides, straighten your arms.'
    },
    seated_dumbbell_press: {
        type: 'compound',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: ['dumbbells']
        },
        unit: 'reps',
        muscles: ['shoulders', 'triceps'],
        description: 'With dumbbells in each hand, begin with the weights in-line with your ears and press them directly up above your head.'
    },
    lateral_raise: {
        type: 'accessory',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: ['dumbbells']
        },
        unit: 'reps',
        muscles: ['shoulders', 'delts'],
        description: 'With dumbbells in each hand, raise the weights up either side of your body.'
    },
    plank: {
        type: 'accessory',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: []
        },
        unit: 'duration',
        muscles: ['abs', 'core'],
        description: 'Make sure your hips are tucked, your bum squeeze, your core tight, flat as a pancake.'
    },
    crunches: {
        type: 'accessory',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: []
        },
        unit: 'reps',
        muscles: ['abs', 'core'],
        description: 'Lying flat on the ground with your knees bent at right angles, crunch your abs.'
    },
    barbell_row: {
        type: 'compound',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: ['barbell']
        },
        unit: 'reps',
        muscles: ['back', 'biceps'],
        description: 'Bend at your hips with a slight knee bend, hold the bar at shoulder width and pull it to your lower chest.'
    },
    bicep_curl: {
        type: 'accessory',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: ['dumbbells', 'bands']
        },
        unit: 'reps',
        muscles: ['biceps', 'forearms'],
        description: 'Hold the weight with an underhand grip and curl it upward toward your shoulder.'
    },
    skull_crusher: {
        type: 'accessory',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: ['dumbbells', 'barbell']
        },
        unit: 'reps',
        muscles: ['triceps'],
        description: 'Lie on a bench, hold the weight above your head, then bend at the elbows to lower it toward your forehead.'
    },
    leg_press: {
        type: 'compound',
        meta: {
            environment: 'gym',
            level: [0, 1, 2],
            equipment: []
        },
        unit: 'reps',
        muscles: ['quads', 'glutes', 'hamstrings'],
        description: 'Sit in the machine, feet shoulder-width apart, and push the platform away by extending your legs.'
    },
    hammer_curl: {
        type: 'accessory',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: ['dumbbells']
        },
        unit: 'reps',
        muscles: ['biceps', 'forearms'],
        description: 'Hold dumbbells with a neutral grip (palms facing each other) and curl them up toward your shoulders.'
    },
    cable_overhead_extension: {
        type: 'accessory',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: ['bands']
        },
        unit: 'reps',
        muscles: ['triceps'],
        description: 'Hold the cable with both hands above your head, then lower it behind your head and extend your arms back up.'
    },
    dumbell_kickback: {
        type: 'accessory',
        meta: {
            environment: 'gymhome',
            level: [0, 1, 2],
            equipment: ['dumbbells']
        },
        unit: 'reps',
        muscles: ['triceps'],
        description: 'Bend at the waist with one arm supporting you, hold a dumbbell with your other hand and extend it backward.'
    }
}

//write a function that flattens this thing with all the variants
//if athome, then have to specify equipment (if required otherwise bodyweight)
//add instructions for substitutions (at home substitutions) for weights etc
//variant is just going to be gym (forget about home stuff as long as one of the variants is
//make it so that you can't get the same varient in a single workout (maybe)
//add all the other variants to the subsubstitute list
//pick a random exercise
//for non-members, exclude all the at home specific exercises (anything particularly pussy like a lot of the bodyweight stuff)

const bw_exercises = {

}

//info page
//tempos
//rep ranges
//warmup