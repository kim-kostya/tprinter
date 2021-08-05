import {Telegraf} from 'telegraf'
import {download} from './queue'
import User from './entities/User'
import data from './data'

import sync from 'synchronized-promise'

const bot = new Telegraf(process.env.TPRINTER_BOT_TOKEN ? process.env.TPRINTER_BOT_TOKEN : '')

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

var userRepository = data.getRepository(User);

function help_message(ctx: any) {
    ctx.reply("This is help message")
}

bot.command("start", (ctx) => help_message(ctx))
bot.command("help", (ctx) => help_message(ctx))

bot.on('document', (ctx) => {
    let file_id = ctx.message.document.file_id
    let file_name = ctx.message.document.file_name
    ctx.telegram.getFileLink(file_id).then(url => {
        download(url.href, `${file_id}_${file_name}`, ctx.from.id, file_id, ctx)
    })
})

bot.on('message', (ctx) => {
    let message_author = ctx.message.from;

    if (sync(userRepository.find)({id: message_author.id}).length === 0) {
        userRepository.save({id: message_author.id, privileges: []} as User)
    }
})

export default  {
    async launch() {
        await bot.launch()
    },

    sendMessage(message: string, receiver: User) {
        bot.telegram.sendMessage(receiver.id, message)
    }
}