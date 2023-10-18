require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorMiddleware = require('./middlewares/error');
const limiter = require('./middlewares/limiter');

const { PORT = 3000, NODE_ENV, DATA_BASE_URL } = process.env;

const app = express();
mongoose.connect(
  NODE_ENV === 'production'
    ? DATA_BASE_URL
    : 'mongodb://127.0.0.1:27017/bitfilmsdb',
);

app.use(cors());

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);
app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
