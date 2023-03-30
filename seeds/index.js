const sequelize = require('../config/connection');
const seedBooksData = require('./books');
const seedUserData = require('./user');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedBooksData();
  await seedUserData();
  process.exit(0);
};

seedAll();
