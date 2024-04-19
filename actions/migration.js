const { execSync } = require('child_process');
const path = require('path');


const createMigrationFile = (name) => {
    const migrationPath = path.join(process.cwd(), 'database', 'migrations');
    execSync(`npx sequelize-cli migration:create --name=${name} --migrations-path=${migrationPath}`);
}



module.exports = { createMigrationFile };
