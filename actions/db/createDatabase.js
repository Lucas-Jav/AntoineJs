const { execSync } = require('child_process');


const createDatabase = async () => {
    try {
        const output = execSync('sequelize db:create').toString();
        const lines = output.split('\n').filter(line => line.trim() !== ''); // Remove linhas vazias
        const lastLine = lines[lines.length - 1]; // Pega a última linha não vazia

        // Obtém a hora atual formatada
        const now = new Date();
        const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        // Imprime o cabeçalho, a mensagem e o rodapé em verde
        console.log('\n\x1b[32m============================================');
        console.log(`\n\x1b[32mANTOINEJS [${formattedTime}]`);
        console.log(lastLine);
        console.log('\n\x1b[32m============================================\x1b[0m\n'); // Reseta a cor no final
    } catch (error) {
        // Formatação de hora para o erro
        const now = new Date();
        const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        // Imprime o cabeçalho, a mensagem de erro e o rodapé em vermelho
        console.error('\n\x1b[31m============================================');
        console.error(`\x1b[31mANTOINEJS [${formattedTime}]`);
        console.error(`\x1b[31m${error.message.toString()}`);
        console.log('\x1b[31m============================================\x1b[0m\n'); // Reseta a cor no final

    }
};

module.exports = { createDatabase };
