import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tempo: {
    type: String
  },
  rest: {
    type: Number
  },
  reps: {
    type: Number
  },
  muscles: [{
    type: String
  }],
  type: {
    type: String,
    enum: ['compound', 'accessory']
  },
  meta: {
    equipment: {
      type: String
    },
    environment: {
      type: String
    }
  },
  unit: {
    type: String,
    enum: ['reps', 'seconds']
  },
  substitutes: [{
    type: String
  }],
  description: {
    type: String
  }
}, { _id: false });

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    required: true
  },
  muscles: [{
    type: String,
    required: true
  }],
  goal: {
    type: String,
    required: true
  },
  exercises: [exerciseSchema],
  completed: {
    type: Boolean,
    default: false
  }
});

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout; 