const {
    MessageEmbed
} = require('discord.js');
module.exports = async (bot, member) => {
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
    if (member.guild.id !== '719425057100791841') {
        return;
    } else {
        const embed = new MessageEmbed()
            .setTitle(`${member.name} Just Left The Server. (Sad Meow..)`)
            .setThumbnail(member.user.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
        const channel = member.guild.channels.cache.get('719462083653271583')
        return channel.send(embed)
    }
}