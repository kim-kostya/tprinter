@ECHO off

npm install
npm install node-windows
node ./setup_service.js

sc config tprinter start=auto