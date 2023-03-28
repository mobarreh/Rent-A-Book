const User = require('./User');
const books = require('./books');

books.hasOne(User,
    {
        foreignKey: 'user_id',
    });

module.exports = { User, books};