const fs = require('fs');
const { execSync } = require('child_process');
const packageJson = require('../../../package.json');

const createResources = () => {
    const currentVersion = packageJson.version;
    const nodeVersion = execSync("node -v").toString();
            const welcomeContent = 
`<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bem-vindo ao AntoineJS</title>
        <link rel="icon" href="favicon.ico">
        <link rel="stylesheet" type="text/css" href="/css/app.css">
    </head>
    <body>
        <div class="container">
            <header>
                <img src="/assets/imgs/logo.png" alt="teste">
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
                        AntoineJS v${currentVersion} | NodeJs ${nodeVersion}
                    </p>
                </div>
            </footer>
        </div>
    </body>
</html>
`

    const appContent = 
`:root {
    --bg-color: #212121;
    --color-primary: #ffd700;
    --font-figtree: Figtree, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}

*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

*::selection {
    background-color: var(--color-primary);
    color: #000;
}

body {
    font-family: var(--font-figtree);
    background: var(--bg-color);
    min-height: 100vh;
}

div.container {
    display: flex;
    flex-direction: column;
    padding: 1.90rem;
    gap: 4rem;
}

header {
    display: flex;
    justify-content: center;
    gap: 2rem;
}

header img {
    width: 3.82rem;
    height: auto;
    user-select: none;
}

.container section {
    display: flex;
    justify-content: center;
}

.box {
    background: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.19); /* Sombra suave */
    padding: 20px; /* Espaçamento interno para o conteúdo */
    border-radius: 8px; /* Bordas arredondadas */
    max-width: 600px; /* Largura máxima */
    padding-bottom: 40px;
}

.box h1 {
    color: #333;
    font-size: 2em;
    text-align: center;
    margin-top: 20px;
}

.box p {
    color: #555;
    font-size: 1.2em;
    text-align: center;
    margin-top: 10px;
}


.footer {
    color: #ffffff;
    text-align: center;
    padding: 20px 0;
    position: fixed;
    width: 100%;
    bottom: 0;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.footer p {
    margin: 0;
    font-size: 14px;
}
`
    fs.writeFileSync('./resources/views/welcome.ejs', welcomeContent);
    fs.writeFileSync('./resources/css/app.css', appContent);
}

module.exports = { createResources };