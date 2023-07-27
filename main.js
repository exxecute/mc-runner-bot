/*
    main file
*/
const BOT_VERSION = '0.0.1-echo'


/*
    definitions
*/
/* commands */
const DEF_COMMAND_ECHO = 'echo';
const DEF_COMMAND_JUMP = 'jump';
const DEF_COMMAND_HELP = 'help';
const DEF_COMMAND_UNJUMP = 'unjump';

/* help answer */
const DEF_ANSWER_HELP ='bot version: ' + BOT_VERSION +
'\n+--------------+\n|         help         |\n+--------------+\ncommands:\n - jump|unjump\n - help\n - echo [message]';

const mineflayer = require('mineflayer')

/* bot configs */
const bot = mineflayer.createBot({
    host: '3x3cvte.aternos.me',
    port:'11998',
    username: '3x3cvte_bot',
    version: '1.20.1'
})

/* bot chat */
bot.on('chat', async (username, message) =>{
    if (username === bot.username) return

    // bot.chat(message)
    switch(message)
    {
        case DEF_COMMAND_ECHO:
        {
            bot.chat('-> echo command');
            break;
        }
        case DEF_COMMAND_HELP:
        {
            bot.chat(DEF_ANSWER_HELP);
            break;
        }
        case DEF_COMMAND_JUMP:
        {
            bot.chat('-> jump command');
            bot.setControlState('jump', true)
            break;
        }
        case DEF_COMMAND_UNJUMP:
        {
            bot.chat('-> unjump command');
            bot.setControlState('jump', false)
            break;
        }
        default:
        {
            bot.chat('-> no "' + message + '" command');
            break;
        }
    }
})