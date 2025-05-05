import Workout from '../models/workoutModel.js';
import User from '../models/userModel.js';

// @desc    Create a new workout
// @route   POST /api/workouts
// @access  Private
export const createWorkout = async (req, res) => {
  try {
    const { type, muscles, goal, exercises } = req.body;

    const workout = await Workout.create({
      user: req.user._id,
      type,
      muscles,
      goal,
      exercises,
      date: new Date(),
      completed: false
    });

    res.status(201).json({
      success: true,
      data: workout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all workouts for logged in user
// @route   GET /api/workouts
// @access  Private
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get a single workout
// @route   GET /api/workouts/:id
// @access  Private
export const getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }

    // Make sure user owns the workout
    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'User not authorized to access this workout'
      });
    }

    res.status(200).json({
      success: true,
      data: workout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update workout to completed
// @route   PUT /api/workouts/:id/complete
// @access  Private
export const completeWorkout = async (req, res) => {
  try {
    let workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }

    // Make sure user owns the workout
    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'User not authorized to update this workout'
      });
    }

    // Update workout to completed
    workout.completed = true;
    await workout.save();

    // Update user profile
    const user = await User.findById(req.user._id);
    
    // Logic for streak calculation
    const lastWorkoutDate = user.profile.lastWorkout ? new Date(user.profile.lastWorkout) : null;
    const currentDate = new Date();
    
    // Check if last workout was yesterday or today
    let streakContinues = false;
    if (lastWorkoutDate) {
      const timeDiff = Math.abs(currentDate - lastWorkoutDate);
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      streakContinues = daysDiff <= 1;
    }
    
    user.profile.workoutsCompleted += 1;
    user.profile.lastWorkout = currentDate;
    
    if (streakContinues) {
      user.profile.streak += 1;
    } else {
      user.profile.streak = 1; // Reset streak if broken
    }
    
    await user.save();

    res.status(200).json({
      success: true,
      data: workout,
      user: {
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }

    // Make sure user owns the workout
    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'User not authorized to delete this workout'
      });
    }

    await workout.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 