# Workout Master

A full-stack workout generator and tracker application to help you reach your fitness goals.

## Features

- **User Authentication**: Create accounts, log in, and manage your personal profile
- **Workout Generator**: Create custom workouts based on muscle groups and fitness goals
- **Workout History**: Track your completed workouts and see your progress
- **Profile Management**: Update your personal information and fitness level
- **Dark Mode**: Toggle between light and dark themes

## Technology Stack

### Frontend
- React
- Tailwind CSS
- Axios for API communication
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/workout-master.git
   cd workout-master
   ```

2. Install backend dependencies
   ```
   npm install
   ```

3. Install frontend dependencies
   ```
   cd frontend
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/workout-master
   JWT_SECRET=yoursecretkey
   NODE_ENV=development
   ```

   * Replace `yoursecretkey` with a secure random string
   * If using MongoDB Atlas, replace the MONGODB_URI with your connection string

### Running the Application

1. Start the backend server
   ```
   npm run server
   ```

2. In a separate terminal, start the frontend
   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

Alternatively, run both frontend and backend with one command:
```
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Log in
- `POST /api/users/logout` - Log out
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Workouts
- `POST /api/workouts` - Create a new workout
- `GET /api/workouts` - Get all user workouts
- `GET /api/workouts/:id` - Get a specific workout
- `PUT /api/workouts/:id/complete` - Mark workout as completed
- `DELETE /api/workouts/:id` - Delete a workout

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Built with ❤️ by Prathmesh</p>
</div>
