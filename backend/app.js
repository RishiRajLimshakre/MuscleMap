const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static('../frontend')); 



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html')); 
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server Started!: ${PORT}`);
});


