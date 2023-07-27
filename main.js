const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
    host: '3x3cvte.aternos.me',
    port:'11998',
    username: '3x3cvte_bot',
    version: '1.20.1'
})


bot.on('chat', async (username, message) =>{
    if (username === bot.username) return

    bot.chat(message)
})