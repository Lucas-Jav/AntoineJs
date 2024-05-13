const fs = require('fs');

const createResources = () => {
    const welcomeContent = 
`<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao AntoineJS</title>
    <link rel="stylesheet" type="text/css" href="/css/app.css">
</head>
<body>
    <div class="welcome-container">
        <h1>Bem-vindo ao AntoineJS!</h1>
        <p>Este é o seu novo framework favorito para desenvolvimento full-stack.</p>
    </div>
</body>
</html>
`

    const appContent = 
`body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.welcome-container {
    text-align: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
}

p {
    color: #666;
}
`
    fs.writeFileSync('./resources/views/welcome.ejs', welcomeContent);
    fs.writeFileSync('./resources/css/app.css', appContent);
}

module.exports = { createResources };