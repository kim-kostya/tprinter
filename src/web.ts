import express from 'express'
import { readFile } from 'fs'

const app = express()

app.get('/', (req, res) => {
    readFile('./webapp/index.html', (err, data) => {
        res.send(data)
    })
})

app.post('/settings', (req, res) => {
    res.status(200)
})

export namespace web {
    export function launch() {
        app.listen(process.env.TPRINTER_PORT)
    }
}