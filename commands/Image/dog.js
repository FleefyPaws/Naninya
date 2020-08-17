const fetch = require('node-fetch')
const {
    MessageEmbed
} = require("discord.js");
module.exports.run = async (bot, message, args) => {
    if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(`Please give the bot **Embed Links** Permission`)
    }
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(`Please give the bot **Manage Messages** Permission`)
    }
    message.channel.startTyping();
    fetch('https://some-random-api.ml/img/dog').then(res => res.json()).then(body => {
        if (!body) return message.channel.send('Sorry i\'v broke!');
        const embed = new MessageEmbed()
            .setColor(`#32cd32`)
            .setImage(body.link)
            .setTitle(`Doggo`)
            .setURL(body.link)
            .setTimestamp()
            .setFooter(`${bot.user.username} by FleeffyPawsYT`)
        message.channel.stopTyping();
        message.channel.send(embed);
    })
}

module.exports.config = {
    name: "dog",
    description: "Summons a dog picture",
    accessableby: "Members",
    category: "Image",
    timeout: '5000',
    timeoutname: '5 seconds',
    aliases: ['dogs', 'doggo', 'pup', 'puppy']
}