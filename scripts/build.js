const core = require("./scriptslib");

// Server build
core.execute('tsc');

// Webapp build
core.cd('./webapp');
core.execute('npm install');
core.execute('npm build');
core.cd('../');

// Bindle app
core.mkdir('./build/webapp');
core.copy('./webapp/dist/webapp', './build/webapp');
core.copy('./package.json', './build/package.json');
core.copy('./package-lock.json', './build/package-lock.json');