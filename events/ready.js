const mongoose = require('mongoose')
const {
    MessageEmbed
} = require('discord.js')
module.exports = async (bot) => {
    console.log([
        `Loaded ${bot.commands.size} Commands`,
        'The Bot Is Ready And Running',
        `The Bot is running in ${bot.guilds.cache.size} Servers`,
        `Working For ${bot.users.cache.size} Users`
    ].join('\n'));
    mongoose.connect(process.env.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection.on('connected', () => {
        console.log("DataBase connected");
        const onlineembed = new MessageEmbed()
            .setTitle('The Bot Is Online!')
            .setTimestamp()
            .setColor('#32CD32')
        const user = bot.users.cache.get('443278070825091072')
        return user.send(onlineembed)
    });
    const totmem = bot.users.cache.size;
    const botmem = bot.users.cache.filter(x => x.bot).size;
    const statuses = [
        `${bot.guilds.cache.size} servers!`,
        `${parseInt(totmem) - parseInt(botmem)} users!`,
        `${bot.channels.cache.filter(channel => channel.type === 'text').size} Text Channels`,
        `${bot.channels.cache.filter(channel => channel.type === 'voice').size} Voice Channels`,
        `${bot.channels.cache.size} Channels`,
        `Now has ${bot.commands.size} Commands`
    ];
    setInterval(() => {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {
            type: 'LISTENING'
        });
    }, 5000);
}