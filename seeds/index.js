const sequelize = require('../config/connection');
const seedBooksData = require('./books');
const seedUserData = require('./user');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUserData();
  await seedBooksData();
  process.exit(0);
};

seedAll();
