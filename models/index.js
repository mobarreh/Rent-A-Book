const User = require('./User');
const Books = require('./Books');

    // Define a Driver as having many Cars, thus creating a foreign key in the `car` table
    User.hasMany(Books, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  
  // The association can also be created from the Car side
  Books.belongsTo(User, {
    foreignKey: 'user_id',
  });

module.exports = { User, Books};