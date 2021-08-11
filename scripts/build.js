const { readdirSync, readFileSync, writeFileSync } = require("fs");
const core = require("./scriptslib");

const THIRD_PARTY_DIR = './third_party'

core.mkdir('./build');

// Third party builds
core.mkdir('./build/third_party/');
var filelist = readdirSync(THIRD_PARTY_DIR);
for (let filenameId in filelist) {
    let filename = filelist[filenameId]
    let filepath = `${THIRD_PARTY_DIR}/${filename}`;
    console.log(`> building ${filepath}`);

    let data = readFileSync(`${filepath}/manifest.json`);
    let buildConfig = JSON.parse(data);
    
    core.cd('./build/third_party/');
    core.execute(`git clone ${buildConfig.git}`);
    core.cd(`../../`);

    if(process.platform == 'win32') {
        core.copyExact(`${filepath}/windows.sh`, `./build/third_party/${buildConfig.name}/entrypoint.sh`);
        core.copyExact(`./windows/build_tools/Dockerfile`, `./build/third_party/${buildConfig.name}/Dockerfile`);
        core.cd(`./build/third_party/${buildConfig.name}`);
        core.execute('docker build -t tprinterbuild .');
        core.execute('docker run --name tprinter_windows_build -d tprinterbuild');
        core.execute('docker rm tprinter_windows_build');
        core.execute('docker rmi tprinterbuild')
    } else {
        if (process.arch == 'amd64') {
            core.copyExact(`${filepath}/linux_amd64.sh`, `./build/third_party/${buildConfig.name}/entrypoint.sh`);
            core.cd(`./build/third_party/${buildConfig.name}/`);
            core.execute("./entrypoint.sh");
        } else {
            core.copyExact(`${filepath}/linux_arm64.sh`, `./build/third_party/${buildConfig.name}/entrypoint.sh`);
            core.cd(`./build/third_party/${buildConfig.name}/`);
            core.execute("./entrypoint.sh");
        }
    }
    core.cd('../../../');
}

// Server build
core.execute('tsc');

// Webapp build
core.cd('./webapp');
core.execute('npm run build');
core.cd('../');

// Bindle app
core.mkdir('./build/compiled/webapp');
core.copy('./webapp/dist/webapp', './build/compiled/webapp');
core.copy('./package.json', './build/package.json');
core.copy('./package-lock.json', './build/package-lock.json');