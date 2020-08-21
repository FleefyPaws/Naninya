const {
    Client,
    Collection,
} = require("discord.js");
const express = require('request');
const app = express();
const config = require("./config.json");
const bot = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/webpage/index.html");
});

bot.prefix = config.prefix;
bot.config = config;

["aliases", "commands"].forEach(x => bot[x] = new Collection());
['event', 'command'].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(process.env.TOKEN);
