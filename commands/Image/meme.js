const fetch = require('node-fetch');
const {
    MessageEmbed,
    Message,
    Client
} = require("discord.js");
/**
 * 
 * @param {Client} bot 
 * @param {Message} message 
 * @param {String[]} args 
 */
module.exports.run = async (bot, message, args) => {
    try {
        if (!message.guild.me.hasPermission('EMBED_LINKS') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please give the bot **Embed Links** Permission`)
        }
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES') && !message.guild.me.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(`Please give the bot **Manage Messages** Permission`)
        }
        message.channel.startTyping();
        fetch('https://www.reddit.com/r/memes/random/.json')
            .then(res => res.json()).then(body => {
                let permalink = body[0].data.children[0].data.permalink;
                let memeUrl = `https://reddit.com${permalink}`;
                let memeImage = body[0].data.children[0].data.url;
                let memeTitle = body[0].data.children[0].data.title;
                let memeUpvotes = body[0].data.children[0].data.ups;
                let memeNumComments = body[0].data.children[0].data.num_comments;
                const embed = new MessageEmbed()
                    .setTitle(`${memeTitle}`)
                    .setURL(`${memeUrl}`)
                    .setImage(memeImage)
                    .setColor('#32cd32')
                    .setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`)
                message.channel.stopTyping()
                return message.channel.send(embed)
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
    name: "meme",
    description: "Summons a meme picture",
    accessableby: "Members",
    category: "Image",
    timeout: '5000',
    timeoutname: '5 seconds',
    aliases: ['memes', 'memey']
}