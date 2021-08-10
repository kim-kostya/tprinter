import express from 'express'
import fileUpload from 'express-fileupload'

import { getAllDocuments, remove, add } from './queue'
import data from './data';

import Document from './entities/Document';
import User from './entities/User';

const userRepository = data.getRepository(User)

const app = express()

const webUser = new User();

app.use(express.static('./webapp'))
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: `${data.TEMP_DIR}/web`,
    safeFileNames: true
}))

app.get('/jobs', (req, res) => {
    res.send(getAllDocuments())
})

app.post('/remove/:id', (req, res) => {
    remove(req.params.id)
    res.sendStatus(200)
})

app.post('/add', (req: any, res) => {
    let file: fileUpload.UploadedFile = req.files.document;

    let doc = new Document()
    doc.author = webUser;
    doc.path = file.tempFilePath

    add(doc)
    res.sendStatus(200)
})


app.get('*', (req, res) => {
    res.status(200).sendFile('webapp/index.html')
})

export namespace web {
    export async function launch() {
        webUser.id = -1
        webUser.nickname = "WEB"
        webUser.privileges = []

        if (!userRepository.hasId(webUser)) {
            userRepository.save(webUser)
        }

        app.listen(process.env.TPRINTER_PORT)
    }
}