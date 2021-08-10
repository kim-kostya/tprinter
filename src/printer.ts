import data from "./data";

import fs from 'fs';
import docxConverter from 'docx-pdf';
import sync from 'synchronized-promise';
import np from 'printer'
import childProcess from 'child_process';

const TEMP_FOLDER = `${data.TEMP_DIR}/toprint`

function ffmpeg(src: string, dest: string) {
    if (process.platform == 'win32') {
        childProcess.execFileSync('./ffmpeg.exe', ['-i', src, dest])
    } else {
        childProcess.execSync(`ffmpeg -i "${src}" "${dest}"`)
    }
}

function processDocx(path: string) {
    path = path.replace('\\', '/')
    let filename = path.split('/').pop()
    let filepath = `${TEMP_FOLDER}/${filename}.pdf`

    docxConverter(path, filepath)
    processPdf(filepath)
    fs.rmSync(filepath)
}

function processPdf(path: string) {
    let data = fs.readFileSync(path)

    np.printDirect({
        data: data,
        type: "PDF"
    })
}

function processImage(path: string) {
    path = path.replace('\\', '/')
    let filename = path.split('/').pop()
    let filepath = `${TEMP_FOLDER}/${filename}.jpeg`

    ffmpeg(path, filepath)
    processJpeg(filepath)
    fs.rmSync(filepath)
}

function processJpeg(path: string) {
    let data = fs.readFileSync(path)

    np.printDirect({
        data: data,
        type: "JPEG"
    })
}

function processText(path: string) {
    let data = fs.readFileSync(path)

    np.printDirect({
        data: data,
        type: "TEXT"
    })
}

function processRaw(path: string) {
    let data = fs.readFileSync(path)

    np.printDirect({
        data: data,
        type: "RAW"
    })
}

const FILE_TYPES: any = {
    "docx": processDocx,
    "doc": processDocx,
    "pdf": processPdf,
    "txt": processText,
    "jpg": processJpeg,
    "svg": processImage,
    "jpeg": processJpeg,
    "raw": processRaw
}

export default {
    printFile(path: string) {
        path = path.replace('\\', '/')
        let filename = path.split('/').pop()
        let filetype = filename?.split('.').pop()
        filetype = filetype ? filetype : "raw"

        FILE_TYPES[filetype](path)
    }
}