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

["aliases", "commands"].forEach(x => bot[x] = new Collection());
require(`./handlers/command`)(bot);

bot.on('ready', () => {
    require('./events/ready')(bot)
})
bot.on('guildMemberAdd', member => {
    require('./events/guildMemberAdd')(bot, member)
})
bot.on('guildMemberRemove', member => {
    require('./events/guildMemberRemove')(bot, member)
})
bot.on('message', async (message) => {
    require('./events/message')(bot, message)
})

bot.login(process.env.TOKEN);