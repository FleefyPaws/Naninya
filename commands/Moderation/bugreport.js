const {
    MessageEmbed,
    Message,
    Client,
} = require('discord.js');
const Bug = require('../../models/bugreport');
const {
    Mongoose
} = require('mongoose');
/**
 * 
 * @param {Client} bot 
 * @param {Message} message 
 * @param {String[]} args 
 * @param {Mongoose} Bug
 */
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
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            message.delete()
            return message.channel.send(nopermembed).then(msg => msg.delete({
                timeout: 5000
            }));
        }
        const asd = new MessageEmbed()
            .setTitle("❌ Please say what the bug is!")
            .setColor('#FF0000')
        const bugstring = args.slice(0).join(' ');
        if (!bugstring) {
            return message.channel.send(asd).then(msg => msg.delete({
                timeout: 5000
            }));
        }
        Bug.findOne({
            UserID: message.member.id,
        }, async (err, data) => {
            if (err) console.log(err);
            if (!data) {
                const newData = new Bug({
                    UserID: message.author.id,
                    GuildID: message.guild.id,
                    Bug: bugstring
                })
                const asd1 = new MessageEmbed()
                    .setTitle("<:yes:744037966942568539> The report has been sent!")
                    .setColor('#32cd32')
                newData.save();
                return message.channel.send(asd1)
            } else {
                const newData = new Bug({
                    UserID: message.author.id,
                    GuildID: message.guild.id,
                    Bug: bugstring
                })
                const asd1 = new MessageEmbed()
                    .setTitle("<:yes:744037966942568539> The report has been sent!")
                    .setColor('#32cd32')
                newData.save();
                return message.channel.send(asd1)
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
    name: "bugreport",
    description: "Report a bug",
    usage: "<MEMBER>",
    category: 'Moderation',
    timeout: 5000,
    timeoutname: '5 seconds',
    accessableby: "Moderator",
    aliases: ['rep', 'report']
}