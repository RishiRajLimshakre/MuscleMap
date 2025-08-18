
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config(); //its load env vars
connectDB();

const app = express();
 

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static('../frontend')); 


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html')); 
});

app.use('/api/auth',require('./routes/auth'));
app.use('/api/workouts',require('./routes/workout'));

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});


