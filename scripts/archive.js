const { existsSync, mkdirSync } = require('fs');
const path = require('path');
const os = require("os");
const NodeJSZip = require('nodeJs-zip');

if (!existsSync('./build')) {
    console.error('Build files not found.');
    exit(1);
}

if (!existsSync('./out')) {
    mkdirSync('./out');
}

var filter = function(e){
    return e.name !== 'node_modules';
};

NodeJSZip.zip(path.resolve('./build/*'),{
            name : "build",
            dir : "./out",
            filter : true
},filter);