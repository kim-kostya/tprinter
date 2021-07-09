import express, { json } from 'express'
import { readFile } from 'fs'
import { getAllDocuments, remove, add, download } from './queue'
import { data } from './data';
import fileUpload from 'express-fileupload'

const app = express()

app.use(express.static('./webapp'))
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/tprinter/web',
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
    req.files.document;
})


app.get('*', (req, res) => {
    res.status(200).sendFile('webapp/index.html')
})

export namespace web {
    export function launch() {
        app.listen(process.env.TPRINTER_PORT)
    }
}