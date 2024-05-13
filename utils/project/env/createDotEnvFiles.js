const fs = require('fs');

const createDotEnvFiles = () => {
    const envContent = 
`DB_DATABASE=postgres
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=123456
DB_DATABASE_NAME=Antoinejs
`
    fs.writeFileSync('./.env', envContent);
    fs.writeFileSync('./.env.example', envContent);
};

module.exports = { createDotEnvFiles };