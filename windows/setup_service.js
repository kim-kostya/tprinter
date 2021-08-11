var Service = require('node-windows').Service;
var path = require('path');

var svc = new Service({
    name:'tprinter',
    description: 'TPrinter server.',
    script: path.resolve('./index.js')
});



svc.on('install',function(){
    svc.start();
});

svc.install();