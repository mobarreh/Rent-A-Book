const User = require('./User');
const Books = require('./Books');

Books.hasOne(User,
    {
        foreignKey: 'user_id',
        targetKey: 'user_id',
    });

module.exports = { User, Books};