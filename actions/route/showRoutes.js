const { execSync } = require('child_process');
const path = require('path');
const { consoleAntoine } = require('../../utils/console');
const fs = require('fs');

const routeListAPI = () => {
    const routesPath = path.join(process.cwd(), 'app', 'Console', 'routeListAPI.js');
    fs.access(routesPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('Route list not found!');
        } else {
            if (typeof routeListAPI !== 'undefined') {
                const command = `node ${routesPath}`;
                const returnCommand = execSync(command).toString();
                const coloredCommand = returnCommand.replace(/'([^']*)'/g, "\x1b[32m'$1'\x1b[0m");
                console.log(coloredCommand);
            } else {
                consoleAntoine.alertMessage("Route list not found!")
            }
        }
    });
}

module.exports =  routeListAPI;

