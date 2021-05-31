const fs = require("fs");
const childProcess = require('child_process');

module.exports = {
    execute: function(command) {
        console.log(`> ${command}`);
        console.log(childProcess.execSync(command).toString());
    },

    cd: function(path) {
        console.log(`> cd ${path}`)
        process.chdir(path);
    },

    mkdir: function(dir) {
        console.log(`> mkdir ${dir}`);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
    }
}