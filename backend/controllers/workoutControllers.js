const User = require("../models/user");

// Helper function to format date as dd-MMM-yyyy 
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Add Workout 
exports.addWorkout = async (req, res) => {
    try {
        const { name, sets, reps, weight } = req.body;
        const user = await User.findById(req.user._id);

        const today = formatDate(new Date());

        let todayWorkout = user.workouts.find(workout => workout.date === today);
        if (todayWorkout) {
            // Add to today's workout
            todayWorkout.exercises.push({ name, sets, reps, weight });
        } else {
            // Create new workout entry for today
            user.workouts.push({
                date: today,
                exercises: [{ name, sets, reps, weight }]
            });
        } 

        await user.save();
        res.status(201).json(user.workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all workouts
exports.getWorkout = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // Ensure all workout dates are returned in the same dd-MMM-yyyy format
        const formattedWorkouts = user.workouts.map(workout => ({
            ...workout.toObject(),
            date: formatDate(new Date(workout.date))
        }));

        res.json(formattedWorkouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


