const {
    MessageEmbed
} = require('discord.js');
const Mute = require('../../models/muterole');
module.exports.run = async (bot, message, args) => {
    const nopermembed = new MessageEmbed()
        .setTitle("❌ You do not have the permission to use this command")
        .setColor('#FF0000')
    if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(`Please give the bot **Embed Links** Permission`)
    }
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(`Please give the bot **Manage Messages** Permission`)
    }
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        message.delete()
        return message.channel.send(nopermembed).then(msg => msg.delete({
            timeout: 5000
        }));
    }
    Mute.findOne({
            GuildID: message.guild.id
        },
        async (err, data) => {
            if (err) console.log(err);
            if (!data) {
                const nope1rmembed = new MessageEmbed()
                    .setTitle(`❌ The mute role has not been set for this server.\nSet it up by using this command \`${bot.prefix}setmuterole <ROLE>\`!`)
                    .setColor('#FF0000')
                return message.channel.send(nope1rmembed).then(msg => msg.delete({
                    timeout: 5000
                }));
            } else {
                const role = message.guild.roles.cache.get(data.RoleID)
                const nope1r3membed = new MessageEmbed()
                    .setTitle(`<:yes:744037966942568539> The mute role for \`${message.guild.name}\` is @${role.name}`)
                    .setColor('#32cd32')
                return message.channel.send(nope1r3membed)
            }
        });
}

module.exports.config = {
    name: "muterole",
    description: "Views the muterole for a server",
    category: 'Config',
    timeout: 5000,
    timeoutname: '5 seconds',
    accessableby: "Admins"
}