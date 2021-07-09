const fs = require("fs");
const childProcess = require('child_process');
const e = require("express");

function tryCreateDir(dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
}

function copyDir(source, destination, blacklist) {
    let fileList = fs.readdirSync(source);
    for (let fileId in fileList) {
        let file = fileList[fileId];
        if (!(file in blacklist)) {
            let sourcePath = `${source}/${file}`;
            let destPath = `${destination}/${file}`;
            if (fs.lstatSync(sourcePath).isDirectory()) {
                tryCreateDir(destPath);
                copyDir(sourcePath, destPath);
            } else {
                console.log(`${sourcePath} -> ${destPath}`);
                fs.copyFileSync(sourcePath, destPath);
            }
        }
    }
}

function readLocalEnvironment() {
    let rawLocalEnvironment = fs.readFileSync('./.env');
    let localEnvironmentPairs = rawLocalEnvironment.split('\n');
    let localEnvironment = {};
    
    localEnvironmentPairs.forEach(env => {
        let buffer = env.split('=');
        localEnvironment[buffer[0]] = buffer[1];
    });

    return localEnvironment;
}

var localEnvironment = readLocalEnvironment();

module.exports = {
    execute: function(command) {
        console.log(`> ${command}`);
        if (process.platform == "win32") {
            try {
                childProcess.execSync(`cmd.exe /C ${command}`, {
                    encoding: "utf8",
                    env: localEnvironment + process.env
                });
            } catch(error) {
                console.error(`${command} was called error.`);
                console.error(error.stderr);
            }
        } else {
            childProcess.execSync(`${command}`, {
                encoding: "utf8"
            });
        }
    },

    copy: function(source, dest) {
        console.log(`> copy ${source} -> ${dest}`)
        if (!fs.existsSync(source)) {
            throw Error(`"${source}" is invalid path`);
        }

        if (fs.lstatSync(source).isDirectory()) {
            tryCreateDir(dest);
            copyDir(source, dest, blacklist);
        } else {
            fs.copyFileSync(source, dest);
        }
    },

    cd: function(path) {
        process.chdir(path);
        console.log(`> cd ${process.cwd()}`);
    },

    mkdir: function(dir) {
        console.log(`> mkdir ${dir}`);
        tryCreateDir(dir);
    }
}