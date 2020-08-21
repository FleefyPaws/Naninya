const {
    Client,
    Collection,
} = require("discord.js");
const express = require('express');
const app = express()
app.use(require('./handlers/server'))

const config = require("./config.json");
const bot = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

bot.prefix = config.prefix;
bot.config = config;

["aliases", "commands"].forEach(x => bot[x] = new Collection());
['event', 'command'].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(process.env.TOKEN);
