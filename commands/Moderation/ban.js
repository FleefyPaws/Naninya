const {
    MessageEmbed,
    Client,
    Message,
    Permissions
} = require('discord.js');
/**
 * 
 * @param {Client} bot 
 * @param {Message} message 
 * @param {String[]} args 
 */
const ViewChannel = new Permissions('VIEW_CHANNEL');
const EmbedLinks = new Permissions('EMBED_LINKS');
const ManageRoles = new Permissions('MANAGE_ROLES');
const ManageMessages = new Permissions('MANAGE_MESSAGES');
const BanMembers = new Permissions('BAN_MEMBERS');
const ReadMessageHistory = new Permissions('READ_MESSAGE_HISTORY');
module.exports.run = async (bot, message, args) => {
    try {
        const nopermembed = new MessageEmbed()
            .setTitle("❌ You Do Not Have The Permission To Use This Command")
            .setColor('#FF0000')
        if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please Give The Bot **Embed Links** Permission`)
        }
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please Give The Bot **Manage Messages** Permission`)
        }
        if (!message.guild.me.hasPermission('MANAGE_ROLES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please Give The Bot **Manage Roles** Permission`)
        }
        if (!message.guild.me.hasPermission('BAN_MEMBERS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please Give The Bot **Ban Members** Permission`)
        }
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            message.delete()
            return message.channel.send(nopermembed).then(msg => msg.delete({
                timeout: 5000
            }));
        }
        const higherroleembed = new MessageEmbed()
            .setTitle('❌ You Cannot Ban People Who Has The Same Role Or A Role Above You')
            .setColor('#FF0000')
        const dumb = new MessageEmbed()
            .setTitle('❌ You Really Dumb?')
            .setColor('#FF0000')
        let user = message.mentions.members.first();
        if (!message.mentions.members.first()) {
            user = message.guild.members.cache.get(args[0]);
        }
        const nulluserembed = new MessageEmbed()
            .setTitle('❌ Please Give The ID Or Mention A Valid Member')
            .setColor('#FF0000')
        if (!user) {
            message.delete();
            return message.reply(nulluserembed).then(msg => msg.delete({
                timeout: 5000
            }));
        }
        if (!user.kickable) {
            message.delete();
            return message.channel.send(higherroleembed).then(msg => msg.delete({
                timeout: 5000
            }));
        }
        if (user.id === message.member.id) {
            message.delete();
            return message.channel.send(dumb).then(msg => msg.delete({
                timeout: 5000
            }));
        }
        let reason = args.slice(1).join(' ');
        if (!reason) reason = 'No reason provided!';
        var modLogChannel = message.guild.channels.cache.find(cha => cha.name === 'mod-logs');
        var modLogEmbed = new MessageEmbed()
            .setColor(`#32cd32`)
            .setTimestamp()
            .addField('**Action:** Ban', [
                `**Moderator:** ${message.author.tag}`,
                `**User:** ${user.user.tag}`,
                `**Reason:** ${reason}`
            ])
            .setTimestamp()
            .setFooter(`${bot.user.username} by FleeffyPawsYT`);
        var embed = new MessageEmbed()
            .setColor(`#32cd32`)
            .addField(`You were **Banned** from ${message.guild.name}`, [
                `**Moderator:** ${message.author.tag}`,
                `**User:** ${user.user.tag} (${user.id})`,
                `**Reason:** ${reason}`
            ])
            .setTimestamp()
            .setFooter(`${bot.user.username} by FleeffyPawsYT`);

        message.delete();

        const sucessembed = new MessageEmbed()
            .setTitle(`<:yes:744037966942568539> \`${message.member.user.username}\` Banned \`${user.user.username}\` 🔨`)
            .setColor('#32CD32')
        await user.send(sucessembed).then(() => {
            user.ban(reason);
            message.channel.send(sucessembed).then(msg => {
                msg.delete({
                    timeout: 5000
                });
            });
            if (!modLogChannel) {
                if (Math.random() * 100 < 3) {
                    return message.channel.send('You can receive mod-logs in a channel by creating a channel called `mod-logs`');
                } else {
                    return;
                }
            } else {
                return modLogChannel.send(modLogEmbed);
            }
        }).catch(() => {
            user.kick(reason);
            const sucessembed = new MessageEmbed()
                .setTitle(`<:yes:744037966942568539> **${message.author.username}** kicked **${user.user.username}**`)
                .setColor('#32CD32')
            message.channel.send(sucessembed).then(msg => {
                msg.delete({
                    timeout: 5000
                });
            });
            if (!modLogChannel) {
                if (Math.random() * 100 < 3) {
                    return message.channel.send('You can receive mod-logs in a channel by creating a channel called `mod-logs`');
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
            .setDescription(`Error: ${error}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`)
        message.channel.send(errembed)
    }
}

module.exports.config = {
    name: "ban",
    description: "Bans a user",
    usage: "<MEMBER> [REASON]",
    accessableby: "Moderators",
    category: 'Moderation',
    timeout: 5000,
    timeoutname: '5 seconds',
    aliases: ['b', 'bam']
}