# Telegram Printer

Telegram bot for accessing to printer with web panel.

## Build from source

### Requirements

+ Python 2.7
+ Global node-gyp
+ Deb packager (build only)
+ FFMpeg (windows)
+ LibRSVG (windows)

### Instruction

`npm install` - to install dependencies\
`npm build` - compile source\
`npm package` - package to deb file\
Output file './out/tprinter.deb'

## Environment

TPRINTER_PORT = Port \
TPRINTER_BOT_TOKEN = Telegram bot token
