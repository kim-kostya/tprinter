import {Telegraf} from 'telegraf'
import {download} from './queue'
import { data } from './data'

const bot = new Telegraf(process.env.TPRINTER_BOT_TOKEN ? process.env.TPRINTER_BOT_TOKEN : '')

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

bot.on('document', (ctx) => {
    let file_id = ctx.message.document.file_id
    let file_name = ctx.message.document.file_name
    ctx.telegram.getFileLink(file_id).then(url => {
        download(url.href, `${file_id}_${file_name}`, ctx.from.id, file_id, () => {
            console.debug(`File ${file_name} added to queue`)
            ctx.reply(`File ${file_name} added to queue`)
        })
    })
})

export default  {
    launch() {
        bot.launch()
    },

    sendMessage(message: string, receiver: data.User) {
        bot.telegram.sendMessage(receiver.id, message)
    }
}