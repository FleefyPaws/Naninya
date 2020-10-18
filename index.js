require('dotenv').config();
const {
    Client,
    Collection,
} = require("discord.js");
const bot = new Client();
bot.prefix = process.env.PREFIX;
["aliases", "commands"].forEach(x => bot[x] = new Collection());
['event', 'command'].forEach(x => require(`./handlers/${x}`)(bot));
bot.login(process.env.TOKEN);