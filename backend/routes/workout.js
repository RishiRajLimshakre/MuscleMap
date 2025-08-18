//here's are the CRUD routes for workouts

const express = require("express");
const { addWorkout, getWorkout } = require("../controllers/workoutControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addWorkout);
router.get("/", protect, getWorkout);

module.exports = router;