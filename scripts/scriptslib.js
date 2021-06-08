const fs = require("fs");
const childProcess = require('child_process');
const e = require("express");

module.exports = {
    execute: function(command) {
        console.log(`> ${command}`);
        if (process.platform == "win32") {
            try {
                childProcess.execSync(`cmd.exe /C ${command}`, {
                    encoding: "utf8"
                });
            } catch {
                console.error(`${command} was called error.`)
            }
        } else {
            childProcess.execSync(`${command}`, {
                encoding: "utf8"
            });
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