const express = require('express');

const router = require('./routes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'OK',
    data: { status: 'healthy' }
  });
});

app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;