const fs = require('fs');

const createIndexHtml = () => {
    fs.writeFileSync('./index.html', 
`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="favicon.ico">
    <link rel="stylesheet" type="text/css" href="/resources/css/app.css">
    <title>My App</title>
</head>

<body>
    <div id="app"></div>
    <script type="module" src="resources/js/main.js"></script>
</body>

</html>
`
);
}

module.exports = { createIndexHtml };
