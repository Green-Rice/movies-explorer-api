require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const { PORT = 3000, NODE_ENV, DATA_BASE_URL } = process.env;

const app = express();
mongoose.connect(
  NODE_ENV === 'production'
    ? DATA_BASE_URL
    : 'mongodb://localhost:27017/bitfilmsdb',
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});