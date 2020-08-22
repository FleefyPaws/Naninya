const {
    Client,
    MessageEmbed,
    GuildMember
} = require('discord.js');
/**
 * 
 * @param {Client} bot 
 * @param {GuildMember} member
 */
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
    if (member.guild.id !== '743730169075728414') {
        return;
    } else {
        const embed = new MessageEmbed()
            .setTitle(`Goodbye ${member.name}`)
            .setThumbnail(member.user.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
        const channel = member.guild.channels.cache.get('743761572475961346')
        return channel.send(embed)
    }
}
