import axios from 'axios';

// Enable mock mode for development (set to false when backend is ready)
const MOCK_MODE = true;

// Initialize mock data from localStorage if available
const initializeMockData = () => {
  try {
    const savedData = localStorage.getItem('workout-master-mock-data');
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Error loading mock data from localStorage:', error);
  }
  
  // Default mock data
  return {
    workouts: [],
    profile: {
      name: 'Demo User',
      email: 'demo@example.com',
      preferences: {
        darkMode: true,
        units: 'metric'
      }
    }
  };
};

// Mock data for development
const MOCK_DATA = initializeMockData();

// Helper to save mock data to localStorage
const saveMockData = () => {
  try {
    localStorage.setItem('workout-master-mock-data', JSON.stringify(MOCK_DATA));
    console.log('Saved mock data to localStorage:', MOCK_DATA);
  } catch (error) {
    console.error('Error saving mock data to localStorage:', error);
  }
};

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include Clerk token for authenticated requests
api.interceptors.request.use(async (config) => {
  try {
    // Try to get the token from localStorage (set by our custom function in App.jsx)
    const token = localStorage.getItem('clerk-token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  } catch (error) {
    console.error('Error setting auth token:', error);
    return config;
  }
}, (error) => {
  return Promise.reject(error);
});

// Authentication API calls
// These are now handled by Clerk directly, but we'll keep these for reference
// and modify them to work with Clerk if we need server-side validation

export const getUserProfile = async () => {
  if (MOCK_MODE) {
    return { success: true, data: MOCK_DATA.profile };
  }
  
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const updateUserProfile = async (userData) => {
  if (MOCK_MODE) {
    MOCK_DATA.profile = { ...MOCK_DATA.profile, ...userData };
    saveMockData();
    return { success: true, data: MOCK_DATA.profile };
  }
  
  try {
    const response = await api.put('/users/profile', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Workout API calls
export const createWorkout = async (workoutData) => {
  if (MOCK_MODE) {
    const newWorkout = {
      _id: `mock-${Date.now()}`,
      ...workoutData,
      createdAt: new Date().toISOString(),
      completed: false
    };
    MOCK_DATA.workouts.push(newWorkout);
    saveMockData();
    console.log('Created new workout in mock mode:', newWorkout);
    return { success: true, data: newWorkout };
  }
  
  try {
    const response = await api.post('/workouts', workoutData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const getWorkouts = async () => {
  if (MOCK_MODE) {
    console.log('Getting workouts from mock data:', MOCK_DATA.workouts);
    return { success: true, data: MOCK_DATA.workouts };
  }
  
  try {
    const response = await api.get('/workouts');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const getWorkout = async (id) => {
  if (MOCK_MODE) {
    const workout = MOCK_DATA.workouts.find(w => w._id === id);
    if (workout) {
      return { success: true, data: workout };
    }
    throw { success: false, message: 'Workout not found' };
  }
  
  try {
    const response = await api.get(`/workouts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const completeWorkout = async (id) => {
  if (MOCK_MODE) {
    const workoutIndex = MOCK_DATA.workouts.findIndex(w => w._id === id);
    if (workoutIndex !== -1) {
      MOCK_DATA.workouts[workoutIndex].completed = true;
      MOCK_DATA.workouts[workoutIndex].completedAt = new Date().toISOString();
      saveMockData();
      console.log('Completed workout in mock mode:', MOCK_DATA.workouts[workoutIndex]);
      return { success: true, data: MOCK_DATA.workouts[workoutIndex] };
    }
    throw { success: false, message: 'Workout not found' };
  }
  
  try {
    const response = await api.put(`/workouts/${id}/complete`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const deleteWorkout = async (id) => {
  if (MOCK_MODE) {
    const workoutIndex = MOCK_DATA.workouts.findIndex(w => w._id === id);
    if (workoutIndex !== -1) {
      const deletedWorkout = MOCK_DATA.workouts.splice(workoutIndex, 1)[0];
      saveMockData();
      console.log('Deleted workout in mock mode:', deletedWorkout);
      return { success: true };
    }
    throw { success: false, message: 'Workout not found' };
  }
  
  try {
    const response = await api.delete(`/workouts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
}; 