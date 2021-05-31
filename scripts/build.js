const core = require("./scriptslib");

core.execute('tsc');
core.mkdir('./build/webapp');
if (process.platform === 'win32') {
    core.execute('copy .\\webapp\\* .\\build\\webapp');
    core.execute('copy .\\package*.json .\\build');
} else {
    core.execute('cp -r ./webapp/* ./build/webapp/');
    core.execute('cp ./package*.json ./build/');
}