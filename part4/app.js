const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

logger.info('connecting to', config.MONGODB_URL);

mongoose
	.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message);
	});

app.use(cors());

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
