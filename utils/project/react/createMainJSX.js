const fs = require('fs');

const createMainJSX = () => {
    fs.writeFileSync('./resources/js/main.jsx', 
`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
`
);
}

module.exports = { createMainJSX };
