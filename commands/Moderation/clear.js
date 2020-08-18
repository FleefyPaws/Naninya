const {
    MessageEmbed,
    Client,
    Message
} = require('discord.js');
const {
    del
} = require('request');
/**
 * @param {Client} bot
 * @param {Message} message
 * @param {String[]} args
 */

module.exports.run = async (bot, message, args) => {
    try {
        const nopermembed = new MessageEmbed()
            .setTitle("❌ You do not have the permission to use this command")
            .setColor('#FF0000')
        if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please give the bot **Embed Links** Permission`)
        }
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please give the bot **Manage Messages** Permission`)
        }
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            message.delete()
            return message.channel.send(nopermembed).then(msg => msg.delete({
                timeout: 5000
            }));
        }
        const isnanembed = new MessageEmbed()
            .setTitle('❌ ' + args[0] + ' is not a number.')
            .setColor('#FF0000')
        if (isNaN(args[0])) {
            message.delete();
            return message.channel.send(isnanembed).then(msg => msg.delete({
                timeout: 5000
            }));
        }
        const zeroembed = new MessageEmbed()
            .setTitle(`❌ I cannot delete \`0\` messages`)
            .setColor('#FF0000')
        if (parseInt(args[0]) <= 0) {
            message.delete()
            message.channel.send(zeroembed).then(msg => msg.delete({
                timeout: 5000
            }))
        }
        let deleteAmount;
        if (parseInt(args[0]) >= 100) {
            deleteAmount = 100
        } else {
            deleteAmount = parseInt(args[0])
        }

        const deletedembed = new MessageEmbed()
        var modLogChannel = message.guild.channels.cache.find(cha => cha.name === 'mod-logs');
        var modLogEmbed = new MessageEmbed()
            .setColor(`#32cd32`)
            .setTimestamp()
            .setFooter(`${bot.user.username} by FleeffyPawsYT`);
        message.delete();
        message.channel.bulkDelete(parseInt(deleteAmount), true)
            .then(deleted => {
                deletedembed.setTitle(`<:yes:744037966942568539> Deleted \`${deleted.size}\` messages.`)
                deletedembed.setColor('#32CD32')
                message.channel.send(deletedembed).then(msg => msg.delete({
                    timeout: 5000
                }));
                modLogEmbed.addField('**Action:** Message Deleted', [
                    `**Moderator:** ${message.author.tag}`,
                    `**Message Delelted:** ${deleted.size} Messages`
                ])
                if (!modLogChannel) {
                    if (Math.random() * 100 < 3) {
                        return message.channel.send('You Can Receive Mod-Logs In A Channel By Creating A Channel Called `mod-logs`');
                    } else {
                        return;
                    }
                } else {
                    return modLogChannel.send(modLogEmbed);
                }
            })
    } catch (e) {
        console.log(e)
        const errembed = new MessageEmbed()
            .setTitle("An error occured")
            .setColor('#FF0000')
            .setDescription(`Error: ${e}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`)
        message.channel.send(errembed)
    }
}

module.exports.config = {
    name: "clear",
    description: "Clears messages",
    usage: "<MESSAGE>",
    accessableby: "Moderators",
    category: 'Moderation',
    timeout: 5000,
    timeoutname: '5 seconds',
    aliases: ['c', 'purge']
}
