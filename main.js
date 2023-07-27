/*
    main file
*/
const BOT_VERSION = '0.0.1'

const mineflayer = require('mineflayer')
const fs = require('fs');

/*
    definitions
*/
/* commands */
const DEF_COMMAND_DEBUG = 'debug'
const DEF_COMMAND_ECHO = 'echo';
const DEF_COMMAND_JUMP = 'jump';
const DEF_COMMAND_HELP = 'help';
const DEF_COMMAND_UNJUMP = 'unjump';
const DEF_COMMAND_JOKE = 'joke';

/* help answer */
const DEF_ANSWER_HELP ='bot version: ' + BOT_VERSION +
'\n+--------------+\n|         help         |\n+--------------+\ncommands:\n - jump|unjump\n - help\n - echo [message]';

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

    const first_word = 0;
    switch(message.split(' ')[first_word])
    {
        case DEF_COMMAND_ECHO:
        {
            const space_symbol = 1;

            bot.chat('-> echo command');
            bot.chat(message.slice(message.split(' ')[0].length + space_symbol));
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
            bot.setControlState('jump', true);
            break;
        }
        case DEF_COMMAND_UNJUMP:
        {
            bot.chat('-> unjump command');
            bot.setControlState('jump', false);
            break;
        }
        case DEF_COMMAND_DEBUG:
        {
            // bot.chat(read_file('jokes.txt'));
            console.log(read_file("jokes.txt"));
            break;
        }
        case DEF_COMMAND_JOKE:
        {
            bot.chat('-> joke command');
        }
        default:
        {
            bot.chat('-> no "' + message + '" command');
            break;
        }
    }
})

function read_file(file) /* how to return ? */
{
    file_data = ""
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        file_data = data;
      });
    return file_data;
}