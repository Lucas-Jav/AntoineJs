const fs = require('fs');

const createDatabaseFile = () => {
    fs.writeFileSync('./config/database.js', 
`const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dialect: process.env.DB_DATABASE || "postgres",
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_DATABASE_NAME || "your-database",
    define: {
        timestamps: true,
    },
};`
    );
};

module.exports = { createDatabaseFile };