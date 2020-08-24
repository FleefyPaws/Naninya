const mongoEconomy = require('discord-mongodb-economy')
module.exports = async (bot) => {
    console.log([
        `Loaded ${bot.commands.size} Commands`,
        'The Bot Is Ready And Running',
        `The Bot is running in ${bot.guilds.cache.size} Servers. Working For ${bot.users.cache.size} Users`
    ].join('\n'));
    mongoEconomy.connectDatabase(process.env.MONGOURI)
    const statuses = [
        `${bot.guilds.cache.size} servers!`,
        `${bot.users.cache.size} users!`,
        `Now has ${bot.commands.size} Commands`
    ];
    const mongoCurrency = require('discord-mongo-currency');

    mongoCurrency.connect(process.env.MONGOURI);
    setInterval(() => {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {
            type: 'LISTENING'
        });
    }, 5000);
}