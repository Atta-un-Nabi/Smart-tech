const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const connectToDatabase = require('./db');

// Connect to the database
connectToDatabase();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());

// Routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/CreateProduct'));
app.use('/api', require('./Routes/CreateCat'));
app.use('/api', require('./Routes/LoadData'));
app.use('/api', require('./Routes/ForgetPass'));
// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Smart Tech is Running on Port ${port}`);
});
