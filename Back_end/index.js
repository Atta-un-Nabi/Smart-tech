const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const app = express();
const port = 4000;
const connectToDatabase = require('./db');

connectToDatabase();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 100, 
});
app.use('/api', limiter);

app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/CreateProduct'));
app.use('/api', require('./Routes/CreateCat'));
app.use('/api', require('./Routes/LoadData'));
app.use('/api', require('./Routes/ForgetPass'));

app.get('/', (req, res) => {
  res.send('Smart Tech is available');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Smart Tech is Running on Port ${port}`);
});

