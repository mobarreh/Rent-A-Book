const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Books extends Model {}

Books.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        reference: {
            model: "user",
            key: "id", // user table id FK
        },
    },
},
{
    sequelize,
    timestamp: false,
    freezeTableName: true,
    underscored: true,
    modelName: "books",
}
);

module.exports = Books;