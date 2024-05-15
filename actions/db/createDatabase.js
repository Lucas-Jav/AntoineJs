const { execSync } = require('child_process');
const { consoleAntoine } = require('../../utils/console');


const createDatabase = async () => {
    try {
        const output = execSync('sequelize db:create').toString();
        const lines = output.split('\n').filter(line => line.trim() !== ''); // Remove linhas vazias
        const lastLine = lines[lines.length - 1]; // Pega a última linha não vazia

        consoleAntoine.successMessage(lastLine);
    } catch (error) {
        consoleAntoine.errorMessage(error.message.toString());
    }
};

module.exports = { createDatabase };
