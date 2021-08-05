import core from './scriptslib';

// DEB file structure
core.mkdir('./debian');
core.mkdir('./debian/lib');
core.mkdir('./debian/etc');
core.mkdir('./debian/etc/systemd');
core.mkdir('./debian/etc/systemd/system');

// Main script
core.copy('./build/', './debian/lib');
core.copy('./tprinter.service', './debian/etc/systemd/system');
core.copy('./deb/', './debian');
core.mkdir('./out');
core.execute('dpkg-deb --build ./out/tprinter.deb')