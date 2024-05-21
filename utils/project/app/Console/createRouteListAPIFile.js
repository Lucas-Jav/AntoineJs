const fs = require('fs');

const createRouteListAPIFile = () => {
    fs.writeFileSync('./app/Console/routeListAPI.js', 
`const listEndpoints = require('express-list-endpoints');
const app = require('../../config/app');


const showRoutes = () => {
    const endPoints = listEndpoints(app);
    
    console.log(endPoints);
    return;
}

showRoutes();`
);


}

module.exports = { createRouteListAPIFile };
