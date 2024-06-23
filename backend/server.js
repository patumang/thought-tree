// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemRoutes = require('./src/routes/itemRoutes');
const tagRoutes = require('./src/routes/tagRoutes');
const sequelize = require('./src/config/database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', itemRoutes);
app.use('/api', tagRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
