const {
    Client,
    MessageEmbed,
    GuildMember
} = require('discord.js');
module.exports = async (bot, member) => {
    const statuses = [
        `${bot.guilds.cache.size} servers!`,
        `${bot.users.cache.size} users!`,
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
            .setTitle(`Goodbye ${member.name}`)
            .setThumbnail(member.user.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
        const channel = member.guild.channels.cache.get('719462083653271583')
        return channel.send(embed)
    }
}