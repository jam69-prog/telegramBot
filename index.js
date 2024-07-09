const TelegramBot = require('node-telegram-bot-api')

const token = '7446642155:AAFaCH96P80HC80AKriUbo3iM_7ZZq20Xow'

const { gameOption, againOption } = require("./options")
const { gameOptions } = require('./option')

const bot = new TelegramBot(token, {polling: true})

const startGame = async chatId => {
    await bot.sendMessage(chatId, `0 dan 9 gacha son o'ylanadi`)
    const randomNumber = Math.floor(Math.random()* 10)
    obj[chatId] = randomNumber;
    await bot.sendMessage(chatId, `sonni top`, gameOptions)
}

const bot_fun = () =>{
    bot.setMyCommands([
        {
            command: "/start", description: "Ishga tushirish"
        },
        {
            command: "/info", description: "malumot beradi"
        },
        {
            command: "/game", description: "O'yini boshlaydi"   
        }
    ])
}
bot.on('message', async (msg) =>{
    console.log(msg); 

    const text = msg.text;
    const chatId  = msg.chat.id

    if(text === "/start"){
        return bot.sendMessage(chatId, `Salom ${msg.from.last_name}`)
    }
    if(text === "/info"){
        return bot.sendMessage(chatId, `sizning userNameingiz ${msg.from.last_name}`)
    }
    if(text === "/game"){
        return bot.sendMessage(chatId, `Hozircha o'yin yoq ${msg.from.last_name}`)
    }
    bot.sendMessage(chatId, "Bunday malumot topilmadi. :(")
})

bot.on('callback_query', msg =>{
    const data = msg .data;
    const chatId = msg.message.chat.id;

    if (data === '/again') {
        return startGame(chatId)
    }
    if (data ===obj[chatId]) {
        return bot.sendMessage(chatId, `Tabriklaymiz ${obj[chatId]}`)
    }
})
bot_fun();