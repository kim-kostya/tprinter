import data from "./data";
import { Document, User } from "./data";
import { DownloaderHelper } from 'node-downloader-helper'
import childProcess from 'child_process';

export var items: Document[] = []
export var currentDocument: Document;

export function getAllDocuments(): Document[] {
    return items;
}

export function remove(document: Document | string) {
    if (typeof(document) === 'object') {
        items = items.filter((item: Document) => item.id == document.id)
    } else {
        items = items.filter((item: Document) => item.id == document)
    }
}

export function add(document: Document) {
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
        data.getUser(author, (user: User) => {
            let doc: Document = {
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
    if (process.platform === "linux") {
        childProcess.execSync(`lp ${doc.path}`)
    } else {
        childProcess.execSync(`print ${doc.path}`)
    }
    next()
}

export function next() {
    if (currentDocument) {
        remove(currentDocument)
    }

    currentDocument = items[0]
    print(currentDocument)
}