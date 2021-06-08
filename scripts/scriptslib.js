const fs = require("fs");
const childProcess = require('child_process');

module.exports = {
    execute: function(command) {
        console.log(`> ${command}`);
        try {
            childProcess.execSync(`cmd.exe /C ${command}`, {
                encoding: "utf8"
            });
        } catch {
            console.error(`${command} was called error.`)
        }
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