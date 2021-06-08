const core = require("./scriptslib");

// TS
core.execute('tsc');

// Webapp
core.mkdir('./build/webapp');
if (process.platform === 'win32') {
    core.execute('copy .\\webapp\\* .\\build\\webapp');
    core.execute('copy .\\package*.json .\\build');
} else {
    core.execute('cp -r ./webapp/* ./build/webapp/');
    core.execute('cp ./package*.json ./build/');
}