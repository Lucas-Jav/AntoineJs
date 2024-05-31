const fs = require('fs');

const createMainJS = () => {
    fs.writeFileSync('./resources/js/main.js', 
`import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
`
);
}

module.exports = { createMainJS };
