const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db/connectDb')
const cors = require('cors');

const userRouter = require('./routes/users');
const productRouter = require('./routes/products');


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(userRouter);
app.use(productRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});