const {
    Client,
    Collection,
} = require("discord.js");
const config = require("./config.json");
const bot = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

bot.prefix = config.prefix;
bot.config = config;
require('server.js')
["aliases", "commands"].forEach(x => bot[x] = new Collection());
['event', 'command'].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(process.env.TOKEN);
