const { execSync } = require('child_process');
const path = require('path');


const createMigrationFile = (name, options) => {
    const customMigrationPath = options.migrationPath;
    const migrationPath = customMigrationPath ? path.join(process.cwd(), 'database', 'migrations', customMigrationPath) : null;
    
    let command = `npx sequelize-cli migration:create --name=${name}`;
    if (migrationPath) {
        command += ` --migrations-path=${migrationPath}`;
    }
    
    // Add more options here if needed
    
    execSync(command);
}



module.exports = { createMigrationFile };
