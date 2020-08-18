const {
    MessageEmbed,
    Message,
    Client
} = require('discord.js');
const Mute = require('../../models/muterole')
const {
    Mongoose
} = require('mongoose');

/**
 * 
 * @param {Client} bot 
 * @param {Message} message 
 * @param {String[]} args
 * @param {Mongoose} Data
 * @param {Mongoose} Mute
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
        if (!message.guild.me.hasPermission('MANAGE_ROLES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please give the bot **Manage Roles** Permission`)
        }
        if (!message.member.hasPermission(['MANAGE_ROLES', 'MANAGE_MESSAGES'])) {
            message.delete()
            return message.channel.send(nopermembed).then(msg => msg.delete({
                timeout: 5000
            }));
        }
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const nulluserembed = new MessageEmbed()
            .setTitle('❌ Please give the ID or mention a valid member')
            .setColor('#FF0000')
        if (!user) {
            message.delete();
            return message.channel.send(nulluserembed).then(msg => msg.delete({
                timeout: 5000
            }));
        }
        const dumb = new MessageEmbed()
            .setTitle('❌ You really dumb?')
            .setColor('#FF0000')
        if (user.id === message.member.id) {
            message.delete();
            return message.channel.send(dumb).then(msg => msg.delete({
                timeout: 5000
            }));
        }
        const setupmuteroleembed = new MessageEmbed()
            .setTitle(`❌ Please set the mute role by using the command \`${bot.prefix}setmuterole <ROLE-MENTION | ROLEID>\``)
            .setColor('#FF0000')
        const enablemuteroleembed = new MessageEmbed()
            .setTitle(`❌ Please enable the mute role by using the command \`${bot.prefix}enablemuterole\``)
            .setColor('#FF0000')
        var modLogChannel = message.guild.channels.cache.find(cha => cha.name === 'mod-logs');
        Mute.findOne({
                GuildID: message.guild.id
            },
            async (err, data1) => {
                if (err) console.log(err);
                if (!data1) {
                    return message.channel.send(setupmuteroleembed);
                } else {
                    const muteRole = message.guild.roles.cache.find(role => role.id === data1.RoleID);
                    let reason = args.slice(1).join(' ');
                    if (!reason) reason = 'No reason provided';
                    const muteembed = new MessageEmbed()
                        .setColor(`#32cd32`)
                        .setTimestamp()
                        .addField('**Action:** Un-Mute', [
                            `**Moderator:** ${message.author.tag}`,
                            `**User:** ${user.user.tag} (${user.id})`,
                            `**Reason:** ${reason}`
                        ])
                        .setTimestamp()
                    const sucessembed = new MessageEmbed()
                        .setTitle(`<:yes:744037966942568539> \`${user.user.username}\` has been muted permanently.`)
                        .setColor('#32CD32')
                    const earlymutedembed = new MessageEmbed()
                        .setTitle(`❌ ${user} is already unmuted`)
                        .setColor('#FF0000')
                    if (!user.roles.cache.some(role => role.id === data.RoleID)) return message.channel.send(earlymutedembed);
                    message.guild.member(user).roles.remove(muteRole.id)
                    message.delete()
                    message.channel.send(sucessembed).then(msg => msg.delete({
                        timeout: 5000
                    }));
                    if (!modLogChannel) {
                        if (Math.random() * 100 < 5) {
                            return message.channel.send('You can receive mod-logs in a channel by creating a channel called `mod-logs`');
                        } else {
                            return;
                        }
                    } else {
                        modLogChannel.send(muteembed);
                    }
                }
            });
    } catch (e) {
        console.log(e)
        const errembed = new MessageEmbed()
            .setTitle("An error occured")
            .setColor('#FF000')
            .setDescription(`Error: ${e}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`)
        message.channel.send(errembed)
    }
}

module.exports.config = {
    name: "unmute",
    description: "Unmutes a memeber (Only works if you muted using the bot!)",
    usage: "<MEMBER>",
    category: 'Moderation',
    timeout: 5000,
    timeoutname: '5 seconds',
    accessableby: "Moderators",
    aliases: ['unm', 'unshh']
}
