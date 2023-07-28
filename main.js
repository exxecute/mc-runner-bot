/*
    main file
*/
const BOT_VERSION = '0.0.1'


/*
    definitions
*/
/* commands */
const DEF_COMMAND_DEBUG = 'debug'
const DEF_COMMAND_ECHO = 'echo';
const DEF_COMMAND_JUMP = 'jump';
const DEF_COMMAND_HELP = 'help';
const DEF_COMMAND_UNJUMP = 'unjump';
const DEF_COMMAND_FOLLOW = 'follow';
const DEF_COMMAND_UNFOLLOW = 'unfollow';

/* help answer */
const DEF_ANSWER_HELP ='bot version: ' + BOT_VERSION +
'\n+--------------+\n|         help         |\n+--------------+' + 
'\ncommands:' + 
'\n - jump | unjump' +
'\n - help' + 
'\n - echo [message]' +
'\n - follow | unfollow' +
'\ncontributor: 3xecvte';

const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');

/* bot configs */
const bot = mineflayer.createBot({
    host: '3x3cvte.aternos.me',
    port:'11998',
    username: '3x3cvte_bot',
    version: '1.20.1'
})

bot.loadPlugin(pathfinder);

bot.on('spawn', () => {
    mc_data = require('minecraft-data')(bot.version);
    bot.pathfinder.stop();

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
                block_name =  "diamond_ore";
                if (bot.registry.blocksByName[block_name] === undefined) {
                    bot.chat(`${block_name} is not a block name`)
                    return
                  }
                const ids = [bot.registry.blocksByName[block_name].id]
                const blocks = bot.findBlocks({ matching: ids, maxDistance: 128, count: 5 });
                
                bot.chat(`I found ${blocks.length}`);
                for (index = 0; index < blocks.length; index++)
                {
                    // if(blocks[index].y < -50)
                    // {
                        bot.chat(`I x ${blocks[index].x}, y ${blocks[index].y}, z ${blocks[index].z}`);
                    // }
                }
                
                break;
            }
            case DEF_COMMAND_FOLLOW:
            {
                bot.chat('-> follow command');
                follow_player = bot.players[username];
                target = follow_player.entity;

                bot.pathfinder.setMovements(new Movements(bot));
                bot.pathfinder.setGoal(new goals.GoalFollow(target, 1), true);
                break;
            }
            case DEF_COMMAND_UNFOLLOW:
            {
                bot.chat('-> unfollow command');
                bot.pathfinder.stop();
                break;
            }
            default:
            {
                bot.chat('-> no "' + message + '" command');
                break;
            }
        }
    })

})