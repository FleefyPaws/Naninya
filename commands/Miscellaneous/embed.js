const {
    MessageEmbed
} = require("discord.js");
module.exports.run = async (bot, message, args) => {
    try {
        if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please Give The Bot **Embed Links** Permission`)
        }
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please Give The Bot **Manage Messages** Permission`)
        }
        if (!args[0]) {
            message.delete();
            const errembed = new MessageEmbed()
                .setTitle("❌ Please provide the color of the embed")
                .setColor('#FF0000')
            message.channel.send(errembed).then(msg => msg.delete({
                timeout: 5000
            }));
        } else if (!args.slice(1).join(' ')) {
            message.delete();
            const err1embed = new MessageEmbed()
                .setTitle("❌ Please provide the description of the embed")
                .setColor('#FF0000')
            message.channel.send(err1embed).then(msg => msg.delete({
                timeout: 5000
            }));
        } else if (args.slice(1).join(' ') >= 2048) {
            message.delete();
            const err2embed = new MessageEmbed()
                .setTitle("❌ Embed descriptions are limited to 2048 characters")
                .setColor('#FF0000')
            message.channel.send(err2embed).then(msg => msg.delete({
                timeout: 5000
            }));
        } else {
            const embed = new MessageEmbed()
                .setTitle('Embed')
                .setColor(args[0])
                .setDescription(args.slice(1).join(' '))
                .setTimestamp()
                .setFooter(`${bot.user.username} by FleeffyPawsYT`);
            message.channel.send(embed);
        }
    } catch (e) {
        console.log(e)
        const errembed = new MessageEmbed()
            .setTitle("An error occured")
            .setDescription(`Error: ${error}. \nPlease report this error to our support server: **https: //discord.gg/s2ezK4X**`)
        message.channel.send(errembed)
    }
}

module.exports.config = {
    name: "embed",
    description: "Creates an embed",
    usage: "<COLOR> <DESC>",
    timeout: 5000,
    timeoutname: '5 seconds',
    accessableby: "Members",
    category: 'Miscellaneous'
}