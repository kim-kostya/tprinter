const core = require("./scriptslib");

core.cd('./build')
core.execute('node ./index.spec.js')