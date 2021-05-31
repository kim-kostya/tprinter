const core = require("./scriptslib");

if (process.platform === 'win32') {
    core.execute("rmdir /q /s .\\build");
    core.execute("rmdir /q /s .\\out");
} else {
    core.execute("rm -rf .\\build");
    core.execute("rm -rf .\\out");
}