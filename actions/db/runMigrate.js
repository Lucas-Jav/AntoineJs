const { execSync } = require('child_process');
const path = require('path');


const runMigrate = (name, options) => {

    
    let command = `npx sequelize-cli db:migrate`;
    
    // Add more options here if needed

    const response = execSync(command).toString();
}



module.exports = { runMigrate };
