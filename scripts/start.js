const core = require("./scriptslib");

core.copy('./build', './debug');
core.cd('./debug');
core.execute('npm i -g node-gyp');
core.execute('npm i');
core.execute('node ./index.js');