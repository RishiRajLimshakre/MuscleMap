# MuscleMap

Welcome to **MuscleMap**, your personal gym progress tracker designed to help you log, monitor, and improve your workouts in a simple and efficient way. Whether you’re a beginner or a seasoned fitness enthusiast, MuscleMap keeps your exercise history at your fingertips so you can stay motivated and reach your goals.

***

## Features

- *Workout Logging:* Quickly add exercises, sets, reps, and weights.
- *Progress Tracking:* View your workout history grouped by dates for easy review.
- *User Authentication:* Secure signup and login to keep your data private.
- *Responsive Design:* Accessible and user-friendly across all devices, from desktops to smartphones. 
- *Data Persistence:* Your data is safely stored and retrieved, ensuring nothing is lost.

***

## Getting Started

These instructions will help you set up MuscleMap locally for development and testing purposes.

### Prerequisites

- Node.js (version 16 or above)
- MongoDB database
- Git (optional, but recommended)

### Installation

1. *Clone the repository:*

   ```bash
   git clone https://github.com/yourusername/musclemap.git
   cd musclemap
   ```

2. *Install dependencies:*

   ```bash
   npm install
   ```

3. *Configure environment variables:*

   Create a `.env` file in the root with the following:

   ```
   PORT=7000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. *Run the application:*

   ```bash
   npm start
   ```

5. Open `http://localhost:7000` in your browser to see MuscleMap in action.


## Usage

- Sign Up: Create an account to start saving your workouts.
- Login: Securely sign in to access your workout history.
- Add Workouts: Use the form to log exercises with sets, reps, and weight.
- View and Manage: See your past workouts grouped by date and delete entries as needed.



## Project Structure

- `backend/`: API server built with Node.js and Express.
- `frontend/`: Web client using HTML, CSS, and JavaScript.
- `models/`: Database schemas.
- `routes/`: API endpoints.
- `utils/`: Helper functions like JWT token generation.
- `assets/`: Static assets like images and icons.

## Technologies Used

- Node.js and Express for backend API
- MongoDB for data storage
- JWT for authentication
- JavaScript, HTML, and CSS for frontend
- Render for deployment

## Contributing

I welcome contributions! If you want to help improve MuscleMap, please fork the repository and submit a pull request. Here’s how you can contribute:

- Report issues and bugs.
- Suggest new features or improvements.
- Submit code enhancements or fixes.

## License

This project is licensed under the MIT License — see the LICENSE file for details.

## Acknowledgments

Thanks for stopping by! If you have questions or want to connect, feel free to reach out via GitHub or email.
