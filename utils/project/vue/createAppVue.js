const fs = require('fs');
const { execSync } = require('child_process');
const packageJson = require('../../../package.json');

const createAppVue = () => {
    const currentVersion = packageJson.version;
    const nodeVersion = execSync("node -v").toString();

    fs.writeFileSync('./resources/js/App.vue', 
`<script setup>
console.log("Bem vindo!");
</script>

<template>
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
                AntoineJS v${currentVersion} | NodeJs ${nodeVersion} | Vue v3
            </p>
        </div>
    </footer>
</div>
</template>`
);
}

module.exports = { createAppVue };
