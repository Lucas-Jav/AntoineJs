const fs = require('fs');
const { execSync } = require('child_process');
const packageJson = require('../../../package.json');

const createAppJSX = () => {
    const currentVersion = packageJson.version;
    const nodeVersion = execSync("node -v").toString();

    fs.writeFileSync('./resources/js/app.jsx', 
`import React from 'react';

function App() {
    return (
        <div class="container">
        <header>
            <img src="/assets/imgs/logo.png" alt="teste" />
            <img src="/assets/imgs/react-logo.png" alt="teste" />
        </header>
        <section>
            <div class="box">
                <h1>Bem-vindo ao AntoineJS!</h1>
                <p>Este é o seu primeiro projeto em AntoineJS. Aproveite para explorar e construir algo incrível!</p>
            </div>
        </section>
        <footer class="footer">
            <div class="footer-content">
                <p>
                    AntoineJS v${currentVersion} | NodeJs ${nodeVersion} | ReactJs v18.3.1

                </p>
            </div>
        </footer>
        </div>
    );
}

export default App;
`
);
}

module.exports = { createAppJSX };
