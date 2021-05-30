import { data } from "./data";
import { DownloaderHelper } from 'node-downloader-helper'
import printer from 'node-printer'

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

export async function print(doc: Document) {
    
}

export function next() {
    if (currentDocument) {
        remove(currentDocument)
    }

    currentDocument = items[0]
}