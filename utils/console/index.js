const { execSync } = require('child_process');
const packageJson = require('../../package.json'); // Import package.json to access the version

const consoleAntoine = {
    now: new Date(),
    get formattedTime() {
        return this.now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    },
    errorMessage: function(msg) {
        // Imprime o cabeçalho, a mensagem de erro e o rodapé em vermelho
        console.error('\n\x1b[31m============================================');
        console.error(`\n\x1b[31mANTOINEJS [${this.formattedTime}]`);
        console.error(`\x1b[31m${msg}`);
        console.log('\x1b[31m============================================\x1b[0m\n'); // Reseta a cor no final
    },
    successMessage: function(msg) {
        // Imprime o cabeçalho, a mensagem e o rodapé em verde
        console.log('\n\x1b[32m============================================');
        console.log(`\n\x1b[32mANTOINEJS [${this.formattedTime}]`);
        console.log(`\x1b[32m${msg}`);
        console.log('\n\x1b[32m============================================\x1b[0m\n'); // Reseta a cor no final
    },
    alertMessage: function(msg) {
        // Imprime o cabeçalho, a mensagem e o rodapé em amarelo
        console.log('\n\x1b[33m============================================');
        console.log(`\n\x1b[33mANTOINEJS [${this.formattedTime}]`);
        console.log(`\x1b[33m${msg}`);
        console.log('\n\x1b[33m============================================\x1b[0m\n'); // Reseta a cor no final
    },
    checkForUpdates: async function () {
        // verifica a versão do projeto se está atualizado
        try {
            const currentVersion = packageJson.version;
            const latestVersion = execSync("npm view antoinejs version").toString().trim();
            if (currentVersion !== latestVersion) {
                this.alertMessage(`Update available: ${latestVersion}. You are currently on ${currentVersion}. \nRun "npm update -g antoinejs" to update.`);
            }
        } catch (error) {
            console.error('Failed to check for updates:', error);
        }
    }
};


module.exports = { consoleAntoine };
