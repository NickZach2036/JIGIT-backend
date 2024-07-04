const sequelize = require('./sequelize');
const User = require('./setup-model');

syncDatabase();

async function syncDatabase() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  
      await sequelize.sync({ alter: true });
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }