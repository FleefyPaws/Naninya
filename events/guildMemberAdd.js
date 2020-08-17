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
    if (member.guild.id !== '743730169075728414') {
        return;
    } else {
        const embed = new MessageEmbed()
            .setTitle(`Welcome ${member.name}`)
            .setDescription(`I hope you have a great time in our server!\nPlease check out <#743761575336345662> before continuing on the server!`)
            .setThumbnail(member.user.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
        const channel = member.guild.channels.cache.get('743761571498557440')
        return channel.send(embed)
    }
}