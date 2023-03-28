const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class User extends Model {
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

User.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    email: {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
    }
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }},

{
    hooks: {
        async beforeCreate (userData)=>{
            userData.password = await bcrypt.hash(userData.password,10)
            return userData
        }
    },
    sequelize,   
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
}});

module.exports= User;