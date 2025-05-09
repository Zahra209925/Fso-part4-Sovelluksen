const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');

const app = express();

// Yhdistetään MongoDB-tietokantaan
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
    // Käynnistetään palvelin
    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message);
  });

// Middleware
app.use(express.json());
app.use('/api/blogs', blogsRouter);





