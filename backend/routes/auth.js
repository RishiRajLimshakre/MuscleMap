// //here's are my Login & signup routes

const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

module.exports = router; 







// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// const router = express.Router();

// //Signup
// router.post('/signup', async (req,res) => {
//     try{
//         const{name,email,password} = req.body;
//         const existingUser = await User.findOne({email});
//         if(existingUser) return res.status(400).json({message:"User already exits"});

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({name, email, password:hashedPassword});
//         await newUser.save();

//         res.status(201).json({message:"User registered successfully"});
//     } catch (err) {
//         res.status(500).json({error: err.message});
//     }
// });

// //Login
// router.post('/login', async (req,res) => {
//     try {
//         const { email, password} = req.body;
//         const user = await User.findOne({email});
//         if(!isMatch) return res.status(400).json({message:"user not found"});

//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch) return res.status(400).json({message:"Invalid password"});

//         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "1d"});

//         res.json({token});
//     } catch (err) {
//         res.status(500).json({err: err.message});
//     }
// });

// module.exports = router;