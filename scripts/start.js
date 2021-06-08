const core = require("./scriptslib");

core.cd('./build');
core.execute('npm i -g node-gyp');
core.execute('npm i');
core.execute('node ./index.js');