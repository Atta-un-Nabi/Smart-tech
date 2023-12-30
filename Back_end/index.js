const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize'); // Import express-mongo-sanitize
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const connectToDatabase = require('./db');

connectToDatabase();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize()); 
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/CreateProduct'));
app.use('/api', require('./Routes/CreateCat'));
app.use('/api', require('./Routes/LoadData'));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Smart Tech is Running on Port ${port}`);
});
