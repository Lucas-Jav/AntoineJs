const fs = require('fs');

const createUserModel = () => {
    fs.writeFileSync('./app/Models/user.js', 
`const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
        isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
`
);
}

module.exports = { createUserModel };