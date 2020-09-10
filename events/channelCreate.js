module.exports = async (bot, channel) => {
    const statuses = [
        `${bot.guilds.cache.size} servers!`,
        `${bot.users.cache.size} users!`,
        `${bot.channels.cache.filter(channel => channel.type === 'text').size} Text Channels`,
        `${bot.channels.cache.filter(channel => channel.type === 'voice').size} Voice Channels`,
        `${bot.channels.cache.size} Channels`
        `Now has ${bot.commands.size} Commands`,
    ];
    setInterval(() => {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {
            type: 'LISTENING'
        });
    }, 5000);
}