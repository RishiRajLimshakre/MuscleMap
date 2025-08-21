// User Schema/ model
const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema ({
    name: String,
    sets: Number, 
    reps: Number,
    weight: Number,
}, {_id: false});

const workoutSchema = new mongoose.Schema({
    date: {type:String, require:true}, //it will store date in dd-mm-yy format 
    exercises: [exerciseSchema] 
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  workouts: [workoutSchema]
}); 

module.exports = mongoose.model("User", UserSchema);