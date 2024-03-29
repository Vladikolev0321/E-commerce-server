const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db/connectDb');
const cors = require('cors');
const helmet = require('helmet');

const userRouter = require('./routes/users');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');


const app = express();

app.use(helmet());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});