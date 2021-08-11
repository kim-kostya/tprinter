const core = require("./scriptslib");

const PACKAGE_DIR = './build/debian'

if (process.platform == 'linux'){
    // DEB file structure
    core.mkdir(`${PACKAGE_DIR}`);
    core.mkdir(`${PACKAGE_DIR}/DEBIAN/`);
    core.mkdir(`${PACKAGE_DIR}/lib/`);
    core.mkdir(`${PACKAGE_DIR}/lib/tprinter`);
    core.mkdir(`${PACKAGE_DIR}/etc/`);
    core.mkdir(`${PACKAGE_DIR}/etc/systemd`);
    core.mkdir(`${PACKAGE_DIR}/etc/systemd/system`);

    // Main script
    core.copy('./build/', `${PACKAGE_DIR}/lib/tprinter`);
    core.copy('./tprinter.service', `${PACKAGE_DIR}/etc/systemd/system`);
    core.copy('./debian/control', `${PACKAGE_DIR}/DEBIAN/control`);
    core.mkdir('./build/dist');
    core.execute(`dpkg-deb -b ${PACKAGE_DIR} ./build/dist/tprinter.deb`)

    
}

if (process.platform == 'win32') {

}