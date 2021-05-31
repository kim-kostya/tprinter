import { data } from "./data";
import { telegram } from "./telegram";
import { DownloaderHelper } from 'node-downloader-helper'
import printer from 'printer'
import index from './index'

export var items: data.Document[] = []
export var currentDocument: data.Document;

function remove(document: data.Document) {
    items = items.filter((item: data.Document) => item.id == document.id)
}

export function add(document: data.Document) {
    items.push(document);
}

export async function download(url: string, name: string, author: number, id: string, callback: Function) {
    let filePath = ''
    if (process.platform === 'win32') {
        filePath = `${process.env.TMP}/telegramprinter/${name}`
    } else {
        filePath = `/tmp/telegramprinter/${name}`
    }

    const dh = new DownloaderHelper(url, filePath)
    dh.on('end', () => {
        data.getUser(author, (user: data.User) => {
            let doc: data.Document = {
                'id': id,
                'author': user,
                'path': filePath
            }

            add(doc)
            callback()
        })
    })
}

export async function print(doc: data.Document) {
    let options: printer.PrintFileOptions = {
        filename: doc.path,
        printer: index.CURRENT_PRINTER,
        success: function(jobId: string) {
            console.debug(`Job ${jobId} finished`)
            next()
        },
        error: function() {
            console.error(`Cannot print file ${doc.id} in ${doc.path}`)
            telegram.sendMessage(`Cannot your file ${doc.id}`, doc.author)
        }
    }
    printer.printFile(options)
}

export function next() {
    if (currentDocument) {
        remove(currentDocument)
    }

    currentDocument = items[0]
    print(currentDocument)
}