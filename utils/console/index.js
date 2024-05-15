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
    }
};


module.exports = { consoleAntoine };
