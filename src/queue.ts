import data from "./data";
import Document from "./entities/Document";
import sync from 'synchronized-promise'
import User from "./entities/User";
import { DownloaderHelper } from 'node-downloader-helper'
import childProcess from 'child_process';
import { unlinkSync } from "fs";

var documentRepository = data.getRepository(Document)
var userRepository = data.getRepository(User)

var currentDocument: Document;

export function getAllDocuments(): Document[] {
    return sync(documentRepository.find)();
}

export function remove(document: Document | string) {
    if (typeof(document) === 'object') {
        documentRepository.delete({id: document.id})
        unlinkSync(document.path)
    } else {
        let docEntity = sync(documentRepository.findOne)({id: document})
        documentRepository.delete({id: document})
        if (docEntity) {
            unlinkSync(docEntity.path)
        }
    }
}

export function add(document: Document) {
    documentRepository.save(document);
}

export async function download(url: string, name: string, author: number, id: string, ctx: any) {
    let filePath = ''
    if (process.platform === 'win32') {
        filePath = `${process.env.TMP}/telegramprinter/${name}`
    } else {
        filePath = `/tmp/telegramprinter/${name}`
    }

    const dh = new DownloaderHelper(url, filePath)
    dh.on('end', () => {
        let user: User | undefined = sync(userRepository.findOne)({id: author})
        let doc = {
            id: id,
            author: user,
            path: filePath
        } as Document
        documentRepository.save(doc)

        console.debug(`File ${name} added to queue`)
        ctx.reply(`File ${name} added to queue`)
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

    currentDocument = getAllDocuments()[0]
    print(currentDocument)
}