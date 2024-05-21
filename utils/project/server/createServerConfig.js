const fs = require('fs');

const createIndexJsServer = () => {
    fs.writeFileSync('./index.js', 
`const app = require("./config/app");

// Server setup
const PORT = 3000;

app.listen(PORT, () => {
    const message = "Server running on [http://localhost:" + PORT + "].";
    const topBottomBorder = '='.repeat(message.length + 8); // Ajuste o número para criar uma borda
    console.log("\\n" + topBottomBorder + "\\n");
    console.log('\x1b[43m INFO \x1b[0m '  + message ); // Cor de fundo azul
    console.log("\\n" + topBottomBorder + "\\n");

    console.log('\x1b[33m' + 'Press Ctrl+C to stop the server' + '\x1b[0m\\n');
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log('Port ' + PORT + ' is already in use, trying port ' + (PORT + 1) + '...');
        app.listen(PORT + 1);
    } else {
        console.error(err);
    }
});
`
);


}

module.exports = { createIndexJsServer };
